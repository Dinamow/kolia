import { z } from "zod";

// Gender enum
export const GenderSchema = z.enum(["MALE", "FEMALE", "OTHER"]);

// User type enum (excluding ADMIN as it can't be created via signup)
export const UserTypeSchema = z.enum(["TEAM_LEADER", "INDIVIDUAL"]);

// Signup schema
export const SignupSchema = z.object({
  firstName: z.string().min(1, "First name is required").trim(),
  lastName: z.string().min(1, "Last name is required").trim(),
  email: z.email("Invalid email format").toLowerCase().trim(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  whatsappNumber: z
    .string()
    .regex(
      /^\+20\d{10}$/,
      "WhatsApp number must be in format +20XXXXXXXXXX (Egypt)"
    ),
  gender: GenderSchema,
  userType: UserTypeSchema,
});

// Signup form schema (includes confirmPassword for frontend)
export const SignupFormSchema = SignupSchema.extend({
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Login schema
export const LoginSchema = z.object({
  email: z.email("Invalid email format").toLowerCase().trim(),
  password: z.string().min(1, "Password is required"),
});

// Tech skill schema
export const TechSkillSchema = z.object({
  skillName: z.string().min(1, "Skill name is required").trim(),
  proficiency: z
    .number()
    .min(0, "Proficiency must be at least 0")
    .max(10, "Proficiency must be at most 10"),
  notes: z.string().optional().nullable(),
});

// Tech skills array schema
export const TechSkillsSchema = z.object({
  skills: z.array(TechSkillSchema).min(1, "At least one skill is required"),
});

// Type exports for TypeScript
export type SignupInput = z.infer<typeof SignupSchema>;
export type SignupFormInput = z.infer<typeof SignupFormSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type TechSkillInput = z.infer<typeof TechSkillSchema>;
export type TechSkillsInput = z.infer<typeof TechSkillsSchema>;
