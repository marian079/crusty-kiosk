import { Button } from "@/components/ui/button";
import type { Category } from "@shared/schema";
import * as LucideIcons from "lucide-react";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
}

export function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategorySelect 
}: CategoryFilterProps) {
  // Helper to get icon component from name
  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon ? <Icon className="h-5 w-5" /> : null;
  };

  return (
    <div className="border-b bg-card">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Categorii</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <Button
            size="lg"
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => onCategorySelect(null)}
            className="rounded-full px-8 py-6 text-lg font-semibold whitespace-nowrap"
            data-testid="button-category-all"
          >
            <LucideIcons.UtensilsCrossed className="h-5 w-5 mr-2" />
            Toate
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              size="lg"
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => onCategorySelect(category.id)}
              className="rounded-full px-8 py-6 text-lg font-semibold whitespace-nowrap"
              data-testid={`button-category-${category.id}`}
            >
              <span className="mr-2">{getIcon(category.icon)}</span>
              {category.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
