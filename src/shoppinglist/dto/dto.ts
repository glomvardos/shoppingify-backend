import { ShoppingListItem } from '@prisma/client';
import { IsString, IsNotEmpty, IsArray, IsBoolean } from 'class-validator';

export class ShoppingListDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsNotEmpty()
  categories: ShoppingListItem[];
}

export class UpdateShoppingListDto {
  @IsBoolean()
  @IsNotEmpty()
  isChecked: boolean;
}
