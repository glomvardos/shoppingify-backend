import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { ItemDto } from './dto/dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('item')
  @HttpCode(201)
  addOne(@Body() dto: ItemDto) {
    return this.categoryService.addOne(dto);
  }

  @Get('item')
  @HttpCode(200)
  findAll() {
    return this.categoryService.findAll();
  }

  @Delete('item/:id')
  @HttpCode(204)
  deleteOne(@Param('id') id: string) {
    return this.categoryService.deleteOne(id);
  }
}
