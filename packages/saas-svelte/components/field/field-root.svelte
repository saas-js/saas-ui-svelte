<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { setContext, type Snippet } from "svelte";
	import { writable } from "svelte/store";
	import { FIELD_CTX, type FieldContextValue } from "./types";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/**
		 * Whether the field is disabled.
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the field is invalid.
		 * @default false
		 */
		invalid?: boolean;
		/**
		 * Whether the field is required.
		 * @default false
		 */
		required?: boolean;
		/**
		 * Whether the field is read-only.
		 * @default false
		 */
		readOnly?: boolean;
		/**
		 * The ID for the field. Auto-generated if not provided.
		 */
		id?: string;
		/**
		 * Additional CSS classes to apply to the field container.
		 */
		class?: string;
		/**
		 * The field content (label, input, helper text, etc.).
		 */
		children?: Snippet;
	}

	let {
		disabled = false,
		invalid = false,
		required = false,
		readOnly = false,
		id = `field-${Math.random().toString(36).substring(2, 9)}`,
		class: className,
		children,
		...restProps
	}: Props = $props();

	// Create context for child components
	const fieldContext = writable<FieldContextValue>({
		id: "",
		disabled: false,
		invalid: false,
		required: false,
		readOnly: false,
	});

	$effect(() => {
		fieldContext.set({ id, disabled, invalid, required, readOnly });
	});

	setContext(FIELD_CTX, fieldContext);
</script>

<div
	role="group"
	class={[
		"flex",
		"flex-col",
		"items-start",
		"gap-y-1.5",
		"gap-x-1.5",
		"w-full",
		"relative",
		"antialiased",
		className,
	]
		.filter(Boolean)
		.join(" ")}
	{...restProps}
>
	{@render children?.()}
</div>
