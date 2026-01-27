<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { ColourName } from "$saas/utils/colours";
	import User from "phosphor-svelte/lib/User";

	export const avatar = tv({
		slots: {
			root: "align-top select-none shrink-0 justify-center items-center inline-flex relative font-medium antialiased",
			image: "border-none object-cover w-full h-full",
			fallback:
				"uppercase font-medium leading-none flex items-center justify-center w-full h-full",
		},
		variants: {
			size: {
				"2xs": {
					root: "w-4 h-4 text-[8px]",
					fallback: "text-[8px]",
				},
				xs: {
					root: "w-5 h-5 text-xs",
					fallback: "text-xs",
				},
				sm: {
					root: "w-6 h-6 text-xs",
					fallback: "text-xs",
				},
				md: {
					root: "w-9 h-9 text-lg",
					fallback: "text-lg",
				},
				lg: {
					root: "w-12 h-12 text-2xl",
					fallback: "text-2xl",
				},
				xl: {
					root: "w-16 h-16 text-3xl",
					fallback: "text-3xl",
				},
				"2xl": {
					root: "w-20 h-20 text-4xl",
					fallback: "text-4xl",
				},
				full: {
					root: "w-full h-full",
				},
			},
			variant: {
				solid: {
					root: "bg-(--c-solid) text-(--c-contrast)",
				},
				subtle: {
					root: "bg-(--c-muted) text-(--c-fg)",
				},
				outline: {
					root: "bg-transparent border border-(--c-subtle) text-(--c-fg)",
				},
			},
			shape: {
				square: {
					root: "",
					image: "",
					fallback: "",
				},
				rounded: {
					root: "rounded",
					image: "rounded",
					fallback: "rounded",
				},
				full: {
					root: "rounded-full",
					image: "rounded-full",
					fallback: "rounded-full",
				},
			},
			borderless: {
				true: {
					root: "",
				},
				false: {
					root: "border-2 border-bg-default dark:border-bg-default",
				},
			},
			ring: {
				true: {
					root: "outline-2 outline-offset-2 outline-(--c-solid)",
				},
			},
		},
		defaultVariants: {
			size: "md",
			variant: "solid",
			shape: "full",
			borderless: true,
		},
	});

	export type AvatarVariants = VariantProps<typeof avatar>;
</script>

<script lang="ts">
	import { Avatar as ArkAvatar } from "@ark-ui/svelte/avatar";
	import type { AvatarRootProps } from "@ark-ui/svelte/avatar";
	import { getContext, type Snippet } from "svelte";
	import { getColourStyle } from "$saas/utils/colours";
	import {
		AVATAR_GROUP_CTX,
		type AvatarGroupContext,
	} from "./avatar-group.svelte";

	interface Props extends Omit<AvatarRootProps, "class" | "style"> {
		/**
		 * The image source of the avatar.
		 */
		src?: string;
		/**
		 * The name of the person in the avatar. Used for the alt text and fallback initials.
		 */
		name?: string;
		/**
		 * The size of the avatar.
		 * @default "md"
		 */
		size?: AvatarVariants["size"];
		/**
		 * The visual style of the avatar.
		 * @default "solid"
		 */
		variant?: AvatarVariants["variant"];
		/**
		 * The shape of the avatar.
		 * @default "full"
		 */
		shape?: AvatarVariants["shape"];
		/**
		 * The colour palette of the avatar.
		 * @default "gray"
		 */
		colour?: ColourName;
		/**
		 * Whether to show a ring around the avatar using the colour palette.
		 * @default false
		 */
		ring?: boolean;
		/**
		 * Custom fallback content. Can be a string (like "+3") or a Snippet.
		 */
		fallback?: string | Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * Inline styles to apply via the style attribute.
		 */
		style?: string;
		/**
		 * Any children to render (rarely used directly, usually fallback).
		 */
		children?: Snippet;
	}

	let {
		src,
		name,
		size: propSize,
		variant: propVariant,
		shape = "full",
		colour = "gray",
		ring = false,
		fallback,
		onStatusChange,
		class: className,
		style,
		children,
		...restProps
	}: Props = $props();

	// Get context from AvatarGroup if available
	const groupContext = getContext<AvatarGroupContext>(AVATAR_GROUP_CTX);

	const size = $derived(groupContext?.size ?? propSize ?? "md");
	const variant = $derived(propVariant ?? "solid");
	const borderless = $derived(groupContext?.borderless ?? true);

	const initials = $derived(
		name
			?.split(" ")
			.map((part) => part[0])
			.slice(0, 2)
			.join("")
			.toUpperCase(),
	);

	const colourStyle = $derived(getColourStyle(colour));
	const finalStyle = $derived(
		[colourStyle, style].filter(Boolean).join("; "),
	);

	const {
		root,
		image,
		fallback: fallbackClass,
	} = $derived(
		avatar({
			size,
			variant,
			shape,
			borderless,
			ring,
		}),
	);
</script>

<ArkAvatar.Root
	class={root({ class: className })}
	style={finalStyle}
	{onStatusChange}
	{...restProps}
>
	<ArkAvatar.Fallback class={fallbackClass()}>
		{#if typeof fallback === "string"}
			{fallback}
		{:else if fallback}
			{@render fallback()}
		{:else if initials}
			{initials}
		{:else if children}
			{@render children()}
		{:else}
			<User
				class="w-[70%]! h-[70%]!"
				weight="regular"
				aria-hidden="true"
			/>
		{/if}
	</ArkAvatar.Fallback>
	{#if src}
		<ArkAvatar.Image {src} alt={name || "Avatar"} class={image()} />
	{/if}
</ArkAvatar.Root>
