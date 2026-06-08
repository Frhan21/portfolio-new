-- Rename existing Prisma tables to the physical table names declared with @@map.
-- This keeps the old data in place and only changes the database table names.
DO $$
BEGIN
    IF to_regclass('"Category"') IS NOT NULL AND to_regclass('categories') IS NULL THEN
        ALTER TABLE "Category" RENAME TO "categories";
    END IF;

    IF to_regclass('"User"') IS NOT NULL AND to_regclass('users') IS NULL THEN
        ALTER TABLE "User" RENAME TO "users";
    END IF;

    IF to_regclass('"Project"') IS NOT NULL AND to_regclass('projects') IS NULL THEN
        ALTER TABLE "Project" RENAME TO "projects";
    END IF;

    IF to_regclass('"Certificate"') IS NOT NULL AND to_regclass('certificates') IS NULL THEN
        ALTER TABLE "Certificate" RENAME TO "certificates";
    END IF;

    IF to_regclass('"RefreshToken"') IS NOT NULL AND to_regclass('refresh_tokens') IS NULL THEN
        ALTER TABLE "RefreshToken" RENAME TO "refresh_tokens";
    END IF;
END $$;

-- CreateTable
CREATE TABLE IF NOT EXISTS "experiences" (
    "id" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "description" TEXT NOT NULL,
    "badges" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "experiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "refresh_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revoked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "refresh_tokens_token_key" ON "refresh_tokens"("token");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "refresh_tokens_userId_idx" ON "refresh_tokens"("userId");

-- AddForeignKey
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'refresh_tokens_userId_fkey'
    ) THEN
        ALTER TABLE "refresh_tokens"
        ADD CONSTRAINT "refresh_tokens_userId_fkey"
        FOREIGN KEY ("userId") REFERENCES "users"("id")
        ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;
