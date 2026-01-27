<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Kbd } from "$saas/components/kbd";
	import { Text } from "$saas/typography/text";
	import { HStack, VStack } from "$saas/layout/stack";
	import {
		commonArgTypes,
		getControls,
		kbdVariants,
		kbdSizes,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Kbd",
		component: Kbd,
		argTypes: {
			variant: {
				...commonArgTypes.variant,
				options: kbdVariants,
				table: { defaultValue: { summary: "subtle" } },
			},
			size: {
				...commonArgTypes.size,
				options: kbdSizes,
				table: { defaultValue: { summary: "md" } },
			},
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls(["variant", "size", "children", "class"]),
		},
		args: {
			variant: "subtle",
			size: "md",
		},
	});
</script>

{#snippet combinationsStory()}
	<HStack gap={1}>
		<Kbd>ctrl</Kbd>+<Kbd>shift</Kbd>+<Kbd>del</Kbd>
	</HStack>
{/snippet}

{#snippet functionKeysStory()}
	<HStack gap={2}>
		<Kbd aria-label="Command">⌘</Kbd>
		<Kbd aria-label="Option">⌥</Kbd>
		<Kbd aria-label="Shift">⇧</Kbd>
		<Kbd aria-label="Control">⌃</Kbd>
	</HStack>
{/snippet}

{#snippet variantsStory()}
	<HStack gap={8} class="flex-wrap">
		{#each kbdVariants as variant}
			<VStack gap={2} class="items-center">
				<Text size="xs">{variant}</Text>
				<Kbd {variant}>Shift + Tab</Kbd>
			</VStack>
		{/each}
	</HStack>
{/snippet}

{#snippet sizesStory()}
	<HStack gap={8} class="flex-wrap">
		{#each kbdSizes as size}
			<VStack gap={2} class="items-center">
				<Text size="xs">{size}</Text>
				<Kbd {size} variant="outline">Shift + Tab</Kbd>
			</VStack>
		{/each}
	</HStack>
{/snippet}

{#snippet withinTextStory()}
	<Text>
		Press <Kbd>F12</Kbd> to open DevTools
	</Text>
{/snippet}

{#snippet basicStory(args: any)}
	<Kbd {...args}>Shift + Tab</Kbd>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Combinations" template={combinationsStory} />

<Story name="Function Keys" template={functionKeysStory} />

<Story name="Variants" template={variantsStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Within Text" template={withinTextStory} />
