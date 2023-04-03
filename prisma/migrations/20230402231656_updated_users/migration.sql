/*
  Warnings:

  - You are about to drop the column `fname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lname` on the `User` table. All the data in the column will be lost.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;

-- Create a new table with the desired columns and default values for `name` and `role`
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT 'John Doe',
    "username" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "email" TEXT NOT NULL,
    "image" TEXT,
    "password" TEXT NOT NULL
);

-- Copy the data from the old table to the new table, generating unique usernames using the rowid
INSERT INTO "new_User" ("email", "id", "image", "password", "username")
SELECT "email", "id", "image", "password", 'user' || rowid
FROM "User";

-- Drop the old table
DROP TABLE "User";

-- Rename the new table to the old table name
ALTER TABLE "new_User" RENAME TO "User";

-- Create unique indexes for the `username` and `email` columns
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
