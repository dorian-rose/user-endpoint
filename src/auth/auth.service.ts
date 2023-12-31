import { ForbiddenException, Injectable } from '@nestjs/common';
//import { User, Preferences } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(dto: AuthDto) {
    //hash the password
    const hash = await argon.hash(dto.password);
    //save to db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      //sign jwt token
      return this.signToken(user.id, user.email);
    } catch (error) {
      //if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('User already exists');
        //  }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    //check if user exists
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    //if doesnt exist
    if (!user) throw new ForbiddenException('Credentials incorrect');
    //if user does exist, compare passwords
    const passwordCorrect = await argon.verify(user.hash, dto.password);
    //if password incorrect
    if (!passwordCorrect) throw new ForbiddenException('Credentials incorrect');
    //sign jwt token
    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ userId: number; access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '30m',
      secret: secret,
    });

    return {
      userId: userId,
      access_token: token,
    };
  }
}
