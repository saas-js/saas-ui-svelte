<script lang="ts">
import { getContext, type Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { twMerge } from "tailwind-merge";
import { Text } from "$saas/typography/text";
import { persona, PERSONA_CTX, type PersonaContext } from "./persona.svelte";

interface Props extends HTMLAttributes<HTMLSpanElement> {
	/**
	 * Additional CSS classes.
	 */
	class?: string;
	/**
	 * The label content.
	 */
	children: Snippet;
}

let { class: className, children, ...restProps }: Props = $props();

const personaContext = getContext<PersonaContext>(PERSONA_CTX);
const size = $derived(personaContext?.size ?? "md");

const styles = $derived(persona({ size }));
</script>

<Text as="span" class={twMerge(styles.tertiaryLabel(), className as string)} {...restProps}>
	{@render children()}
</Text>
