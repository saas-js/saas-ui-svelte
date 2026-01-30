<script lang="ts">
import { getContext, type Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { Avatar, type AvatarVariants } from "$saas/components/avatar";
import type { ColourName } from "$saas/utils/colours";
import { persona, PERSONA_CTX, type PersonaContext } from "./persona.svelte";

interface Props extends HTMLAttributes<HTMLDivElement> {
	/**
	 * The image source of the avatar.
	 */
	src?: string;
	/**
	 * The name of the person in the avatar. Used for the alt text and fallback initials.
	 */
	name?: string;
	/**
	 * The shape of the avatar.
	 * @default "full"
	 */
	shape?: AvatarVariants["shape"];
	/**
	 * The visual style of the avatar.
	 * @default "solid"
	 */
	variant?: AvatarVariants["variant"];
	/**
	 * The colour palette of the avatar.
	 * @default "gray"
	 */
	colour?: ColourName;
	/**
	 * Whether to show a ring around the avatar.
	 * @default false
	 */
	ring?: boolean;
	/**
	 * Additional CSS classes.
	 */
	class?: string;
	/**
	 * Children to render (typically PresenceBadge).
	 */
	children?: Snippet;
}

let {
	src,
	name,
	shape = "full",
	variant = "solid",
	colour = "gray",
	ring = false,
	class: className,
	children,
	...restProps
}: Props = $props();

const personaContext = getContext<PersonaContext>(PERSONA_CTX);
const size = $derived(personaContext?.size ?? "md");

const styles = $derived(persona({ size }));
</script>

<div class={styles.avatar({ class: className })} {...restProps}>
	<Avatar
		src={src}
		name={name}
		size={size}
		shape={shape}
		variant={variant}
		colour={colour}
		ring={ring}
	/>
	{@render children?.()}
</div>
