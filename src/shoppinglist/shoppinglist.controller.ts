import {
  Body,
  Controller,
  Delete,
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
import {
  ShoppingListDto,
  UpdateShoppingListDto,
  UpdateShoppingListItemDto,
} from './dto/dto';
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

  @Patch('shoppinglist/:listId')
  updateShoppingList(
    @GetUser('id') userId: number,
    @Body() dto: UpdateShoppingListDto,
    @Param('listId', ParseIntPipe) listId: number,
  ) {
    return this.shoppingListService.updateShoppingList(userId, listId, dto);
  }

  @Patch('shoppinglist/:listId/item/:itemId')
  updateShoppingListItem(
    @GetUser('id') userId: number,
    @Body() dto: UpdateShoppingListItemDto,
    @Param('listId', ParseIntPipe) listId: number,
    @Param('itemId', ParseIntPipe) itemId: number,
  ) {
    return this.shoppingListService.updateShoppingListItem(
      userId,
      listId,
      itemId,
      dto,
    );
  }

  @Delete('shoppinglist/:listId')
  deleteShoppingList(
    @GetUser('id') userId: number,
    @Param('listId', ParseIntPipe) listId: number,
  ) {
    return this.shoppingListService.deleteShoppingList(userId, listId);
  }
}
