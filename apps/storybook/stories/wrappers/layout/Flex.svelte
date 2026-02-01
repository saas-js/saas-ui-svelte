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
		<DecorativeBox class="h-10 flex-1" />
		<DecorativeBox class="h-10 flex-1" />
		<DecorativeBox class="h-10 flex-1" />
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
			<DecorativeBox class="h-10 w-32" />
			<DecorativeBox class="h-10 w-32">flex-start</DecorativeBox>
			<DecorativeBox class="h-10 w-32" />
		</Flex>

		<Flex justify="center">
			<DecorativeBox class="h-10 w-32" />
			<DecorativeBox class="h-10 w-32">center</DecorativeBox>
			<DecorativeBox class="h-10 w-32" />
		</Flex>

		<Flex justify="end">
			<DecorativeBox class="h-10 w-32" />
			<DecorativeBox class="h-10 w-32">flex-end</DecorativeBox>
			<DecorativeBox class="h-10 w-32" />
		</Flex>

		<Flex justify="between">
			<DecorativeBox class="h-10 w-32" />
			<DecorativeBox class="h-10 w-32">space-between</DecorativeBox>
			<DecorativeBox class="h-10 w-32" />
		</Flex>
	</Flex>
{/if}
