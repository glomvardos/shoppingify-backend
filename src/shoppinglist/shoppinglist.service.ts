import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  ShoppingListDto,
  UpdateShoppingListDto,
  UpdateShoppingListItemDto,
} from './dto/dto';

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
    userId: number,
    listId: number,
    dto: UpdateShoppingListDto,
  ) {
    const user = await this.prisma.shoppingList.findFirst({
      where: {
        id: listId,
        userId,
      },
    });
    if (!user) {
      throw new ForbiddenException('You are not allowed to update this list');
    }

    const list = await this.prisma.shoppingList.update({
      where: {
        id: listId,
      },
      data: {
        isCompleted: dto.isCompleted,
        isCancelled: dto.isCancelled,
      },
    });
    return list;
  }

  async updateShoppingListItem(
    userId: number,
    listId: number,
    itemId: number,
    dto: UpdateShoppingListItemDto,
  ) {
    const user = await this.prisma.shoppingList.findFirst({
      where: {
        id: listId,
        userId,
      },
    });
    if (!user) {
      throw new ForbiddenException(
        'You are not allowed to update this list item',
      );
    }

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

  async deleteShoppingList(userId: number, listId: number) {
    const user = await this.prisma.shoppingList.findFirst({
      where: {
        id: listId,
        userId,
      },
    });
    if (!user) {
      throw new ForbiddenException('You are not allowed to delete this list');
    }

    return await this.prisma.shoppingList.delete({
      where: {
        id: listId,
      },
    });
  }
}
