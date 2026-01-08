import { redirect } from "next/navigation";

/**
 * Custom 404 handler - redirects all not-found pages to /information
 */
export default function NotFound() {
  redirect("/information");
}
