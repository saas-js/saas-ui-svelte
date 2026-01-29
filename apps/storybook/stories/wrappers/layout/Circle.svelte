<script lang="ts">
	import { Circle } from "$saas/layout/circle";

	interface Props {
		story: "basic";
		args?: any;
	}

	let { story, args = {} }: Props = $props();
</script>

{#if story === "basic"}
	<Circle {...args}>1</Circle>
{/if}
