import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePreferencesDto } from './dto';

@Injectable()
export class PreferencesService {
  constructor(private prisma: PrismaService) {}

  async createPreferences(dto: CreatePreferencesDto) {
    try {
      const preferences = await this.prisma.preference.create({
        data: {
          userId: dto.userId,
          ...dto,
        },
      });

      return preferences;
    } catch (error) {
      //if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new ForbiddenException(
          'User has already set preferences. Please update instead',
        );
        //  }
      } else {
        throw new InternalServerErrorException(
          'Unable to save preferences. Please check that inputs are valid',
        );
      }
      throw error;
    }
  }
}
