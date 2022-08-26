/*
  Warnings:

  - You are about to drop the column `isChecked` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the `_CategoryToShoppingList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToShoppingList" DROP CONSTRAINT "_CategoryToShoppingList_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToShoppingList" DROP CONSTRAINT "_CategoryToShoppingList_B_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "isChecked",
DROP COLUMN "quantity";

-- DropTable
DROP TABLE "_CategoryToShoppingList";

-- CreateTable
CREATE TABLE "ShoppingListItem" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "shoppingListId" INTEGER,
    "isChecked" BOOLEAN NOT NULL DEFAULT false,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "ShoppingListItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ShoppingListItem" ADD CONSTRAINT "ShoppingListItem_shoppingListId_fkey" FOREIGN KEY ("shoppingListId") REFERENCES "ShoppingList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
