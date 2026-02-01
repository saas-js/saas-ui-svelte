<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { setContext, type Snippet } from "svelte";
	import { writable } from "svelte/store";
	import { twMerge } from "tailwind-merge";
	import { Stack } from "$saas/layout/stack";
	import { FIELD_CTX, type FieldContextValue } from "./types";

	let idCounter = 0;
	function generateId() {
		return `field-${++idCounter}`;
	}

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
		id,
		class: className,
		children,
	}: Props = $props();

	// Auto-generate ID if not provided
	const generatedId = generateId();
	const fieldId = $derived(id ?? generatedId);

	// Create context for child components
	const fieldContext = writable<FieldContextValue>({
		id: "",
		disabled: false,
		invalid: false,
		required: false,
		readOnly: false,
	});

	$effect(() => {
		fieldContext.set({
			id: fieldId,
			disabled,
			invalid,
			required,
			readOnly,
		});
	});

	setContext(FIELD_CTX, fieldContext);

	const baseStyles = "w-full relative antialiased";
</script>

<Stack
	role="group"
	direction="column"
	align="start"
	gap={1.5}
	class={twMerge(baseStyles, className)}
>
	{@render children?.()}
</Stack>
