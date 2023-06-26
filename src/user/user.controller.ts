import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard/jwt.guards';

@Controller('users')
export class UserController {
  @UseGuards(JwtGuard)
  @Get('me')
  //note to dorian: could use custom decorator to get user from req
  getMe(@Req() req: Request) {
    return req.user;
  }
}
