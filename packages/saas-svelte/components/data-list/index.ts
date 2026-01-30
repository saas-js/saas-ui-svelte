import Root from "./data-list-root.svelte";
import Item from "./data-list-item.svelte";
import ItemLabel from "./data-list-item-label.svelte";
import ItemValue from "./data-list-item-value.svelte";

export {
	DATA_LIST_CTX,
	dataList,
	type DataListVariants,
	type DataListContext,
} from "./data-list-root.svelte";

export const DataListRoot = Root;
export const DataListItem = Item;
export const DataListItemLabel = ItemLabel;
export const DataListItemValue = ItemValue;

export const DataList = {
	Root,
	Item,
	ItemLabel,
	ItemValue,
};
