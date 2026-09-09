import { NextResponse } from 'next/server';
import { getPublicPortfolioProfile } from '@/server/services/profile.server';

// Streams the CV PDF inline so browsers preview it instead of force-downloading
// (Cloudinary raw files ship Content-Disposition: attachment). `?download=1`
// switches to attachment with the original filename.
export const GET = async (request: Request) => {
  const { cvUrl } = await getPublicPortfolioProfile();
  if (!cvUrl) {
    return new NextResponse('CV not found', { status: 404 });
  }

  const filename = decodeURIComponent(
    cvUrl.split('/').pop() || 'cv.pdf'
  ).replace(/"/g, '');

  const upstream = await fetch(cvUrl);
  if (!upstream.ok || !upstream.body) {
    return new NextResponse('Failed to load CV', { status: 502 });
  }

  const isDownload = new URL(request.url).searchParams.get('download') === '1';

  return new NextResponse(upstream.body, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `${isDownload ? 'attachment' : 'inline'}; filename="${filename}"`,
      'Cache-Control': 'public, max-age=300',
    },
  });
};
