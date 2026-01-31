<script module lang="ts">
import { tv } from "tailwind-variants";

export const clipboardButton = tv({
	base: [
		"appearance-none",
		"select-none",
		"whitespace-nowrap",
		"align-middle",
		"cursor-pointer",
		"isolate",
		"antialiased",
		"text-fg-default",
		"shadow-sm",
		"outline-0",
		"shrink-0",
		"justify-center",
		"items-center",
		"font-medium",
		"inline-flex",
		"relative",
		"rounded",
		"border",
		"bg-bg-subtle/20",
		"border-border-default/90",
		"focus-visible:outline-offset-2",
		"focus-visible:outline-1",
		"focus-visible:outline-solid",
		"focus-visible:outline-fg-muted",
		"disabled:opacity-50",
		"disabled:cursor-not-allowed",
		"hover:bg-bg-subtle",
		"hover:border-border-default",
	],
	variants: {
		size: {
			xs: "min-w-6 h-6 gap-1 text-xs leading-4 px-2",
			sm: "min-w-7 h-7 gap-2 text-sm leading-5 px-2.5",
			md: "min-w-8 h-8 gap-2 text-sm leading-5 px-3",
		},
		icon: {
			true: "px-0",
		},
		variant: {
			surface: "",
			ghost: "shadow-none border-transparent bg-transparent hover:bg-bg-muted hover:border-transparent",
		},
	},
	compoundVariants: [
		{ size: "xs", icon: true, class: "w-6" },
		{ size: "sm", icon: true, class: "w-7" },
		{ size: "md", icon: true, class: "w-8" },
	],
	defaultVariants: {
		size: "xs",
		icon: false,
		variant: "surface",
	},
});

export const clipboardInput = tv({
	base: [
		"appearance-none",
		"outline-0",
		"w-full",
		"min-w-8",
		"h-8",
		"text-sm",
		"leading-5",
		"relative",
		"pl-3",
		"rounded",
		"border",
		"antialiased",
		"border-border-default",
		"disabled:opacity-50",
		"disabled:cursor-not-allowed",
		"focus-visible:outline-solid",
		"focus-visible:outline-fg-muted",
		"focus-visible:border-fg-muted",
		"hover:border-border-emphasized",
		"hover:focus-visible:border-fg-muted",
		"pr-8",
	],
});
</script>

<script lang="ts">
import { Clipboard as ArkClipboard } from "@ark-ui/svelte/clipboard";
import type { ClipboardRootProps } from "@ark-ui/svelte/clipboard";
import type { Snippet } from "svelte";
import CheckIcon from "phosphor-svelte/lib/CheckIcon";
import CopySimpleIcon from "phosphor-svelte/lib/CopySimpleIcon";

interface Props extends Omit<ClipboardRootProps, "id"> {
	/**
	 * The unique identifier for the clipboard.
	 * If not provided, a unique ID will be auto-generated.
	 */
	id?: string;
	/**
	 * The value to be copied to the clipboard.
	 */
	value: string;
	/**
	 * The timeout for showing the "copied" state (in ms).
	 * @default 3000
	 */
	timeout?: number;
	/**
	 * Custom trigger content. If not provided, shows an icon button.
	 */
	children?: Snippet;
	/**
	 * Additional CSS classes to apply to the root.
	 */
	class?: string;
}

let {
	id,
	value,
	timeout = 3000,
	children,
	class: className,
	...rest
}: Props = $props();

</script>

<ArkClipboard.Root
	id={id}
	value={value}
	timeout={timeout}
	class={className}
	{...rest}
>
	{#if children}
		{@render children()}
	{:else}
		<ArkClipboard.Trigger
			class={clipboardButton({ icon: true, size: "xs" })}
			aria-label="Copy to clipboard"
		>
			<ArkClipboard.Indicator>
				<CopySimpleIcon
					class="inline-block size-3.5 shrink-0 text-current"
					weight="regular"
				/>
				{#snippet copied()}
					<CheckIcon
						class="inline-block size-3.5 shrink-0 text-current"
						weight="regular"
					/>
				{/snippet}
			</ArkClipboard.Indicator>
		</ArkClipboard.Trigger>
	{/if}
</ArkClipboard.Root>
