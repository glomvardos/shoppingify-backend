import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ItemDto } from './dto/dto';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  // POST
  async addOne(dto: ItemDto, userId: number) {
    const items = await this.prisma.category.findMany({
      where: {
        userId: userId,
      },
    });

    const isExistingItem = items.some((item) => item.name === dto.name);
    if (isExistingItem) throw new ForbiddenException('Item already exists');

    const category: Category = await this.prisma.category.create({
      data: {
        name: dto.name.toLowerCase().trim(),
        note: dto.note,
        imageUrl: dto.imageUrl,
        category: dto.category.toLowerCase(),
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return category;
  }

  // GET
  async findAll(userId: number) {
    const categories: Category[] = await this.prisma.category.findMany({
      where: {
        userId,
      },
    });

    return {
      items: categories,
    };
  }

  // DELETE
  async deleteOne(id: string, userId: number) {
    const item = await this.prisma.category.findUnique({
      where: {
        id: +id,
      },
    });

    if (item.userId !== userId)
      throw new ForbiddenException('You are not allowed to delete this item');

    if (!item) throw new NotFoundException('Item not found');

    return await this.prisma.category.delete({
      where: {
        id: +id,
      },
    });
  }
}
