export { default as Clipboard } from "./clipboard.svelte";
export { default as ClipboardButton } from "./clipboard-button.svelte";
export { default as ClipboardIconButton } from "./clipboard-icon-button.svelte";
export { default as ClipboardInput } from "./clipboard-input.svelte";

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
