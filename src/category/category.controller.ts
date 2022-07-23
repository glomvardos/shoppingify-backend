import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { CategoryService } from './category.service';
import { ItemDto } from './dto/dto';
@UseGuards(JwtGuard)
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('item')
  @HttpCode(201)
  addOne(@Body() dto: ItemDto, @GetUser('id') userId: number) {
    return this.categoryService.addOne(dto, userId);
  }

  @Get('item')
  @HttpCode(200)
  findAll(@GetUser('id') userId: number) {
    return this.categoryService.findAll(userId);
  }

  @Delete('item/:id')
  @HttpCode(204)
  deleteOne(@Param('id') id: string, @GetUser('id') userId: number) {
    return this.categoryService.deleteOne(id, userId);
  }
}
