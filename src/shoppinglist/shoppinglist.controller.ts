import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { ShoppingListDto } from './dto/dto';
import { ShoppinglistService } from './shoppinglist.service';

@UseGuards(JwtGuard)
@Controller('shoppinglist')
export class ShoppinglistController {
  constructor(private shoppingListService: ShoppinglistService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('shoppinglist')
  createShoppingList(
    @Body() dto: ShoppingListDto,
    @GetUser('id') userId: number,
  ) {
    return this.shoppingListService.createShoppingList(dto, userId);
  }

  @Get('shoppinglist')
  getShoppingLists(@GetUser('id') userId: number) {
    return this.shoppingListService.getShoppingLists(userId);
  }
}
