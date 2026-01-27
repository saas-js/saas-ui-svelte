import Root from "./checkbox-card-root.svelte";
import Control from "./checkbox-card-control.svelte";
import Content from "./checkbox-card-content.svelte";
import Label from "./checkbox-card-label.svelte";
import Description from "./checkbox-card-description.svelte";
import Addon from "./checkbox-card-addon.svelte";
import Indicator from "./checkbox-card-indicator.svelte";

export { checkboxCardRoot, type CheckboxCardVariants } from "./checkbox-card-root.svelte";

export const CheckboxCardRoot = Root;
export const CheckboxCardControl = Control;
export const CheckboxCardContent = Content;
export const CheckboxCardLabel = Label;
export const CheckboxCardDescription = Description;
export const CheckboxCardAddon = Addon;
export const CheckboxCardIndicator = Indicator;

export const CheckboxCard = {
    Root,
    Control,
    Content,
    Label,
    Description,
    Addon,
    Indicator,
};
