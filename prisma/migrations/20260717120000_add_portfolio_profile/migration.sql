CREATE TABLE "portfolio_profile" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "displayName" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cvUrl" TEXT,
    "githubUrl" TEXT,
    "linkedinUrl" TEXT,
    "instagramUrl" TEXT,
    "twitterUrl" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "portfolio_profile_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "portfolio_profile_singleton" CHECK ("id" = 1)
);
