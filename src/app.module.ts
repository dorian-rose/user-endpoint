import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

import { PreferencesModule } from './preferences/preferences.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,

    PreferencesModule,
    PrismaModule,
  ],
})
export class AppModule {}
