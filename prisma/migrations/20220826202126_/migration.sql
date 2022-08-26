/*
  Warnings:

  - You are about to drop the column `isCompleted` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `categories` on the `ShoppingList` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "isCompleted",
ADD COLUMN     "isChecked" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "ShoppingList" DROP COLUMN "categories";

-- CreateTable
CREATE TABLE "_CategoryToShoppingList" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToShoppingList_AB_unique" ON "_CategoryToShoppingList"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToShoppingList_B_index" ON "_CategoryToShoppingList"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToShoppingList" ADD CONSTRAINT "_CategoryToShoppingList_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToShoppingList" ADD CONSTRAINT "_CategoryToShoppingList_B_fkey" FOREIGN KEY ("B") REFERENCES "ShoppingList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
