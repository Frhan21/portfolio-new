import { auth } from '@/lib/auth';

export async function isAuthenticatedRequest() {
  return Boolean((await auth())?.user?.id);
}
