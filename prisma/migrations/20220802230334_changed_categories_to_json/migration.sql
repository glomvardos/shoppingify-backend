/*
  Warnings:

  - You are about to drop the `_CategoryToShoppingList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToShoppingList" DROP CONSTRAINT "_CategoryToShoppingList_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToShoppingList" DROP CONSTRAINT "_CategoryToShoppingList_B_fkey";

-- AlterTable
ALTER TABLE "ShoppingList" ADD COLUMN     "categories" JSONB[];

-- DropTable
DROP TABLE "_CategoryToShoppingList";
