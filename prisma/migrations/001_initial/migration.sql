CREATE TABLE "Student" ("id" TEXT PRIMARY KEY, "name" TEXT NOT NULL, "phone" TEXT, "guardianName" TEXT, "guardianPhone" TEXT);
CREATE TABLE "Session" ("id" TEXT PRIMARY KEY, "title" TEXT NOT NULL, "date" TEXT NOT NULL, "time" TEXT NOT NULL, "coach" TEXT NOT NULL, "capacity" INTEGER NOT NULL);
CREATE TABLE "Booking" ("id" TEXT PRIMARY KEY, "studentId" TEXT NOT NULL REFERENCES "Student"("id"), "sessionId" TEXT NOT NULL REFERENCES "Session"("id"), "status" TEXT NOT NULL);
CREATE TABLE "Membership" ("id" TEXT PRIMARY KEY, "studentId" TEXT NOT NULL REFERENCES "Student"("id"), "title" TEXT NOT NULL, "startDate" TEXT NOT NULL, "endDate" TEXT NOT NULL);
CREATE TABLE "Notice" ("id" TEXT PRIMARY KEY, "title" TEXT NOT NULL, "date" TEXT NOT NULL, "content" TEXT NOT NULL);
