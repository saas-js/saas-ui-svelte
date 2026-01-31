<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { Group } from "$saas/layout/group";

let {
	class: className,
	children,
	...rest
}: HTMLAttributes<HTMLDivElement> = $props();
</script>

<Group
	role="group"
	attached={true}
	class={className}
	{...rest}
>
	{@render children?.()}
</Group>
