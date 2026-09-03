import z from 'zod';

const LoginSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .min(1, 'Password is required'),
});

export default LoginSchema;

export type LoginSchemaType = z.infer<typeof LoginSchema>;
