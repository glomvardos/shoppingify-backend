import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { ShoppingListDto, UpdateShoppingListDto } from './dto/dto';
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

  @Patch('shoppinglist/:listId/item/:itemId')
  updateShoppingList(
    @Body() dto: UpdateShoppingListDto,
    @Param('listId', ParseIntPipe) listId: number,
    @Param('itemId', ParseIntPipe) itemId: number,
  ) {
    return this.shoppingListService.updateShoppingList(listId, itemId, dto);
  }
}
