import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import type { PoolConfig } from "pg";
import type { ApplicationStatus } from "../src/generated/prisma/enums";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required to seed the database");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg(getPgConfig(connectionString)),
});

function getPgConfig(connectionString: string): PoolConfig {
  const hostname = new URL(connectionString).hostname;
  const isLocalDatabase = hostname === "localhost" || hostname === "127.0.0.1";

  return {
    connectionString,
    ssl: isLocalDatabase ? undefined : { rejectUnauthorized: true },
  };
}

type SeedAnalysis = {
  company: string;
  title: string;
  location: string;
  description: string;
  matchScore: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  missingSkills: string[];
  suggestedImprovements: string[];
  status: ApplicationStatus;
  nextStep: string;
  notes: string;
};

const resumeContent = {
  primary:
    "Senior product designer and product strategy partner with 8 years in SaaS, design systems, research, analytics, stakeholder facilitation, accessibility, and experimentation. Led discovery for AI workflow tooling, improved activation by 18%, built executive dashboards with SQL insights, and partnered with engineering teams using React and TypeScript delivery models.",
  growth:
    "Product design lead focused on growth systems, onboarding, pricing experiments, and customer discovery for B2B SaaS. Built research programs, shipped design system foundations, improved trial-to-paid conversion, and partnered with PM, engineering, data, and sales teams to prioritize roadmap bets.",
};

