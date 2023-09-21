/*
  Warnings:

  - Added the required column `challenge_participate_id` to the `ChallegeQuestionAnswer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `ChallegeQuestionAnswer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "ChalleneParticipate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "challenge_id" INTEGER NOT NULL,
    "scrore" INTEGER,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ChalleneParticipate_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "Challenge" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ChalleneParticipate_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ChallegeQuestionAnswer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "challege_question_id" INTEGER NOT NULL,
    "option_id" INTEGER NOT NULL,
    "challenge_participate_id" INTEGER NOT NULL,
    CONSTRAINT "ChallegeQuestionAnswer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ChallegeQuestionAnswer_challege_question_id_fkey" FOREIGN KEY ("challege_question_id") REFERENCES "ChallengeQuestion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ChallegeQuestionAnswer_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "Option" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ChallegeQuestionAnswer_challenge_participate_id_fkey" FOREIGN KEY ("challenge_participate_id") REFERENCES "ChalleneParticipate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ChallegeQuestionAnswer" ("challege_question_id", "id", "option_id") SELECT "challege_question_id", "id", "option_id" FROM "ChallegeQuestionAnswer";
DROP TABLE "ChallegeQuestionAnswer";
ALTER TABLE "new_ChallegeQuestionAnswer" RENAME TO "ChallegeQuestionAnswer";
CREATE UNIQUE INDEX "ChallegeQuestionAnswer_challege_question_id_key" ON "ChallegeQuestionAnswer"("challege_question_id");
CREATE UNIQUE INDEX "ChallegeQuestionAnswer_option_id_key" ON "ChallegeQuestionAnswer"("option_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "ChalleneParticipate_challenge_id_key" ON "ChalleneParticipate"("challenge_id");
