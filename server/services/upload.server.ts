import cloudinary from '@/lib/cloudinary';

export const uploadImage = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString('base64');
  const dataUrl = `data:${file.type};base64,${base64}`;

  const response = await cloudinary.uploader.upload(dataUrl, {
    folder: 'nextjs-upload',
    format: 'webp',
    quality: 'auto:best',
  });

  return {
    imageUrl: response.secure_url,
    publicId: response.public_id,
  };
};

export const uploadPdf = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString('base64');
  const dataUrl = `data:application/pdf;base64,${base64}`;

  // public_id = original filename (sanitized) so downloads keep a familiar name.
  // resource_type 'raw': PDF delivery via image type requires Cloudinary's
  // PDF/AZW add-on (401 without it); raw has no gate. Inline viewing is done
  // by /api/cv proxy route.
  const safeName =
    file.name
      .replace(/\.pdf$/i, '')
      .replace(/[^\w-]+/g, '_')
      .replace(/^_+|_+$/g, '') || 'cv';

  const response = await cloudinary.uploader.upload(dataUrl, {
    folder: 'cv',
    resource_type: 'raw',
    public_id: `${safeName}.pdf`,
    overwrite: true,
    invalidate: true,
  });

  return {
    fileUrl: response.secure_url,
    publicId: response.public_id,
  };
};
