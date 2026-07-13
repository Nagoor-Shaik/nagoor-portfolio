export type ProjectSlug = "we-play" | "flexity" | "credit-card" | "smartwatch";

export type ProjectMeta = {
  slug: ProjectSlug;
  number: string;
  title: string;
  category: string;
  year: string;
};

export const projects: ProjectMeta[] = [
  {
    slug: "we-play",
    number: "01",
    title: "We Play",
    category: "Interaction Design · UX Research · Motion",
    year: "2024",
  },
  {
    slug: "flexity",
    number: "02",
    title: "Flexity",
    category: "Motion Design · Prototyping",
    year: "2024",
  },
  {
    slug: "credit-card",
    number: "03",
    title: "Credit Card Animation",
    category: "Microinteraction · Motion Design",
    year: "2021",
  },
  {
    slug: "smartwatch",
    number: "04",
    title: "SmartWatch OS Redesign",
    category: "Wearable UX · UI Design",
    year: "2020",
  },
];
