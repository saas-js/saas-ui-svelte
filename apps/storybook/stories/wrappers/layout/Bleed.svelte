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
	<div class="p-8 rounded-sm border border-border-default">
		<Bleed {...args}>
			<DecorativeBox class="h-16">Bleed</DecorativeBox>
		</Bleed>
	</div>
{:else if story === "direction"}
	<Stack gap={4}>
		<div class="p-8 rounded-sm border border-border-default">
			<Bleed inlineStart={8}>
				<DecorativeBox class="h-8">inlineStart</DecorativeBox>
			</Bleed>
		</div>

		<div class="p-8 rounded-sm border border-border-default">
			<Bleed inlineEnd={8}>
				<DecorativeBox class="h-8">inlineEnd</DecorativeBox>
			</Bleed>
		</div>

		<div class="p-8 rounded-sm border border-border-default">
			<Bleed blockStart={8}>
				<DecorativeBox class="h-8">blockStart</DecorativeBox>
			</Bleed>
		</div>

		<div class="p-8 rounded-sm border border-border-default">
			<Bleed blockEnd={8}>
				<DecorativeBox class="h-8">blockEnd</DecorativeBox>
			</Bleed>
		</div>
	</Stack>
{/if}
