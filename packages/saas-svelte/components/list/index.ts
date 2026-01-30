import ListRoot from "./list-root.svelte";
import ListItem from "./list-item.svelte";
import ListIndicator from "./list-indicator.svelte";

export const List = {
	Root: ListRoot,
	Item: ListItem,
	Indicator: ListIndicator,
};

export { ListRoot, ListItem, ListIndicator };
export {
	LIST_CTX,
	listRoot,
	type ListRootVariants,
	type ListContext,
} from "./list-root.svelte";
export { listItem, type ListItemVariants } from "./list-item.svelte";
export {
	listIndicator,
	type ListIndicatorVariants,
} from "./list-indicator.svelte";
