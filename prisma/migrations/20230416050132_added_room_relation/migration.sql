-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MessageSeen" (
    "messageId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "seen" BOOLEAN NOT NULL,

    PRIMARY KEY ("messageId", "userId"),
    CONSTRAINT "MessageSeen_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MessageSeen_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MessageSeen_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MessageSeen" ("messageId", "roomId", "seen", "userId") SELECT "messageId", "roomId", "seen", "userId" FROM "MessageSeen";
DROP TABLE "MessageSeen";
ALTER TABLE "new_MessageSeen" RENAME TO "MessageSeen";
CREATE INDEX "MessageSeen_roomId_idx" ON "MessageSeen"("roomId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
