<script lang="ts" module>
	// Wrapper components for complex Input stories
	// These are imported by Input.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { Input } from "$saas/components/input";
	import { Group } from "$saas/layout/group";
	import { Stack, HStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import { Kbd } from "$saas/components/kbd";
	import { Icon } from "$saas/components/icon";
	import User from "phosphor-svelte/lib/User";
	import MagnifyingGlass from "phosphor-svelte/lib/MagnifyingGlass";
	import { colours, inputVariants, inputSizes } from "../../utils";

	interface Props {
		story:
			| "basic"
			| "variants"
			| "sizes"
			| "leftElement"
			| "leftAndRightElement"
			| "withAddons"
			| "disabled"
			| "colours"
			| "placeholderStyle";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<Input placeholder="Enter text..." />
{:else if story === "variants"}
	<Stack gap={4} class="max-w-md">
		{#each inputVariants as variant}
			<HStack align="center" gap={4}>
				<Text size="xs" class="min-w-[8ch]">{variant}</Text>
				<Input {variant} placeholder="Placeholder" class="flex-1" />
			</HStack>
		{/each}
	</Stack>
{:else if story === "sizes"}
	<Stack gap={4} class="max-w-md">
		{#each inputSizes as size}
			<HStack align="center" gap={4}>
				<Text size="xs" class="min-w-[3ch]">{size}</Text>
				<Input {size} placeholder="Placeholder" class="flex-1" />
			</HStack>
		{/each}
	</Stack>
{:else if story === "leftElement"}
	<HStack gap={4} class="w-full">
		<Input.Group class="flex-1">
			<Input.Element placement="left">
				<Icon as={User} size="xs" />
			</Input.Element>
			<Input placeholder="Username" class="pl-8" />
		</Input.Group>

		<Input.Group class="flex-1">
			<Input.Element placement="left">https://</Input.Element>
			<Input placeholder="yoursite.com" class="pl-16" />
		</Input.Group>
	</HStack>
{:else if story === "leftAndRightElement"}
	<HStack gap={4} class="w-full">
		<Input.Group class="flex-1">
			<Input.Element placement="left">
				<Icon as={MagnifyingGlass} size="xs" />
			</Input.Element>
			<Input placeholder="Search contacts" class="px-8" />
			<Input.Element placement="right" class="pointer-events-auto">
				<Kbd>⌘K</Kbd>
			</Input.Element>
		</Input.Group>

		<Input.Group class="flex-1">
			<Input.Element placement="left">https://</Input.Element>
			<Input placeholder="yoursite.com" class="pl-16" />
		</Input.Group>
	</HStack>
{:else if story === "withAddons"}
	<Stack gap={4} class="max-w-sm">
		<Group attached>
			<Input.Addon>https://</Input.Addon>
			<Input placeholder="website.com" class="-ml-px focus-visible:z-1" />
		</Group>

		<Group attached>
			<Input placeholder="jdoe" class="-mr-px focus-visible:z-1" />
			<Input.Addon>@gmail.com</Input.Addon>
		</Group>
	</Stack>
{:else if story === "disabled"}
	<Stack class="max-w-sm">
		<Input disabled placeholder="Disabled input" />
	</Stack>
{:else if story === "colours"}
	<Stack gap={4} class="max-w-sm">
		{#each colours as colour}
			<HStack align="center" gap={4}>
				<Text size="xs" class="min-w-[8ch] capitalize">{colour}</Text>
				<Input
					{colour}
					placeholder="Focus to see {colour} ring"
					class="flex-1"
				/>
			</HStack>
		{/each}
	</Stack>
{:else if story === "placeholderStyle"}
	<Stack class="max-w-sm">
		<Input
			colour="teal"
			placeholder="custom placeholder"
			class="text-(--c-fg) placeholder:text-inherit"
		/>
	</Stack>
{/if}
