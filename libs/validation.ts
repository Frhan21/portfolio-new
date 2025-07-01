import { z } from "zod";

export const categorySchema = z.object({
  title: z.string().min(1, "Judul kategori tidak boleh kosong"),
});

export const projectSchema = z.object({
  title: z.string().min(1, "Judul proyek tidak boleh kosong"),
  image: z
    .instanceof(File)
    .refine((file) => file.type.startsWith("image/"))
    .refine((file) => file.size > 0, "Gambar proyek tidak boleh kosong")
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "Ukuran gambar maksimal 5MB"
    ),

  demo: z.string().url("URL demo tidak valid").optional(),
  github: z.string().url("URL GitHub tidak valid").optional(),
  tags: z
    .array(z.string().min(1, "Tag tidak boleh kosong"))
    .min(1, "Setidaknya satu tag diperlukan"),
  categoryId: z.string()
});


export const projectUpdateSchema = z.object({
  title: z.string().min(1, "Judul proyek tidak boleh kosong"),
  image: z
    .instanceof(File)
    .refine((file) => file.type.startsWith("image/"))
    .refine((file) => file.size > 0, "Gambar proyek tidak boleh kosong")
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "Ukuran gambar maksimal 5MB"
    ).optional(),

  demo: z.string().url("URL demo tidak valid").optional(),
  github: z.string().url("URL GitHub tidak valid").optional(),
  tags: z
    .array(z.string().min(1, "Tag tidak boleh kosong"))
    .min(1, "Setidaknya satu tag diperlukan"),
  categoryId: z.string()
});

export const userSchema = z.object({
  name: z.string().min(2, "Nama harus diisi"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password harus minimal 6 karakter"),
});

export const certficateSchema = z.object({
  title: z.string().min(1, "Judul sertifikat tidak boleh kosong"),
  image: z
    .instanceof(File)
    .refine((file) => file.type.startsWith("image/"))
    .refine((file) => file.size > 0, "Gambar sertifikat tidak boleh kosong")
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "Ukuran gambar maksimal 5MB"
    ),
  issuer: z.string().min(1, "Organisasi tidak boleh kosong"),
  issuer_date: z.string().min(1, "Tanggal tidak boleh kosong"), 
  categoryId: z.string().min(1, "Kategori tidak boleh kosong")
});
