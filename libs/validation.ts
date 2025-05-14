import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3, "Judul harus diisii"),
  tools: z.array(z.string().min(1)).nonempty("Minimal 1 tools"),
  github: z.string().url("Url tidak valid").optional(),
  demo: z.string().url("Url Demo tidak Valid").optional(),
  image: z.string(),
  user_id: z.string(),
  category_id: z.string(),
  author: z.string(),
  category: z.string(),
});
