import { WorksService } from './works.service';
import { PrismaService } from 'nestjs-prisma';
import { Works } from '@prisma/client';

describe('WorksService', () => {
  let worksService: WorksService;
  let prismaService: PrismaService;

  beforeEach(() => {
    prismaService = new PrismaService();
    worksService = new WorksService(prismaService);
  });

  // ...

  describe('findAll', () => {
    it('should return all works', async () => {
      // Mock data
      const expectedWorks: Works[] = [
        {
          id: '1',
          chatId: 'chat1',
          listenChannelUsernames: [],
          listenWords: [],
          muteChannelUsernames: [],
          muteUsernames: [],
          muteWords: [],
          updatedAt: new Date(),
          createdAt: new Date(),
        },
      ];

      // Mock PrismaService
      jest
        .spyOn(prismaService.works, 'findMany')
        .mockResolvedValueOnce(expectedWorks);

      // Execute the method
      const works = await worksService.findAll();

      // Assert
      expect(works).toEqual(expectedWorks);
      expect(prismaService.works.findMany).toHaveBeenCalled();
    });
  });

  // ...

  describe('create', () => {
    it('should create a new work', async () => {
      // Mock data
      const input: Works = {
        id: '1',
        chatId: 'chat1',
        listenChannelUsernames: [],
        listenWords: [],
        muteChannelUsernames: [],
        muteUsernames: [],
        muteWords: [],
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      const expectedWork: Works = { id: '1', ...input };

      // Mock PrismaService
      jest
        .spyOn(prismaService.works, 'create')
        .mockResolvedValueOnce(expectedWork);

      // Execute the method
      const work = await worksService.create(input);

      // Assert
      expect(work).toEqual(expectedWork);
      expect(prismaService.works.create).toHaveBeenCalledWith({ data: input });
    });
  });

  describe('findById', () => {
    it('should return the work with the specified id', async () => {
      // Mock data
      const expectedWork: Works = {
        id: '1',
        chatId: 'chat1',
        listenChannelUsernames: [],
        listenWords: [],
        muteChannelUsernames: [],
        muteUsernames: [],
        muteWords: [],
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      const id = '1';

      // Mock PrismaService
      jest
        .spyOn(prismaService.works, 'findUnique')
        .mockResolvedValueOnce(expectedWork);

      // Execute the method
      const work = await worksService.findById(id);

      // Assert
      expect(work).toEqual(expectedWork);
      expect(prismaService.works.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });

    it('should return null if no work is found with the specified id', async () => {
      // Mock data
      const id = '1';

      // Mock PrismaService
      jest.spyOn(prismaService.works, 'findUnique').mockResolvedValueOnce(null);

      // Execute the method
      const work = await worksService.findById(id);

      // Assert
      expect(work).toBeNull();
      expect(prismaService.works.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe('findByChatId', () => {
    it('should return the work with the specified chatId', async () => {
      // Mock data
      const expectedWork: Works = {
        id: '1',
        chatId: 'chat1',
        listenChannelUsernames: [],
        listenWords: [],
        muteChannelUsernames: [],
        muteUsernames: [],
        muteWords: [],
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      const chatId = 'chat1';

      // Mock PrismaService
      jest
        .spyOn(prismaService.works, 'findFirst')
        .mockResolvedValueOnce(expectedWork);

      // Execute the method
      const work = await worksService.findByChatId(chatId);

      // Assert
      expect(work).toEqual(expectedWork);
      expect(prismaService.works.findFirst).toHaveBeenCalledWith({
        where: { chatId },
      });
    });

    it('should return null if no work is found with the specified chatId', async () => {
      // Mock data
      const chatId = 'chat1';

      // Mock PrismaService
      jest.spyOn(prismaService.works, 'findFirst').mockResolvedValueOnce(null);

      // Execute the method
      const work = await worksService.findByChatId(chatId);

      // Assert
      expect(work).toBeNull();
      expect(prismaService.works.findFirst).toHaveBeenCalledWith({
        where: { chatId },
      });
    });
  });
});
