<script lang="ts">
import { getContext, type Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { twMerge } from "tailwind-merge";
import { VStack } from "$saas/layout/stack";
import { persona, PERSONA_CTX, type PersonaContext } from "./persona.svelte";

interface Props extends HTMLAttributes<HTMLDivElement> {
	/**
	 * Additional CSS classes.
	 */
	class?: string;
	/**
	 * The labels to render.
	 */
	children: Snippet;
}

let { class: className, children, ...restProps }: Props = $props();

const personaContext = getContext<PersonaContext>(PERSONA_CTX);
const size = $derived(personaContext?.size ?? "md");

const styles = $derived(persona({ size }));
</script>

<VStack gap={0} justify="center" class={twMerge(styles.details(), className as string)} {...restProps}>
	{@render children()}
</VStack>
