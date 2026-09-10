import cloudinary from '@/lib/cloudinary';

export type ProjectContentMedia = {
  publicId: string;
  resourceType: 'image' | 'raw';
};

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

export const uploadProjectContentImage = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const dataUrl = `data:${file.type};base64,${Buffer.from(arrayBuffer).toString('base64')}`;
  const response = await cloudinary.uploader.upload(dataUrl, {
    folder: 'project-content/images',
    format: 'webp',
    quality: 'auto:best',
  });

  return {
    src: response.secure_url,
    publicId: response.public_id,
    width: response.width,
    height: response.height,
    size: file.size,
  };
};

export const uploadProjectContentPdf = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const dataUrl = `data:application/pdf;base64,${Buffer.from(arrayBuffer).toString('base64')}`;
  const safeName =
    file.name
      .replace(/\.pdf$/i, '')
      .replace(/[^\w-]+/g, '_')
      .replace(/^_+|_+$/g, '') || 'document';
  const response = await cloudinary.uploader.upload(dataUrl, {
    folder: 'project-content/documents',
    resource_type: 'raw',
    public_id: `${crypto.randomUUID()}-${safeName}.pdf`,
  });

  return {
    url: response.secure_url,
    publicId: response.public_id,
    fileName: file.name,
    size: file.size,
  };
};

export const deleteProjectContentMedia = ({
  publicId,
  resourceType,
}: ProjectContentMedia) =>
  cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
    invalidate: true,
  });
