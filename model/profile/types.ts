export interface PortfolioProfile {
  id: number;
  displayName: string;
  headline: string;
  bio: string;
  email: string;
  cvUrl: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  instagramUrl: string | null;
  twitterUrl: string | null;
  updatedAt: Date;
}

export interface PortfolioProfileInput {
  displayName: string;
  headline: string;
  bio: string;
  email: string;
  cvUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
}

export type PortfolioProfileActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };
