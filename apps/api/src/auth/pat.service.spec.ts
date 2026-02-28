import { Test, TestingModule } from '@nestjs/testing';
import { PatService } from './pat.service';
import { PrismaService } from '../prisma.service';
import { NotFoundException } from '@nestjs/common';

const mockPrisma = {
  personalAccessToken: {
    create: jest.fn(),
    findMany: jest.fn(),
    findFirst: jest.fn(),
    findUnique: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  },
};

describe('PatService', () => {
  let service: PatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<PatService>(PatService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a PAT and return the plaintext token once', async () => {
      mockPrisma.personalAccessToken.create.mockResolvedValue({
        id: 'pat-id',
        name: 'test token',
        tokenHash: 'hashed',
        userId: 'user-id',
        lastUsedAt: null,
        expiresAt: null,
        createdAt: new Date(),
      });

      const result = await service.create('user-id', 'test token');

      expect(result.token).toBeDefined();
      expect(typeof result.token).toBe('string');
      expect(result.token.length).toBe(64); // 32 bytes hex
      expect(mockPrisma.personalAccessToken.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ name: 'test token', userId: 'user-id' }),
        }),
      );
    });
  });

  describe('findAll', () => {
    it('should return tokens for the user without tokenHash', async () => {
      const mockTokens = [
        { id: '1', name: 'CI', lastUsedAt: null, expiresAt: null, createdAt: new Date() },
      ];
      mockPrisma.personalAccessToken.findMany.mockResolvedValue(mockTokens);

      const result = await service.findAll('user-id');

      expect(result).toEqual(mockTokens);
      expect(mockPrisma.personalAccessToken.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: { userId: 'user-id' } }),
      );
    });
  });

  describe('revoke', () => {
    it('should delete the token when it belongs to the user', async () => {
      mockPrisma.personalAccessToken.findFirst.mockResolvedValue({ id: 'pat-id', userId: 'user-id' });
      mockPrisma.personalAccessToken.delete.mockResolvedValue({ id: 'pat-id' });

      const result = await service.revoke('user-id', 'pat-id');

      expect(result).toEqual({ id: 'pat-id' });
      expect(mockPrisma.personalAccessToken.delete).toHaveBeenCalledWith({ where: { id: 'pat-id' } });
    });

    it('should throw NotFoundException when token does not belong to user', async () => {
      mockPrisma.personalAccessToken.findFirst.mockResolvedValue(null);

      await expect(service.revoke('user-id', 'other-pat')).rejects.toThrow(NotFoundException);
    });
  });

  describe('validateToken', () => {
    it('should return user payload for a valid token', async () => {
      const plainToken = 'a'.repeat(64);
      mockPrisma.personalAccessToken.findUnique.mockResolvedValue({
        id: 'pat-id',
        expiresAt: null,
        user: { id: 'user-id', email: 'user@example.com' },
      });
      mockPrisma.personalAccessToken.update.mockResolvedValue({});

      const result = await service.validateToken(plainToken);

      expect(result).toEqual({ sub: 'user-id', email: 'user@example.com' });
    });

    it('should return null for an unknown token', async () => {
      mockPrisma.personalAccessToken.findUnique.mockResolvedValue(null);

      const result = await service.validateToken('unknowntoken');

      expect(result).toBeNull();
    });

    it('should return null for an expired token', async () => {
      mockPrisma.personalAccessToken.findUnique.mockResolvedValue({
        id: 'pat-id',
        expiresAt: new Date('2000-01-01'),
        user: { id: 'user-id', email: 'user@example.com' },
      });

      const result = await service.validateToken('sometoken');

      expect(result).toBeNull();
    });
  });
});
