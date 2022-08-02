import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class ShoppingListDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsNotEmpty()
  categories: [];
}
