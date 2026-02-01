<script lang="ts">
	import { Container } from "$saas/layout/container";
	import { DecorativeBox, VStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";

	interface Props {
		story: "basic" | "sizes" | "fluid";
		args?: any;
	}

	let { story, args = {} }: Props = $props();

	const sampleSizes = ["sm", "md", "xl", "2xl"] as const;
</script>

{#if story === "basic"}
	<Container {...args}>
		<DecorativeBox class="px-2">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit.
		</DecorativeBox>
	</Container>
{:else if story === "sizes"}
	<VStack gap={4}>
		{#each sampleSizes as size}
			<div>
				<Text weight="medium" class="mb-1 block text-center"
					>{size}</Text
				>
				<Container maxW={size}>
					<DecorativeBox class="px-2">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					</DecorativeBox>
				</Container>
			</div>
		{/each}
	</VStack>
{:else if story === "fluid"}
	<Container fluid>
		<DecorativeBox class="px-2">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit.
		</DecorativeBox>
	</Container>
{/if}
