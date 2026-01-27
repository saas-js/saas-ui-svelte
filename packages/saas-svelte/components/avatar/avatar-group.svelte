<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLAttributes } from "svelte/elements";
	import type { AvatarVariants } from "./avatar.svelte";

	export const AVATAR_GROUP_CTX = Symbol("AVATAR_GROUP_CTX");

	export interface AvatarGroupContext {
		size?: AvatarVariants["size"];
		borderless?: boolean;
	}
</script>

<script lang="ts">
	import { setContext, type Snippet } from "svelte";

	const avatarGroup = tv({
		base: "flex items-center justify-start",
		variants: {
			size: {
				"2xs": "-space-x-1",
				xs: "-space-x-1.5",
				sm: "-space-x-2",
				md: "-space-x-2",
				lg: "-space-x-3",
				xl: "-space-x-3",
				"2xl": "-space-x-4",
				full: "-space-x-4",
			},
			spaceX: {
				"1": "space-x-1",
				"2": "space-x-2",
				"3": "space-x-3",
				"4": "space-x-4",
			},
			stacking: {
				"first-on-top": "flex-row-reverse space-x-reverse justify-end",
				"last-on-top": "",
			},
		},
		defaultVariants: {
			size: "md",
			stacking: "last-on-top",
		},
	});

	type GroupVariants = VariantProps<typeof avatarGroup>;

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/**
		 * The size of the avatars in the group.
		 * @default "md"
		 */
		size?: AvatarVariants["size"];
		/**
		 * The stacking order of the avatars.
		 * @default "last-on-top"
		 */
		stacking?: GroupVariants["stacking"];
		/**
		 * The spacing between avatars.
		 */
		spaceX?: GroupVariants["spaceX"];
		/**
		 * Whether the avatars should have a border.
		 * @default false
		 */
		borderless?: boolean;
		/**
		 * Additional CSS classes.
		 */
		class?: string;
		/**
		 * Inline styles.
		 */
		style?: string;
		/**
		 * The avatars to render in the group.
		 */
		children: Snippet;
	}

	let {
		size = "md",
		stacking = "last-on-top",
		spaceX,
		borderless = false,
		class: className,
		style,
		children,
		...restProps
	}: Props = $props();

	setContext<AvatarGroupContext>(AVATAR_GROUP_CTX, {
		get size() {
			return size;
		},
		get borderless() {
			return borderless;
		},
	});

	const finalClass = $derived(
		avatarGroup({ size, stacking, spaceX, class: className }),
	);
</script>

<div class={finalClass} {style} {...restProps}>
	{@render children()}
</div>
