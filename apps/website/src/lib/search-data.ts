import { getDocsNavigation } from "./docs-navigation";

export interface SearchItem {
    label: string;
    value: string;
    href: string;
    category: SearchCategory;
    description?: string;
    keywords?: string[];
}

export type SearchCategory =
    | "getting-started"
    | "components"
    | "layout"
    | "typography"
    | "utilities";

export interface SearchGroup {
    label: string;
    category: SearchCategory;
    items: SearchItem[];
}

const categoryLabels: Record<SearchCategory, string> = {
    "getting-started": "Getting Started",
    components: "Components",
    layout: "Layout",
    typography: "Typography",
    utilities: "Utilities",
};

function mapTitleToCategory(title: string): SearchCategory {
    const map: Record<string, SearchCategory> = {
        "Getting Started": "getting-started",
        Components: "components",
        Layout: "layout",
        Typography: "typography",
        Utilities: "utilities",
    };
    return map[title] || "components";
}

function buildComponentSearchItems(): SearchItem[] {
    const nav = getDocsNavigation();
    const items: SearchItem[] = [];

    for (const group of nav) {
        const category = mapTitleToCategory(group.title);
        for (const item of group.items) {
            if (item.href) {
                items.push({
                    label: item.label,
                    value: `${category}-${item.label.toLowerCase().replace(/\s+/g, "-")}`,
                    href: item.href,
                    category,
                });
            }
        }
    }

    return items;
}

let cachedItems: SearchItem[] | null = null;

export function getSearchItems(): SearchItem[] {
    if (cachedItems) return cachedItems;
    cachedItems = buildComponentSearchItems();
    return cachedItems;
}

export function groupSearchItems(items: SearchItem[]): SearchGroup[] {
    const groups = new Map<SearchCategory, SearchItem[]>();

    for (const item of items) {
        const existing = groups.get(item.category) || [];
        existing.push(item);
        groups.set(item.category, existing);
    }

    return Array.from(groups.entries())
        .map(([category, items]) => ({
            label: categoryLabels[category],
            category,
            items,
        }))
        .filter((group) => group.items.length > 0);
}

export function filterSearchItems(items: SearchItem[], query: string): SearchItem[] {
    const normalizedQuery = query.toLowerCase().trim();
    if (!normalizedQuery) return items.slice(0, 50); // Limit initial results

    return items.filter((item) => {
        if (item.label.toLowerCase().includes(normalizedQuery)) return true;
        if (item.description?.toLowerCase().includes(normalizedQuery)) return true;
        if (item.keywords?.some((k) => k.toLowerCase().includes(normalizedQuery))) return true;
        return false;
    });
}
