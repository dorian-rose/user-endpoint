import { Test, TestingModule } from '@nestjs/testing';
import { PreferencesController } from './preferences.controller';
import { CreatePreferencesDto } from './dto';
import { PreferencesService } from './preferences.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { ForbiddenException } from '@nestjs/common';

describe('PreferencesController', () => {
  let controller: PreferencesController;
  let service: PreferencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PreferencesController],
      providers: [PreferencesService, PrismaService],
      imports: [ConfigModule],
    }).compile();

    controller = module.get<PreferencesController>(PreferencesController);
    service = module.get<PreferencesService>(PreferencesService);
  });

  //in case of success
  describe('createPreferences', () => {
    it('should create preferences', async () => {
      //define dto
      const dto: CreatePreferencesDto = {
        tac_accepted: true,
        language: 'English',
        show_profile: true,
        show_language: true,
        userId: 1,
      };
      //define expected result
      const expectedResult = {
        id: expect.any(Number),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        tac_accepted: expect.any(Boolean),
        language: expect.any(String),
        show_profile: expect.any(Boolean),
        show_language: expect.any(Boolean),
        userId: expect.any(Number),
      };

      jest
        //spyOn = track calls to methods listed
        .spyOn(service, 'createPreferences')
        //what to expect when method callled
        .mockResolvedValue(expectedResult);

      //mock result when method called with above dto
      const result = await controller.createPreferences(dto);

      expect(result).toBe(expectedResult);
      //expect to have been called, services
      expect(service.createPreferences).toHaveBeenCalledWith(dto);
    });

    //in case of error due to duplication
    it('should throw error when user has already set preferences', async () => {
      const dto: CreatePreferencesDto = {
        tac_accepted: true,
        language: 'English',
        show_profile: true,
        show_language: true,
        userId: 1,
      };

      jest
        .spyOn(service, 'createPreferences')
        //mock recjection, simulation of error when ducplicate exists
        .mockRejectedValue(
          new ForbiddenException('User has already set preferences'),
        );

      await expect(controller.createPreferences(dto)).rejects.toThrow(
        ForbiddenException,
      );
      expect(service.createPreferences).toHaveBeenCalledWith(dto);
    });
  });
});
