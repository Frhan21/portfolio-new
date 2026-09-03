import { revalidateTag } from 'next/cache';

export const revalidateCollection = (tag: string) => {
  try {
    revalidateTag(tag, 'max');
  } catch {
    // noop di luar scope request Next.js (mis. script migrasi)
  }
};
