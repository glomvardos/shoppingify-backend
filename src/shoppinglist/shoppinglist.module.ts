import { Module } from '@nestjs/common';
import { ShoppinglistController } from './shoppinglist.controller';
import { ShoppinglistService } from './shoppinglist.service';

@Module({
  providers: [ShoppinglistService],
  controllers: [ShoppinglistController],
})
export class ShoppinglistModule {}
