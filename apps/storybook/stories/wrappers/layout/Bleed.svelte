<script lang="ts">
	import { Bleed } from "$saas/layout/bleed";
	import { DecorativeBox, Stack } from "$saas/layout/stack";

	interface Props {
		story: "basic" | "direction";
		args?: any;
	}

	let { story, args = {} }: Props = $props();
</script>

{#if story === "basic"}
	<div class="border-border-default rounded-sm border p-8">
		<Bleed {...args}>
			<DecorativeBox class="h-16">Bleed</DecorativeBox>
		</Bleed>
	</div>
{:else if story === "direction"}
	<Stack gap={4}>
		<div class="border-border-default rounded-sm border p-8">
			<Bleed inlineStart={8}>
				<DecorativeBox class="h-8">inlineStart</DecorativeBox>
			</Bleed>
		</div>

		<div class="border-border-default rounded-sm border p-8">
			<Bleed inlineEnd={8}>
				<DecorativeBox class="h-8">inlineEnd</DecorativeBox>
			</Bleed>
		</div>

		<div class="border-border-default rounded-sm border p-8">
			<Bleed blockStart={8}>
				<DecorativeBox class="h-8">blockStart</DecorativeBox>
			</Bleed>
		</div>

		<div class="border-border-default rounded-sm border p-8">
			<Bleed blockEnd={8}>
				<DecorativeBox class="h-8">blockEnd</DecorativeBox>
			</Bleed>
		</div>
	</Stack>
{/if}
