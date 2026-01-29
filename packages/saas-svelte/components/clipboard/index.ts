import { Clipboard as ArkClipboard } from "@ark-ui/svelte/clipboard";
import Trigger from "./clipboard-trigger.svelte";

export { default as ClipboardComponent } from "./clipboard.svelte";
export { default as ClipboardButton } from "./clipboard-button.svelte";
export { default as ClipboardIconButton } from "./clipboard-icon-button.svelte";
export { default as ClipboardInput } from "./clipboard-input.svelte";
export { default as ClipboardTrigger } from "./clipboard-trigger.svelte";

export { clipboardButton, clipboardInput } from "./clipboard.svelte";

// Re-export Ark UI primitives for advanced usage
export {
    Clipboard as ClipboardPrimitive,
    type ClipboardRootProps,
    type ClipboardControlProps,
    type ClipboardIndicatorProps,
    type ClipboardInputProps,
    type ClipboardLabelProps,
    type ClipboardTriggerProps,
} from "@ark-ui/svelte/clipboard";

// Compound component pattern (like Tabs and Card)
export const Clipboard = {
    Root: ArkClipboard.Root,
    Trigger,
    Indicator: ArkClipboard.Indicator,
    Input: ArkClipboard.Input,
    Label: ArkClipboard.Label,
    Control: ArkClipboard.Control,
};
