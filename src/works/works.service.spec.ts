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
          selectedChatsId: 1,
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
        selectedChatsId: 1,
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
        selectedChatsId: 1,
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
        selectedChatsId: 1,
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

  describe('update', () => {
    it('should update the work with the specified id', async () => {
      // Mock data
      const id = '1';
      const input: Works = {
        id: '1',
        chatId: 'chat2',
        listenChannelUsernames: [],
        selectedChatsId: 1,
        listenWords: [],
        muteChannelUsernames: [],
        muteUsernames: [],
        muteWords: [],
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      const expectedUpdatedWork: Works = {
        id: '1',
        chatId: 'chat2',
        listenChannelUsernames: [],
        selectedChatsId: 1,
        listenWords: [],
        muteChannelUsernames: [],
        muteUsernames: [],
        muteWords: [],
        updatedAt: new Date(),
        createdAt: new Date(),
      };

      // Mock PrismaService
      jest
        .spyOn(prismaService.works, 'update')
        .mockResolvedValueOnce(expectedUpdatedWork);

      // Execute the method
      const updatedWork = await worksService.update(id, input);

      // Assert
      expect(updatedWork).toEqual(expectedUpdatedWork);
      expect(prismaService.works.update).toHaveBeenCalledWith({
        where: { id },
        data: input,
      });
    });

    it('should return null if no work is found with the specified id', async () => {
      // Mock data
      const id = '1';
      const input: Works = {
        id: '1',
        chatId: 'chat2',
        listenChannelUsernames: [],
        selectedChatsId: 1,
        listenWords: [],
        muteChannelUsernames: [],
        muteUsernames: [],
        muteWords: [],
        updatedAt: new Date(),
        createdAt: new Date(),
      };

      // Mock PrismaService
      jest.spyOn(prismaService.works, 'update').mockResolvedValueOnce(null);

      // Execute the method
      const updatedWork = await worksService.update(id, input);

      // Assert
      expect(updatedWork).toBeNull();
      expect(prismaService.works.update).toHaveBeenCalledWith({
        where: { id },
        data: input,
      });
    });
  });

  describe('delete', () => {
    it('should delete the work with the specified id', async () => {
      // Mock data
      const id = '1';
      const expectedDeletedWork: Works = {
        id: '1',
        chatId: 'chat1',
        listenChannelUsernames: [],
        selectedChatsId: 1,
        listenWords: [],
        muteChannelUsernames: [],
        muteUsernames: [],
        muteWords: [],
        updatedAt: new Date(),
        createdAt: new Date(),
      };

      // Mock PrismaService
      jest
        .spyOn(prismaService.works, 'delete')
        .mockResolvedValueOnce(expectedDeletedWork);

      // Execute the method
      const deletedWork = await worksService.delete(id);

      // Assert
      expect(deletedWork).toEqual(expectedDeletedWork);
      expect(prismaService.works.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });

    it('should return null if no work is found with the specified id', async () => {
      // Mock data
      const id = '1';

      // Mock PrismaService
      jest.spyOn(prismaService.works, 'delete').mockResolvedValueOnce(null);

      // Execute the method
      const deletedWork = await worksService.delete(id);

      // Assert
      expect(deletedWork).toBeNull();
      expect(prismaService.works.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe('deleteAll', () => {
    it('should delete all works and return the count of deleted works', async () => {
      // Mock data
      const expectedDeletedCount = 3;

      // Mock PrismaService
      jest
        .spyOn(prismaService.works, 'deleteMany')
        .mockResolvedValueOnce({ count: expectedDeletedCount });

      // Execute the method
      const deletedCount = await worksService.deleteAll();

      // Assert
      expect(deletedCount).toEqual(expectedDeletedCount);
      expect(prismaService.works.deleteMany).toHaveBeenCalled();
    });

    it('should return 0 if no works are found to delete', async () => {
      // Mock PrismaService
      jest
        .spyOn(prismaService.works, 'deleteMany')
        .mockResolvedValueOnce({ count: 0 });

      // Execute the method
      const deletedCount = await worksService.deleteAll();

      // Assert
      expect(deletedCount).toEqual(0);
      expect(prismaService.works.deleteMany).toHaveBeenCalled();
    });
  });

  describe('startWork', () => {
    it('should create a new work if no work exists with the specified chatId', async () => {
      // Mock data
      const input = {
        id: '1',
        chatId: 'chat1',
        listenChannelUsernames: [],
        selectedChatsId: 1,
        listenWords: [],
        muteChannelUsernames: [],
        muteUsernames: [],
        muteWords: [],
      };
      const expectedCreatedWork: Works = {
        id: '1',
        chatId: 'chat1',
        listenChannelUsernames: [],
        selectedChatsId: 1,
        listenWords: [],
        muteChannelUsernames: [],
        muteUsernames: [],
        muteWords: [],
        updatedAt: new Date(),
        createdAt: new Date(),
      };

      // Mock PrismaService
      jest.spyOn(prismaService.works, 'findFirst').mockResolvedValueOnce(null);
      jest
        .spyOn(prismaService.works, 'create')
        .mockResolvedValueOnce(expectedCreatedWork);

      // Execute the method
      const createdWork = await worksService.startWork(input);

      // Assert
      expect(createdWork).toEqual(expectedCreatedWork);
      expect(prismaService.works.findFirst).toHaveBeenCalledWith({
        where: { chatId: input.chatId.toString() },
      });
      expect(prismaService.works.create).toHaveBeenCalledWith({
        data: { chatId: input.chatId.toString() },
      });
    });

    it('should return the existing work if a work already exists with the specified chatId', async () => {
      // Mock data
      const input = {
        id: '1',
        chatId: 'chat1',
        listenChannelUsernames: [],
        selectedChatsId: 1,
        listenWords: [],
        muteChannelUsernames: [],
        muteUsernames: [],
        muteWords: [],
      };
      const existingWork: Works = {
        id: '1',
        chatId: 'chat1',
        listenChannelUsernames: [],
        selectedChatsId: 1,
        listenWords: [],
        muteChannelUsernames: [],
        muteUsernames: [],
        muteWords: [],
        updatedAt: new Date(),
        createdAt: new Date(),
      };

      // Mock PrismaService
      jest
        .spyOn(prismaService.works, 'findFirst')
        .mockResolvedValueOnce(existingWork);
      jest
        .spyOn(prismaService.works, 'create')
        .mockResolvedValueOnce(existingWork);

      // Execute the method
      const createdWork = await worksService.startWork(input);

      // Assert
      expect(createdWork).toEqual(existingWork);
      expect(prismaService.works.findFirst).toHaveBeenCalledWith({
        where: { chatId: input.chatId.toString() },
      });
      expect(prismaService.works.create).not.toHaveBeenCalled();
    });
  });
});
