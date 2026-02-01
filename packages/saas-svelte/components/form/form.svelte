<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLFormAttributes } from "svelte/elements";
	import { setContext } from "svelte";
	import type { FormApi } from "./use-form.svelte";
	import { FORM_CTX } from "./types";

	interface Props extends Omit<HTMLFormAttributes, "onsubmit"> {
		form: FormApi;
		children: Snippet;
		class?: string;
	}

	let { form, children, class: className, ...restProps }: Props = $props();

	// Note: setContext must be called synchronously. The form object reference
	// is stable - its internal methods access reactive state.
	setContext(FORM_CTX, {
		get api() {
			return form;
		},
	});
</script>

<form class={className} onsubmit={form.handleSubmit} novalidate {...restProps}>
	{@render children()}
</form>
