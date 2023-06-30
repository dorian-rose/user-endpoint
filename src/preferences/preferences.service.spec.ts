import { Test, TestingModule } from '@nestjs/testing';
import { PreferencesService } from './preferences.service';
import { CreatePreferencesDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

import { InternalServerErrorException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

describe('PreferencesService', () => {
  let service: PreferencesService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PreferencesService, PrismaService],
      imports: [ConfigModule],
    }).compile();

    service = module.get<PreferencesService>(PreferencesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  //successful call test
  it('should create preferences', async () => {
    // set up correct return
    jest.spyOn(prismaService.preference, 'create').mockResolvedValue({
      id: 8,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      tac_accepted: true,
      language: 'English',
      show_profile: true,
      show_language: true,
      userId: 15,
    });

    const dto: CreatePreferencesDto = {
      tac_accepted: true,
      language: 'English',
      show_profile: true,
      show_language: true,
      userId: 15,
    };

    // get test result
    const result = await service.createPreferences(dto);

    // What to expect
    expect(result).toStrictEqual({
      ...dto,
      id: expect.any(Number),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('should throw InternalServerErrorException when invalid input types are provided', async () => {
   //dto with an invalid data type 
    const dto: CreatePreferencesDto = {
      tac_accepted: 'true' as any, // Provide a string instead of a boolean
      language: 'English',
      show_profile: true,
      show_language: true,
      userId: 1,
    };

    
    await expect(service.createPreferences(dto)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
