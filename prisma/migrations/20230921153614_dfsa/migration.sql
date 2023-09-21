-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Challenge" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "score" REAL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "duration" INTEGER DEFAULT 1,
    CONSTRAINT "Challenge_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Challenge" ("created_at", "duration", "id", "score", "user_id") SELECT "created_at", "duration", "id", "score", "user_id" FROM "Challenge";
DROP TABLE "Challenge";
ALTER TABLE "new_Challenge" RENAME TO "Challenge";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
