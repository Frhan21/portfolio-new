import { z } from 'zod';

const optionalUrl = z
  .union([z.literal(''), z.string().url('URL tidak valid')])
  .optional()
  .transform((e) => (e === '' ? undefined : e));

const optionalHttpUrl = optionalUrl.refine(
  (value) => !value || /^https?:\/\//.test(value),
  'URL harus menggunakan http atau https'
);

export const portfolioProfileSchema = z.object({
  displayName: z.string().trim().min(2, 'Nama minimal 2 karakter').max(80),
  headline: z.string().trim().min(10, 'Headline minimal 10 karakter').max(160),
  bio: z.string().trim().min(20, 'Bio minimal 20 karakter').max(1000),
  email: z.string().trim().email('Email tidak valid'),
  cvUrl: optionalHttpUrl,
  githubUrl: optionalHttpUrl,
  linkedinUrl: optionalHttpUrl,
  instagramUrl: optionalHttpUrl,
  twitterUrl: optionalHttpUrl,
});

export const categorySchema = z.object({
  title: z.string().min(1, 'Judul kategori tidak boleh kosong'),
});

export const projectSchema = z.object({
  title: z.string().min(1, 'Judul proyek tidak boleh kosong'),
  image: z
    .instanceof(File)
    .refine((file) => file.type.startsWith('image/'))
    .refine((file) => file.size > 0, 'Gambar proyek tidak boleh kosong')
    .refine(
      (file) => file.size <= 1 * 1024 * 1024,
      'Ukuran gambar maksimal 1MB'
    ),

  demo: optionalUrl.refine(
    (value) => !value || /^https?:\/\//.test(value),
    'URL demo tidak valid'
  ),
  github: optionalUrl.refine(
    (value) => !value || /^https?:\/\//.test(value),
    'URL GitHub tidak valid'
  ),
  tags: z
    .array(z.string().min(1, 'Tag tidak boleh kosong'))
    .min(1, 'Setidaknya satu tag diperlukan'),
  categoryId: z.string().min(1, 'Kategori wajib dipilih'),
});

export const projectUpdateSchema = z.object({
  title: z.string().min(1, 'Judul proyek tidak boleh kosong'),
  image: z
    .instanceof(File)
    .refine((file) => file.type.startsWith('image/'))
    .refine((file) => file.size > 0, 'Gambar proyek tidak boleh kosong')
    .refine(
      (file) => file.size <= 1 * 1024 * 1024,
      'Ukuran gambar maksimal 1MB'
    )
    .optional(),

  demo: optionalUrl.refine(
    (value) => !value || /^https?:\/\//.test(value),
    'URL demo tidak valid'
  ),
  github: optionalUrl.refine(
    (value) => !value || /^https?:\/\//.test(value),
    'URL GitHub tidak valid'
  ),
  tags: z
    .array(z.string().min(1, 'Tag tidak boleh kosong'))
    .min(1, 'Setidaknya satu tag diperlukan'),
  categoryId: z.string().min(1, 'Kategori wajib dipilih'),
});

export const userSchema = z.object({
  name: z.string().min(2, 'Nama harus diisi'),
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password harus minimal 6 karakter'),
});

export const certficateSchema = z.object({
  title: z.string().min(1, 'Judul sertifikat tidak boleh kosong'),
  image: z
    .instanceof(File)
    .refine((file) => file.type.startsWith('image/'))
    .refine((file) => file.size > 0, 'Gambar sertifikat tidak boleh kosong')
    .refine(
      (file) => file.size <= 1 * 1024 * 1024,
      'Ukuran gambar maksimal 1MB'
    ),
  issuer: z.string().min(1, 'Organisasi tidak boleh kosong'),
  issuer_date: z.string().min(1, 'Tanggal tidak boleh kosong'),
  categoryId: z.string().min(1, 'Kategori tidak boleh kosong'),
});

export const certificateUpdateSchema = certficateSchema.partial();

export const experienceSchema = z
  .object({
    company: z.string().min(1, 'Nama perusahaan tidak boleh kosong'),
    position: z.string().min(1, 'Posisi tidak boleh kosong'),
    startDate: z.string().min(1, 'Tanggal mulai tidak boleh kosong'),
    endDate: z.string().optional(),
    isCurrent: z.boolean(),
    description: z.string().min(1, 'Deskripsi tidak boleh kosong'),
    badges: z.array(z.string().min(1, 'Badge tidak boleh kosong')),
  })
  .refine((data) => data.isCurrent || !!data.endDate, {
    message: 'Tanggal selesai wajib diisi',
    path: ['endDate'],
  })
  .refine(
    (data) => {
      if (!data.endDate) return true;
      return new Date(`${data.endDate}-01`) >= new Date(`${data.startDate}-01`);
    },
    {
      message: 'Tanggal selesai tidak boleh lebih awal dari tanggal mulai',
      path: ['endDate'],
    }
  );
