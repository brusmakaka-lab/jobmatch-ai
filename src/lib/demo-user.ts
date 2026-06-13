import { cache } from "react";
import { userRepository } from "@/repositories/user-repository";

const DEMO_EMAIL = "alex.rivera@jobmatch.ai";

export const getCurrentUser = cache(async function getCurrentUser() {
  return userRepository.upsertDemoUser({
    email: DEMO_EMAIL,
    name: "Alex Rivera",
    headline: "Senior product designer moving into AI-powered SaaS",
    location: "Remote, US",
    targetRole: "Product Design Lead",
    bio: "I build systems, research workflows, and launch polished product experiences for B2B teams.",
  });
});
