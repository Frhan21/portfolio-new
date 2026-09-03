import { Readable } from 'node:stream';
import type { Adapter } from '@payloadcms/plugin-cloud-storage/types';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  bytes: number;
  width: number;
  height: number;
}

const uploadBuffer = (buffer: Buffer, filename: string) =>
  new Promise<CloudinaryUploadResult>((resolve, reject) => {
    const base = filename.replace(/\.[^.]+$/, '');
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'portfolio', public_id: `${base}-${Date.now()}` },
      (error, result) =>
        error || !result
          ? reject(error ?? new Error('Cloudinary upload failed'))
          : resolve(result)
    );
    Readable.from(buffer).pipe(stream);
  });

export const cloudinaryAdapter = (): Adapter => {
  return () => ({
    name: 'cloudinary',
    handleUpload: async ({ file }) => {
      const result = await uploadBuffer(file.buffer, file.filename);
      return {
        filename: file.filename,
        filesize: result.bytes,
        height: result.height,
        mimeType: file.mimeType,
        publicId: result.public_id,
        url: result.secure_url,
        width: result.width,
      };
    },
    handleDelete: async ({ doc }) => {
      const publicId = (doc as { publicId?: string }).publicId;
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    },
    staticHandler: () => new Response(null, { status: 404 }),
  });
};
