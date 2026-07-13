import type { ProjectDetail, ProjectFilters, ProjectSummary } from "@/types/project";

export type ProjectRepository = {
  list(filters?: ProjectFilters): ProjectSummary[];
  getBySlug(slug: string): ProjectDetail | undefined;
};
