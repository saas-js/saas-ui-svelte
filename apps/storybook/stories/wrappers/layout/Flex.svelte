<script lang="ts">
	import { Flex } from "$saas/layout/flex";
	import { DecorativeBox } from "$saas/layout/stack";

	interface Props {
		story: "basic" | "direction" | "justify";
		args?: any;
	}

	let { story, args = {} }: Props = $props();
</script>

{#if story === "basic"}
	<Flex {...args}>
		<DecorativeBox class="flex-1 h-10" />
		<DecorativeBox class="flex-1 h-10" />
		<DecorativeBox class="flex-1 h-10" />
	</Flex>
{:else if story === "direction"}
	<Flex gap={4} direction="column">
		<DecorativeBox class="h-10" />
		<DecorativeBox class="h-10" />
		<DecorativeBox class="h-10" />
	</Flex>
{:else if story === "justify"}
	<Flex direction="column" gap={4}>
		<Flex justify="start">
			<DecorativeBox class="w-32 h-10" />
			<DecorativeBox class="w-32 h-10">flex-start</DecorativeBox>
			<DecorativeBox class="w-32 h-10" />
		</Flex>

		<Flex justify="center">
			<DecorativeBox class="w-32 h-10" />
			<DecorativeBox class="w-32 h-10">center</DecorativeBox>
			<DecorativeBox class="w-32 h-10" />
		</Flex>

		<Flex justify="end">
			<DecorativeBox class="w-32 h-10" />
			<DecorativeBox class="w-32 h-10">flex-end</DecorativeBox>
			<DecorativeBox class="w-32 h-10" />
		</Flex>

		<Flex justify="between">
			<DecorativeBox class="w-32 h-10" />
			<DecorativeBox class="w-32 h-10">space-between</DecorativeBox>
			<DecorativeBox class="w-32 h-10" />
		</Flex>
	</Flex>
{/if}
