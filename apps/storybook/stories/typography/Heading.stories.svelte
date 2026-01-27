<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Heading } from "$saas/typography/heading";
	import { Text } from "$saas/typography/text";
	import { Mark } from "$saas/typography/mark";
	import { Button } from "$saas/components/button";
	import { Stack } from "$saas/layout/stack";
	import ArrowRight from "phosphor-svelte/lib/ArrowRight";
	import {
		commonArgTypes,
		getControls,
		textSizes,
		headingWeights,
	} from "../utils";

	const { Story } = defineMeta({
		title: "typography/Heading",
		component: Heading,
		argTypes: {
			as: {
				control: "text",
				table: { defaultValue: { summary: "h2" } },
			},
			size: {
				...commonArgTypes.size,
				options: textSizes,
			},
			weight: {
				control: "select",
				options: headingWeights,
				table: { defaultValue: { summary: "semibold" } },
			},
			fontWeight: {
				table: { disable: true },
			},
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"as",
				"size",
				"weight",
				"class",
				"children",
			]),
		},
		args: {
			size: "xl",
			weight: "semibold",
			as: "h2",
		},
	});
</script>

{#snippet sizesStory()}
	<Stack>
		{#each textSizes as size}
			<Heading {size}>The quick brown fox jumps over the lazy dog</Heading
			>
		{/each}
	</Stack>
{/snippet}

{#snippet multiLineStory()}
	<Stack>
		{#each textSizes as size}
			<Heading {size}>
				The quick brown fox
				<br />
				jumps over the lazy dog
			</Heading>
		{/each}
	</Stack>
{/snippet}

{#snippet weightsStory()}
	<Stack>
		{#each headingWeights as w}
			<Heading weight={w}>{w}</Heading>
		{/each}
	</Stack>
{/snippet}

{#snippet asStory()}
	<Stack>
		<Heading as="h1">Level 1</Heading>
		<Heading as="h2">Level 2</Heading>
		<Heading as="h3">Level 3</Heading>
	</Stack>
{/snippet}

{#snippet basicStory(args: any)}
	<Heading {...args}>The quick brown fox jumps over the lazy dog</Heading>
{/snippet}

{#snippet highlightStory()}
	<Stack>
		<Heading size="3xl">
			Build modern SaaS applications with <Mark
				colour="indigo"
				variant="text">Saas UI</Mark
			>
		</Heading>
		<Text class="text-fg-muted">
			Saas UI provides enterprise-ready components and patterns to help
			you build professional applications faster than ever.
		</Text>
	</Stack>
{/snippet}

{#snippet compositionStory()}
	<Stack align="start">
		<Heading size="2xl">Modern payments for Stores</Heading>
		<Text class="text-fg-muted mb-3">
			PayMe helps startups get paid by anyone, anywhere in the world
		</Text>
		<Button>
			Create account
			<ArrowRight aria-hidden="true" />
		</Button>
	</Stack>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Multiline" template={multiLineStory} />

<Story name="Weights" template={weightsStory} />

<Story name="As Element" template={asStory} />

<Story name="Highlight" template={highlightStory} />

<Story name="Composition" template={compositionStory} />
