<script lang="ts">
import type { Snippet } from "svelte";
import { getContext } from "svelte";
import { Button, type ButtonVariants } from "../button";
import type { ColourName } from "$saas/utils/colours";
import type { FormApi } from "./use-form.svelte";
import { FORM_CTX } from "./types";

interface Props {
	children: Snippet;
	variant?: ButtonVariants["variant"];
	size?: ButtonVariants["size"];
	colour?: ColourName;
	disableIfUntouched?: boolean;
	disableIfInvalid?: boolean;
	loadingText?: string;
	class?: string;
}

let {
	children,
	variant = "solid",
	size = "md",
	colour = "indigo",
	disableIfUntouched = false,
	disableIfInvalid = false,
	loadingText = "",
	class: className,
}: Props = $props();

const form = getContext<FormApi>(FORM_CTX);
const disabled = $derived(
	(disableIfUntouched && !form.isDirty) ||
		(disableIfInvalid && !form.isValid),
);
</script>

<Button
	type="submit"
	variant={variant}
	size={size}
	colour={colour}
	loading={form.isSubmitting}
	loadingText={loadingText}
	disabled={disabled}
	class={className}
>
	{@render children()}
</Button>
