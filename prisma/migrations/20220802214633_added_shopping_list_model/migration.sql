-- CreateTable
CREATE TABLE "ShoppingList" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ShoppingList_pkey" PRIMARY KEY ("id")
);

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
ALTER TABLE "ShoppingList" ADD CONSTRAINT "ShoppingList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToShoppingList" ADD CONSTRAINT "_CategoryToShoppingList_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToShoppingList" ADD CONSTRAINT "_CategoryToShoppingList_B_fkey" FOREIGN KEY ("B") REFERENCES "ShoppingList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
