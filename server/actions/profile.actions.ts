'use server';

import { updateTag } from 'next/cache';
import { auth } from '@/lib/auth';
import { portfolioProfileSchema } from '@/lib/validation';
import {
  PortfolioProfile,
  PortfolioProfileActionResult,
} from '@/model/profile';
import { uploadPdf } from '@/server/services/upload.server';
import * as ProfileService from '@/server/services/profile.server';

export async function updatePortfolioProfile(
  input: unknown
): Promise<PortfolioProfileActionResult<PortfolioProfile>> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: 'Unauthorized' };
  }

  const validated = portfolioProfileSchema.safeParse(input);
  if (!validated.success) {
    return { success: false, error: validated.error.errors[0].message };
  }

  try {
    const { cvFile, ...data } = validated.data;

    if (cvFile && cvFile.size > 0) {
      const { fileUrl } = await uploadPdf(cvFile);
      data.cvUrl = fileUrl;
    }

    const profile = await ProfileService.updatePortfolioProfile(data);
    updateTag('portfolio-profile');
    return { success: true, data: profile };
  } catch {
    return { success: false, error: 'Gagal menyimpan pengaturan portfolio' };
  }
}
