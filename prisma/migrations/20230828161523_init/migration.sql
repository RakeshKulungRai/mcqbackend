-- CreateTable
CREATE TABLE "Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Question" TEXT NOT NULL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "score" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Option" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question_id" INTEGER NOT NULL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Option_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question_id" INTEGER NOT NULL,
    "option_id" INTEGER NOT NULL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Answer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Answer_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "Option" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Challenge" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "score" REAL NOT NULL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "duration" INTEGER DEFAULT 1,
    CONSTRAINT "Challenge_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ChallengeQuestion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "challenge_id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,
    CONSTRAINT "ChallengeQuestion_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "Challenge" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ChallengeQuestion_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ChallegeQuestionAnswer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "challege_question_id" INTEGER NOT NULL,
    "option_id" INTEGER NOT NULL,
    CONSTRAINT "ChallegeQuestionAnswer_challege_question_id_fkey" FOREIGN KEY ("challege_question_id") REFERENCES "ChallengeQuestion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ChallegeQuestionAnswer_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "Option" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Answer_question_id_key" ON "Answer"("question_id");

-- CreateIndex
CREATE UNIQUE INDEX "Answer_option_id_key" ON "Answer"("option_id");

-- CreateIndex
CREATE UNIQUE INDEX "ChallengeQuestion_question_id_challenge_id_key" ON "ChallengeQuestion"("question_id", "challenge_id");

-- CreateIndex
CREATE UNIQUE INDEX "ChallegeQuestionAnswer_challege_question_id_key" ON "ChallegeQuestionAnswer"("challege_question_id");

-- CreateIndex
CREATE UNIQUE INDEX "ChallegeQuestionAnswer_option_id_key" ON "ChallegeQuestionAnswer"("option_id");
