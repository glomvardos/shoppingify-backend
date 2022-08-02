import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ShoppingListDto } from './dto/dto';

@Injectable()
export class ShoppinglistService {
  constructor(private prisma: PrismaService) {}

  async createShoppingList(dto: ShoppingListDto, userId: number) {
    return this.prisma.shoppingList.create({
      data: {
        name: dto.name,
        categories: dto.categories,

        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
}
