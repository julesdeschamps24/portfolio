import { useMemo } from "react";
import { competences, categoryOrder } from "@/lib/data";

interface CompetenceCategory {
  category: string;
  skills: string[];
}

interface OrganizedCompetences {
  categories: Record<string, string[]>;
  sortedCategories: CompetenceCategory[];
}

/**
 * Hook pour organiser les compétences par catégorie
 */
export function useCompetences(): OrganizedCompetences {
  return useMemo(() => {
    // Grouper les compétences par catégorie
    const categories = competences.reduce(
      (acc, competence) => {
        competence.categories.forEach((category) => {
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(competence.name);
        });
        return acc;
      },
      {} as Record<string, string[]>,
    );

    // Trier les catégories selon l'ordre défini
    const sortedCategories = Object.entries(categories)
      .map(([category, skills]) => ({ category, skills }))
      .sort((a, b) => {
        const indexA = categoryOrder.indexOf(
          a.category as (typeof categoryOrder)[number],
        );
        const indexB = categoryOrder.indexOf(
          b.category as (typeof categoryOrder)[number],
        );

        // Si la catégorie n'est pas dans l'ordre, la mettre à la fin
        if (indexA === -1 && indexB === -1) return 0;
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
      });

    return { categories, sortedCategories };
  }, []);
}

