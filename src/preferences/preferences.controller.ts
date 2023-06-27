import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { JwtGuard } from '../auth/guard/jwt.guards';
import { PreferencesService } from './preferences.service';
import { GetUser } from './decorator';
import { CreatePreferencesDto } from './dto';

@UseGuards(JwtGuard)
@Controller('user')
export class PreferencesController {
  constructor(private preferencesService: PreferencesService) {}

  @Post('preferences')
  createPreferences(@Body() dto: CreatePreferencesDto) {
    return this.preferencesService.createPreferences(dto);
  }
}
