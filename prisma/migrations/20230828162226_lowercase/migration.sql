/*
  Warnings:

  - You are about to drop the column `Question` on the `Question` table. All the data in the column will be lost.
  - Added the required column `question` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question" TEXT NOT NULL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "score" REAL NOT NULL
);
INSERT INTO "new_Question" ("created_at", "id", "score") SELECT "created_at", "id", "score" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
