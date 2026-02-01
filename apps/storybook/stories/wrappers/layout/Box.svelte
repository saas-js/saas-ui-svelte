<script lang="ts">
	import { Box } from "$saas/layout/box";
	import { HStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import { Badge } from "$saas/components/badge";
	import { Icon } from "$saas/components/icon";
	import Star from "phosphor-svelte/lib/Star";

	interface Props {
		story:
			| "basic"
			| "shorthand"
			| "border"
			| "asProp"
			| "shadow"
			| "composition"
			| "nested";
		args?: any;
	}

	let { story, args = {} }: Props = $props();
</script>

{#if story === "basic"}
	<Box {...args} class="text-fg-inverted w-full bg-(--colors-red-solid) p-4"
		>This is the Box</Box
	>
{:else if story === "shorthand"}
	<Box
		class="w-full rounded-lg bg-(--colors-orange-solid) p-4 text-(--colors-orange-contrast)"
	>
		This is the Box with shorthand classes
	</Box>
{:else if story === "border"}
	<Box class="border-border-default text-fg-muted rounded-md border p-4">
		Box with border
	</Box>
{:else if story === "asProp"}
	<Box as="section" class="text-fg-default bg-bg-subtle rounded-md p-4">
		This is a Box rendered as a section
	</Box>
{:else if story === "shadow"}
	<Box class="bg-bg-default rounded-md p-4 shadow-md">Box with shadow</Box>
{:else if story === "composition"}
	<Box
		class="border-border-default max-w-sm overflow-hidden rounded-lg border"
	>
		<img
			src="https://bit.ly/2Z4KKcF"
			alt="Rear view of modern home with pool"
			class="h-48 w-full object-cover"
		/>
		<Box class="space-y-2 p-4">
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
	<Box class="bg-bg-subtle rounded-lg p-4">
		<Box class="bg-bg-default rounded-md p-4 shadow-sm">
			<Box class="bg-bg-emphasized rounded p-4">Nested boxes</Box>
		</Box>
	</Box>
{/if}
