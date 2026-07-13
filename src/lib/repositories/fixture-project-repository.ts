import { demoProjects } from "@/data/demo/projects";
import type { ProjectDetail, ProjectFilters, ProjectSummary } from "@/types/project";
import type { ProjectRepository } from "./project-repository";

function matchesFilter(project: ProjectDetail, filters?: ProjectFilters) {
  if (!filters) {
    return true;
  }

  const query = filters.query?.trim().toLowerCase();
  if (query) {
    const haystack = [
      project.titleKo,
      project.titleEn,
      project.organizationKo,
      project.organizationEn,
      project.category,
      project.region,
      ...project.tags,
    ]
      .join(" ")
      .toLowerCase();

    if (!haystack.includes(query)) {
      return false;
    }
  }

  if (filters.category && filters.category !== "all" && project.category !== filters.category) {
    return false;
  }

  if (filters.region && filters.region !== "all" && project.region !== filters.region) {
    return false;
  }

  if (
    filters.partnershipType &&
    filters.partnershipType !== "all" &&
    !project.partnershipTypes.includes(filters.partnershipType)
  ) {
    return false;
  }

  return !(filters.stage && filters.stage !== "all" && project.stage !== filters.stage);
}

function sortProjects(projects: ProjectDetail[], sort: ProjectFilters["sort"]) {
  if (sort === "latest") {
    return [...projects].sort((a, b) => b.latestUpdate.localeCompare(a.latestUpdate));
  }

  if (sort === "support") {
    return [...projects].sort((a, b) => b.committedAmountKrw - a.committedAmountKrw);
  }

  return [...projects];
}

export const fixtureProjectRepository: ProjectRepository = {
  list(filters?: ProjectFilters): ProjectSummary[] {
    return sortProjects(
      demoProjects.filter((project) => matchesFilter(project, filters)),
      filters?.sort,
    );
  },
  getBySlug(slug: string): ProjectDetail | undefined {
    return demoProjects.find((project) => project.slug === slug);
  },
};
