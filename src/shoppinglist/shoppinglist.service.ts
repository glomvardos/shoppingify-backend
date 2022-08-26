import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ShoppingListDto, UpdateShoppingListDto } from './dto/dto';

@Injectable()
export class ShoppinglistService {
  constructor(private prisma: PrismaService) {}

  async createShoppingList(dto: ShoppingListDto, userId: number) {
    return this.prisma.shoppingList.create({
      data: {
        name: dto.name,
        categories: {
          create: dto.categories,
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async getShoppingLists(userId: number) {
    return this.prisma.shoppingList.findMany({
      where: {
        user: {
          id: userId,
        },
      },
      include: {
        categories: true,
      },
    });
  }

  async updateShoppingList(
    listId: number,
    itemId: number,
    dto: UpdateShoppingListDto,
  ) {
    const listItem = await this.prisma.shoppingList.update({
      where: {
        id: listId,
      },
      data: {
        categories: {
          update: {
            where: {
              id: itemId,
            },
            data: {
              isChecked: dto.isChecked,
            },
          },
        },
      },
      include: {
        categories: {
          where: {
            id: itemId,
          },
        },
      },
    });
    return listItem;
  }
}
