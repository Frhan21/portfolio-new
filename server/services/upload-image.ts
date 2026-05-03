import cloudinary from '@/lib/cloudinary';

export const uploadCoverImage = async (image: File) => {
  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  console.log('Got Buffer');

  const base64 = buffer.toString('base64');
  const dataUrl = `data:${image.type};base64,${base64}`;

  const response = await cloudinary.uploader.upload(dataUrl, {
    folder: 'nextjs-upload',
  });

  const imageUrl = response.secure_url;
  const publicId = response.public_id;

  console.log('Got Data URL');

  return { imageUrl, publicId };
};
