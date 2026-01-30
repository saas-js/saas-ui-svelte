import Root from "./menu-root.svelte";
import Button from "./menu-button.svelte";
import Content from "./menu-content.svelte";
import Item from "./menu-item.svelte";
import ItemLink from "./menu-item-link.svelte";
import ItemCommand from "./menu-item-command.svelte";
import ItemGroup from "./menu-item-group.svelte";
import Separator from "./menu-separator.svelte";
import TriggerItem from "./menu-trigger-item.svelte";
import ContextTrigger from "./menu-context-trigger.svelte";
import CheckboxItem from "./menu-checkbox-item.svelte";
import RadioItemGroup from "./menu-radio-item-group.svelte";
import RadioItem from "./menu-radio-item.svelte";
import ItemIndicator from "./menu-item-indicator.svelte";

export { menu, type MenuVariants } from "./menu-root.svelte";

export const MenuRoot = Root;
export const MenuButton = Button;
export const MenuContent = Content;
export const MenuItem = Item;
export const MenuItemLink = ItemLink;
export const MenuItemCommand = ItemCommand;
export const MenuItemGroup = ItemGroup;
export const MenuSeparator = Separator;
export const MenuTriggerItem = TriggerItem;
export const MenuContextTrigger = ContextTrigger;
export const MenuCheckboxItem = CheckboxItem;
export const MenuRadioItemGroup = RadioItemGroup;
export const MenuRadioItem = RadioItem;
export const MenuItemIndicator = ItemIndicator;

export const Menu = {
	Root,
	Button,
	Content,
	Item,
	ItemLink,
	ItemCommand,
	ItemGroup,
	Separator,
	TriggerItem,
	ContextTrigger,
	CheckboxItem,
	RadioItemGroup,
	RadioItem,
	ItemIndicator,
};
