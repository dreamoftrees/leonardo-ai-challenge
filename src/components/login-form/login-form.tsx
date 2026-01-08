"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "@/providers/session-provider";
import { type UserProfile, userProfileSchema } from "@/types/user";
import { cn } from "@/lib/utils";

interface LoginFormProps {
  /** Optional callback after successful login */
  onSuccess?: () => void;
  /** Optional CSS class name */
  className?: string;
  /** Mode: 'login' for initial login, 'edit' for profile editing */
  mode?: "login" | "edit";
}

/**
 * Reusable login/profile form component
 * Collects username and job title with validation
 */
export function LoginForm({
  onSuccess,
  className,
  mode = "login",
}: LoginFormProps) {
  const { user, login, updateProfile } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserProfile>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      username: user?.username ?? "",
      jobTitle: user?.jobTitle ?? "",
    },
  });

  const onSubmit = (data: UserProfile) => {
    if (mode === "edit") {
      updateProfile(data);
    } else {
      login(data);
    }
    onSuccess?.();
  };

  const isEditMode = mode === "edit";

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">
          {isEditMode ? "Edit Profile" : "Welcome"}
        </CardTitle>
        <CardDescription>
          {isEditMode
            ? "Update your profile information"
            : "Please enter your details to continue"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              autoFocus
              aria-invalid={!!errors.username}
              aria-describedby={errors.username ? "username-error" : undefined}
              {...register("username")}
            />
            {errors.username && (
              <p
                id="username-error"
                className="text-sm text-destructive"
                role="alert"
              >
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              id="jobTitle"
              type="text"
              placeholder="Enter your job title"
              aria-invalid={!!errors.jobTitle}
              aria-describedby={errors.jobTitle ? "jobTitle-error" : undefined}
              {...register("jobTitle")}
            />
            {errors.jobTitle && (
              <p
                id="jobTitle-error"
                className="text-sm text-destructive"
                role="alert"
              >
                {errors.jobTitle.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : isEditMode
                ? "Save Changes"
                : "Continue"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
