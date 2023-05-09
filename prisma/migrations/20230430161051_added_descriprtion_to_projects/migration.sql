/*
  Warnings:

  - Added the required column `description` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Projects" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "completionDate" DATETIME,
    "deadline" DATETIME NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Projects" ("completed", "completionDate", "deadline", "id", "name") SELECT "completed", "completionDate", "deadline", "id", "name" FROM "Projects";
DROP TABLE "Projects";
ALTER TABLE "new_Projects" RENAME TO "Projects";
CREATE UNIQUE INDEX "Projects_id_key" ON "Projects"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
