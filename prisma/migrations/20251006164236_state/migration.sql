-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Asset" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoryId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "detail" TEXT,
    "state" TEXT NOT NULL DEFAULT 'GOOD',
    "acquired" DATETIME,
    "disposed" DATETIME,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "departmentId" INTEGER NOT NULL,
    "locationId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Asset_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Asset_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Asset_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Asset" ("acquired", "categoryId", "createdAt", "departmentId", "detail", "disposed", "id", "locationId", "name", "quantity", "updatedAt") SELECT "acquired", "categoryId", "createdAt", "departmentId", "detail", "disposed", "id", "locationId", "name", "quantity", "updatedAt" FROM "Asset";
DROP TABLE "Asset";
ALTER TABLE "new_Asset" RENAME TO "Asset";
CREATE UNIQUE INDEX "Asset_name_key" ON "Asset"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
