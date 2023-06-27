import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  isNumber,
  IsNumber,
} from 'class-validator';

export class CreatePreferencesDto {
  @IsBoolean()
  @IsNotEmpty()
  tac_accepted: boolean;

  @IsString()
  @IsNotEmpty()
  language: string;

  @IsBoolean()
  @IsNotEmpty()
  show_profile: boolean;

  @IsBoolean()
  @IsNotEmpty()
  show_language: boolean;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
