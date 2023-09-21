-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ChallengeQuestion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "challenge_id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,
    CONSTRAINT "ChallengeQuestion_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "Challenge" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ChallengeQuestion_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ChallengeQuestion" ("challenge_id", "id", "question_id") SELECT "challenge_id", "id", "question_id" FROM "ChallengeQuestion";
DROP TABLE "ChallengeQuestion";
ALTER TABLE "new_ChallengeQuestion" RENAME TO "ChallengeQuestion";
CREATE UNIQUE INDEX "ChallengeQuestion_question_id_challenge_id_key" ON "ChallengeQuestion"("question_id", "challenge_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
