import { z } from "zod";

/**
 * Schema for user profile validation
 */
export const userProfileSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(50, "Username must be at most 50 characters"),
  jobTitle: z
    .string()
    .min(1, "Job title is required")
    .max(100, "Job title must be at most 100 characters"),
});

/**
 * User profile type inferred from schema
 */
export type UserProfile = z.infer<typeof userProfileSchema>;

/**
 * Session storage key for localStorage
 */
export const SESSION_STORAGE_KEY = "leonardo-user-session";
