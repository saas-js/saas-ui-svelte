<script lang="ts">
import { tv } from "tailwind-variants";
import type { HTMLAttributes } from "svelte/elements";

const em = tv({
	base: "italic antialiased",
});

interface Props extends Omit<HTMLAttributes<HTMLElement>, "class"> {
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
}

let { class: className, children, ...rest }: Props = $props();
</script>

<em class={em({ class: className })} {...rest}>
	{@render children?.()}
</em>
