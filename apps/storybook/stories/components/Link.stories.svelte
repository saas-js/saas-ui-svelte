<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Link } from "$saas/components/link";
	import { VStack } from "$saas/layout/stack";
	import ArrowSquareOut from "phosphor-svelte/lib/ArrowSquareOut";
	import { Icon } from "$saas/components/icon";
	import {
		colours,
		commonArgTypes,
		getControls,
		linkVariants,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Link",
		component: Link,
		argTypes: {
			variant: {
				...commonArgTypes.variant,
				options: linkVariants,
			},
			colour: {
				...commonArgTypes.colour,
				options: colours,
			},
			href: {
				control: "text",
			},
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"variant",
				"colour",
				"href",
				"children",
				"class",
			]),
		},
		args: {
			variant: "plain",
			colour: "gray",
			href: "#",
		},
	});
</script>

{#snippet basicStory(args: any)}
	<Link {...args}>Visit Chakra UI</Link>
{/snippet}

{#snippet variantsStory()}
	<VStack gap={2} class="items-center">
		<Link href="#" variant="underline">Link (Underline)</Link>
		<Link href="#" variant="plain">Link (Plain)</Link>
	</VStack>
{/snippet}

{#snippet withinTextStory()}
	<p>
		Visit the <Link
			href="https://chakra-ui.com"
			colour="teal"
			variant="underline">Chakra UI</Link
		> website
	</p>
{/snippet}

{#snippet externalStory()}
	<Link href="#" variant="plain">
		Visit Chakra UI
		<Icon as={ArrowSquareOut} class="size-3.5" />
	</Link>
{/snippet}

{#snippet coloursStory()}
	<VStack gap={4}>
		{#each colours as colour}
			<div class="flex items-center gap-4">
				<span class="w-16 text-xs text-fg-muted">{colour}</span>
				<Link href="#" variant="underline" {colour}
					>Link ({colour})</Link
				>
				<Link href="#" variant="plain" {colour}>Plain</Link>
			</div>
		{/each}
	</VStack>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Variants" template={variantsStory} />

<Story name="Within Text" template={withinTextStory} />

<Story name="External" template={externalStory} />

<Story name="Colours" template={coloursStory} />