const analyses: SeedAnalysis[] = [
  {
    company: "Northstar Cloud",
    title: "Product Design Lead, AI Workflows",
    location: "Remote",
    description:
      "We are hiring a Product Design Lead for AI workflow products. The role requires SaaS experience, product strategy, customer discovery, analytics, experimentation, design systems, accessibility, stakeholder leadership, and close partnership with React and TypeScript engineering teams.",
    matchScore: 88,
    summary:
      "Alex has strong alignment through SaaS design leadership, AI workflow exposure, research, analytics, experimentation, and design systems.",
    strengths: [
      "Design systems and accessibility are directly represented in the resume.",
      "AI workflow discovery creates a strong narrative fit for the role.",
      "Analytics and experimentation support measurable product decision-making.",
    ],
    weaknesses: [
      "Leadership scope could be quantified with team size and decision ownership.",
      "The summary should mention AI workflow products in the first sentence.",
    ],
    missingSkills: ["No major required skills detected as missing"],
    suggestedImprovements: [
      "Move the AI workflow project into the top third of the resume.",
      "Add one bullet with team size, timeline, and measurable business outcome.",
      "Use the job title language in the resume summary before applying.",
    ],
    status: "interview",
    nextStep: "Prepare portfolio walkthrough around the AI workflow project",
    notes: "Emphasize discovery rigor, activation impact, and design systems maturity.",
  },
  {
    company: "Orbitly",
    title: "Senior Product Manager, Growth AI",
    location: "New York or Remote",
    description:
      "The Growth AI team needs a product leader with SaaS analytics, experimentation, customer discovery, SQL fluency, stakeholder management, pricing experience, and an ability to partner with design and engineering on AI-assisted user journeys.",
    matchScore: 76,
    summary:
      "The resume shows strong growth, discovery, and analytics signal, but product management ownership and pricing impact need sharper proof.",
    strengths: [
      "Growth systems and onboarding work map closely to the role.",
      "Analytics, experimentation, and customer discovery are clear strengths.",
      "Cross-functional collaboration with PM, data, sales, and engineering is relevant.",
    ],
    weaknesses: [
      "Product management ownership is implied rather than explicit.",
      "Pricing experience needs a concrete metric or project example.",
    ],
    missingSkills: ["SQL", "Pricing strategy"],
    suggestedImprovements: [
      "Add one bullet describing SQL-backed analysis or dashboard work.",
      "Clarify whether pricing experiments influenced packaging or conversion.",
      "Reframe the opening summary for a product leadership audience.",
    ],
    status: "applied",
    nextStep: "Send follow-up with one growth experiment case study",
    notes: "Good portfolio story if positioned as product strategy, not only design.",
  },
  {
    company: "Cobalt Health",
    title: "Principal UX Designer, Patient AI",
    location: "Hybrid, Boston",
    description:
      "This role requires accessibility, design systems, research operations, stakeholder leadership, regulated healthcare experience, AI product judgment, and the ability to communicate complex workflows to clinical and product teams.",
    matchScore: 69,
    summary:
      "Alex has strong UX systems and AI workflow signal, but healthcare and regulated-domain evidence are not present enough for a principal-level pitch.",
    strengths: [
      "Accessibility, design systems, and research are strong role matches.",
      "Complex workflow experience supports the patient AI product context.",
      "Stakeholder facilitation is relevant for clinical-product collaboration.",
    ],
    weaknesses: [
      "No regulated healthcare experience is visible in the resume.",
      "Principal-level strategic ownership could be more explicit.",
    ],
    missingSkills: ["Healthcare domain", "Regulated workflow compliance"],
    suggestedImprovements: [
      "Add any healthcare, compliance, privacy, or regulated workflow exposure if accurate.",
      "Include a strategic leadership bullet with executive-level decision impact.",
      "Use portfolio examples that show complex workflow simplification.",
    ],
    status: "saved",
    nextStep: "Decide whether domain gap is worth bridging before applying",
    notes: "Potential stretch role; needs a domain-specific cover letter.",
  },
  {
    company: "HelioDesk",
    title: "Staff Product Designer, Support Automation",
    location: "Remote, US",
    description:
      "HelioDesk is looking for a Staff Product Designer for support automation. Requirements include SaaS, AI, customer discovery, design systems, accessibility, analytics, stakeholder leadership, and experience improving operational workflows.",
    matchScore: 91,
    summary:
      "This is the strongest demo match: the resume aligns with SaaS, AI workflows, systems thinking, analytics, and operational workflow design.",
    strengths: [
      "AI workflow tooling is a direct match for support automation.",
      "Design systems and accessibility support staff-level platform work.",
      "Analytics and activation impact create credible business outcomes.",
    ],
    weaknesses: [
      "Support operations language should be added to the resume summary.",
      "The resume could include one example of internal tooling or service workflows.",
    ],
    missingSkills: ["Support automation"],
    suggestedImprovements: [
      "Add support automation language to the summary if it matches prior work.",
      "Lead the cover letter with workflow simplification and measurable adoption.",
      "Use the AI workflow case study as the primary portfolio artifact.",
    ],
    status: "offer",
    nextStep: "Compare compensation and remote expectations",
    notes: "Best portfolio example because it demonstrates the full saved-to-offer pipeline.",
  },
];

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "alex.rivera@jobmatch.ai" },
    update: {
      name: "Alex Rivera",
      headline: "AI product design lead for B2B SaaS workflows",
      location: "Remote, US",
      targetRole: "Product Design Lead",
      bio: "I build systems, research workflows, and launch polished product experiences for B2B teams.",
    },
    create: {
      name: "Alex Rivera",
      email: "alex.rivera@jobmatch.ai",
      headline: "AI product design lead for B2B SaaS workflows",
      location: "Remote, US",
      targetRole: "Product Design Lead",
      bio: "I build systems, research workflows, and launch polished product experiences for B2B teams.",
    },
  });

  await prisma.application.deleteMany({ where: { userId: user.id } });
  await prisma.coverLetter.deleteMany({ where: { userId: user.id } });
  await prisma.jobAnalysis.deleteMany({ where: { userId: user.id } });
  await prisma.jobPost.deleteMany({ where: { userId: user.id } });
  await prisma.resume.deleteMany({ where: { userId: user.id } });

  const primaryResume = await prisma.resume.create({
    data: {
      userId: user.id,
      title: "AI product leadership resume",
      isActive: true,
      content: resumeContent.primary,
    },
  });

  await prisma.resume.create({
    data: {
      userId: user.id,
      title: "Growth product strategy resume",
      isActive: false,
      content: resumeContent.growth,
    },
  });

  for (const item of analyses) {
    const jobPost = await prisma.jobPost.create({
      data: {
        userId: user.id,
        company: item.company,
        title: item.title,
        location: item.location,
        description: item.description,
      },
    });

    const analysis = await prisma.jobAnalysis.create({
      data: {
        userId: user.id,
        resumeId: primaryResume.id,
        jobPostId: jobPost.id,
        matchScore: item.matchScore,
        summary: item.summary,
        strengths: item.strengths,
        weaknesses: item.weaknesses,
        missingSkills: item.missingSkills,
        suggestedImprovements: item.suggestedImprovements,
      },
    });

    await prisma.coverLetter.create({
      data: {
        userId: user.id,
        jobAnalysisId: analysis.id,
        content: `Dear ${item.company} hiring team,\n\nI am excited to apply for the ${item.title} role. My background combines SaaS product strategy, AI workflow discovery, research, analytics, and design systems with a practical record of turning complex workflows into clear product experiences.\n\nWhat stands out about this opportunity is the chance to connect user insight, operational quality, and measurable business impact. I would welcome the chance to discuss how my experience can help ${item.company} move faster while maintaining a high bar for product quality.\n\nBest,\n${user.name}`,
      },
    });

    await prisma.application.create({
      data: {
        userId: user.id,
        jobPostId: jobPost.id,
        jobAnalysisId: analysis.id,
        status: item.status,
        nextStep: item.nextStep,
        notes: item.notes,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
