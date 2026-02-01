<script lang="ts">
	import type { Snippet } from "svelte";
	import { getContext } from "svelte";
	import type { FormApi } from "./use-form.svelte";
	import { FORM_CTX } from "./types";

	interface Props {
		name: string;
		condition: (value: unknown) => boolean;
		children: Snippet;
		fallback?: Snippet;
	}

	let { name, condition, children, fallback }: Props = $props();
	const formContext = getContext<{ api: FormApi }>(FORM_CTX);
	const form = $derived(formContext.api);
	const show = $derived(condition(form.getValue(name)));
</script>

{#if show}{@render children()}{:else if fallback}{@render fallback()}{/if}
