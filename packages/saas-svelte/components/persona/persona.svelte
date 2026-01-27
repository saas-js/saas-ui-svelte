<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export const persona = tv({
		slots: {
			root: "inline-flex items-center gap-2",
			avatar: "relative shrink-0",
			details: "flex flex-col justify-center min-w-0",
			label: "font-medium truncate",
			secondaryLabel: "text-fg-muted truncate",
			tertiaryLabel: "text-fg-muted truncate",
		},
		variants: {
			size: {
				"2xs": {
					root: "gap-1.5",
					label: "text-xs",
					secondaryLabel: "text-xs",
					tertiaryLabel: "text-xs",
				},
				xs: {
					root: "gap-1.5",
					label: "text-xs",
					secondaryLabel: "text-xs",
					tertiaryLabel: "text-xs",
				},
				sm: {
					root: "gap-2",
					label: "text-sm",
					secondaryLabel: "text-xs",
					tertiaryLabel: "text-xs",
				},
				md: {
					root: "gap-2",
					label: "text-sm",
					secondaryLabel: "text-sm",
					tertiaryLabel: "text-sm",
				},
				lg: {
					root: "gap-3",
					label: "text-base",
					secondaryLabel: "text-sm",
					tertiaryLabel: "text-sm",
				},
				xl: {
					root: "gap-3",
					label: "text-lg",
					secondaryLabel: "text-base",
					tertiaryLabel: "text-base",
				},
				"2xl": {
					root: "gap-4",
					label: "text-xl",
					secondaryLabel: "text-lg",
					tertiaryLabel: "text-lg",
				},
			},
		},
		defaultVariants: {
			size: "md",
		},
	});

	export type PersonaVariants = VariantProps<typeof persona>;
	export type PersonaPresence = "online" | "busy" | "dnd" | "away" | "offline";

	export const PERSONA_CTX = Symbol("PERSONA_CTX");

	export interface PersonaContext {
		size?: PersonaVariants["size"];
		variant?: "badge" | "ring";
		presence?: PersonaPresence;
		outOfOffice?: boolean;
	}
</script>

<script lang="ts">
	import { setContext, type Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/**
		 * The size of the persona component.
		 * @default "md"
		 */
		size?: PersonaVariants["size"];
		/**
		 * The variant of the presence indicator.
		 * @default "badge"
		 */
		variant?: "badge" | "ring";
		/**
		 * The presence status.
		 */
		presence?: PersonaPresence;
		/**
		 * Whether the person is out of office.
		 * @default false
		 */
		outOfOffice?: boolean;
		/**
		 * Additional CSS classes.
		 */
		class?: string;
		/**
		 * The children to render.
		 */
		children: Snippet;
	}

	let {
		size = "md",
		variant = "badge",
		presence,
		outOfOffice = false,
		class: className,
		children,
		...restProps
	}: Props = $props();

	setContext<PersonaContext>(PERSONA_CTX, {
		get size() {
			return size;
		},
		get variant() {
			return variant;
		},
		get presence() {
			return presence;
		},
		get outOfOffice() {
			return outOfOffice;
		},
	});

	const styles = $derived(persona({ size }));
</script>

<div
	class={styles.root({ class: className })}
	data-out-of-office={outOfOffice || undefined}
	data-presence={presence || undefined}
	{...restProps}
>
	{@render children()}
</div>
