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
	<Box as="section" class="p-4 text-fg-default bg-bg-subtle rounded-md">
		This is a Box rendered as a section
	</Box>
{:else if story === "shadow"}
	<Box class="p-4 shadow-md bg-bg-default rounded-md">Box with shadow</Box>
{:else if story === "composition"}
	<Box
		class="max-w-sm overflow-hidden border rounded-lg border-border-default"
	>
		<img
			src="https://bit.ly/2Z4KKcF"
			alt="Rear view of modern home with pool"
			class="object-cover w-full h-48"
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
	<Box class="p-4 rounded-lg bg-bg-subtle">
		<Box class="p-4 bg-bg-default rounded-md shadow-sm">
			<Box class="p-4 rounded bg-bg-emphasized">Nested boxes</Box>
		</Box>
	</Box>
{/if}
