import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SingUpAuthDto, SignInDto } from './dto/dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: SingUpAuthDto) {
    const password = await argon.hash(dto.password);

    try {
      const user: User = await this.prisma.user.create({
        data: {
          email: dto.email.toLowerCase(),
          password,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already exists');
        }
      }
      throw error;
    }
  }

  async signin(dto: SignInDto) {
    const user: User = await this.prisma.user.findUnique({
      where: {
        email: dto.email.toLowerCase(),
      },
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isValidPassword = await argon.verify(user.password, dto.password);

    if (!isValidPassword)
      throw new UnauthorizedException('Invalid credentials');

    return this.signToken(user.id, user.email);
  }

  async getAuthUser(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    delete user.password;
    return user;
  }

  async deleteUser(userId: number) {
    return await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }

  async signToken(userId: number, email: string): Promise<{ access: string }> {
    const payload = { sub: userId, email };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '7d',
      secret: this.config.get('JWT_SECRET'),
    });
    return {
      access: token,
    };
  }
}
