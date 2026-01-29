<script lang="ts">
	import { Box } from "$saas/layout/box";
	import { HStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import { Badge } from "$saas/components/badge";
	import { Icon } from "$saas/components/icon";
	import Star from "phosphor-svelte/lib/Star";

	interface Props {
		story: "basic" | "shorthand" | "border" | "asProp" | "shadow" | "composition" | "nested";
		args?: any;
	}

	let { story, args = {} }: Props = $props();
</script>

{#if story === "basic"}
	<Box {...args} class="bg-(--colors-red-solid) w-full p-4 text-fg-inverted">This is the Box</Box>
{:else if story === "shorthand"}
	<Box
		class="bg-(--colors-orange-solid) w-full p-4 text-(--colors-orange-contrast) rounded-lg"
	>
		This is the Box with shorthand classes
	</Box>
{:else if story === "border"}
	<Box class="p-4 border border-border-default text-fg-muted rounded-md">
		Box with border
	</Box>
{:else if story === "asProp"}
	<Box as="section" class="text-fg-default p-4 bg-bg-subtle rounded-md">
		This is a Box rendered as a section
	</Box>
{:else if story === "shadow"}
	<Box class="bg-bg-default shadow-md rounded-md p-4">Box with shadow</Box>
{:else if story === "composition"}
	<Box
		class="max-w-sm border border-border-default rounded-lg overflow-hidden"
	>
		<img
			src="https://bit.ly/2Z4KKcF"
			alt="Rear view of modern home with pool"
			class="w-full h-48 object-cover"
		/>
		<Box class="p-4 space-y-2">
			<HStack>
				<Badge colour="teal" variant="solid">Superhost</Badge>
				<HStack gap={1} class="font-medium">
					<Icon as={Star} colour="orange" weight="fill" size="sm" />
					<Text>4.5 (34)</Text>
				</HStack>
			</HStack>
			<Text weight="medium">
				Modern home in city center in the heart of historic Los Angeles
			</Text>
			<Text class="text-fg-muted">$435 - 3 beds</Text>
		</Box>
	</Box>
{:else if story === "nested"}
	<Box class="p-4 bg-bg-subtle rounded-lg">
		<Box class="p-4 bg-bg-default rounded-md shadow-sm">
			<Box class="p-4 bg-bg-emphasized rounded">Nested boxes</Box>
		</Box>
	</Box>
{/if}
