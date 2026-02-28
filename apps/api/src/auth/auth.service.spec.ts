import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma.service';

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashed-password'),
  compare: jest.fn(),
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports
const bcrypt = jest.requireMock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let prismaService: PrismaService;

  const mockUser = {
    id: 'user-id-1',
    email: 'test@example.com',
    password: 'hashed-password',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('mock-jwt-token'),
          },
        },
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn().mockResolvedValue(mockUser),
              findUnique: jest.fn().mockResolvedValue(mockUser),
            },
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('refreshToken', () => {
    it('should return a new access token for a valid user', async () => {
      const result = await service.refreshToken(mockUser.id, mockUser.email);

      expect(result).toEqual({ access_token: 'mock-jwt-token' });
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: mockUser.id,
        email: mockUser.email,
      });
    });
  });

  describe('login', () => {
    it('should throw UnauthorizedException when user is not found', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        service.login('unknown@example.com', 'password'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException when password is invalid', async () => {
      bcrypt.compare.mockResolvedValue(false);

      await expect(
        service.login(mockUser.email, 'wrong-password'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should return access token when credentials are valid', async () => {
      bcrypt.compare.mockResolvedValue(true);

      const result = await service.login(mockUser.email, 'correct-password');

      expect(result).toEqual({ access_token: 'mock-jwt-token' });
    });
  });
});
