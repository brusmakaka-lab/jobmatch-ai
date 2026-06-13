import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2, "Name is required").max(80),
  email: z.string().email("Use a valid email"),
  headline: z.string().max(140).optional(),
  location: z.string().max(80).optional(),
  targetRole: z.string().max(80).optional(),
  bio: z.string().max(500).optional(),
});

export const resumeSchema = z.object({
  title: z.string().min(2, "Resume title is required").max(100),
  content: z.string().min(120, "Paste at least 120 characters from your resume"),
  isActive: z.coerce.boolean().optional(),
});

export const analysisSchema = z.object({
  resumeId: z.string().min(1, "Choose a resume"),
  company: z.string().min(2, "Company is required").max(100),
  title: z.string().min(2, "Role title is required").max(120),
  location: z.string().max(100).optional(),
  description: z.string().min(160, "Paste at least 160 characters from the job offer"),
});

export const applicationStatusSchema = z.object({
  applicationId: z.string().min(1),
  status: z.enum(["saved", "applied", "interview", "rejected", "offer"]),
  notes: z.string().max(1000).optional(),
  nextStep: z.string().max(160).optional(),
});

export function formString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

