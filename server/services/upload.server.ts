import cloudinary from '@/lib/cloudinary';

export const uploadImage = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString('base64');
  const dataUrl = `data:${file.type};base64,${base64}`;

  const response = await cloudinary.uploader.upload(dataUrl, {
    folder: 'nextjs-upload',
  });

  return {
    imageUrl: response.secure_url,
    publicId: response.public_id,
  };
};
