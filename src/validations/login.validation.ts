import z from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Please enter your email or username" })
    .email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Please enter your password" }),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
