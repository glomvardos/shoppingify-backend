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
  async addOne(dto: ItemDto) {
    const itemName = await this.prisma.category.findFirst({
      where: {
        name: dto.name.toLowerCase().trim(),
      },
    });

    if (itemName) throw new ForbiddenException('Item name already exists');

    const category: Category = await this.prisma.category.create({
      data: {
        name: dto.name.toLowerCase().trim(),
        note: dto.note,
        imageUrl: dto.imageUrl,
        category: dto.category,
      },
    });

    return category;
  }

  // GET
  async findAll() {
    const categories: Category[] = await this.prisma.category.findMany();

    return {
      items: categories,
    };
  }

  // DELETE
  async deleteOne(id: string) {
    const isItemExists = await this.prisma.category.findUnique({
      where: {
        id: +id,
      },
    });

    if (!isItemExists) throw new NotFoundException('Item not found');

    const item: Category = await this.prisma.category.delete({
      where: {
        id: +id,
      },
    });

    return item;
  }
}
