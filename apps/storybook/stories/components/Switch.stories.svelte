<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Switch } from "$saas/components/switch";
	import { HStack, VStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import { Icon } from "$saas/components/icon";
	import {
		commonArgTypes,
		getControls,
		colours,
		switchSizes,
		switchVariants,
	} from "../utils";
	import Check from "phosphor-svelte/lib/Check";
	import X from "phosphor-svelte/lib/X";
	import Sun from "phosphor-svelte/lib/Sun";
	import Moon from "phosphor-svelte/lib/Moon";

	const { Story } = defineMeta({
		title: "components/Switch",
		component: Switch,
		argTypes: {
			size: {
				control: "select",
				options: switchSizes,
				description: "The size of the switch.",
				table: {
					defaultValue: { summary: "md" },
				},
			},
			variant: {
				control: "select",
				options: switchVariants,
				description: "The visual variant of the switch.",
				table: {
					defaultValue: { summary: "solid" },
				},
			},
			colour: {
				control: "select",
				options: colours,
				description: "The colour palette to use.",
				table: {
					defaultValue: { summary: "accent" },
				},
			},
			checked: {
				control: "boolean",
				description: "Whether the switch is checked.",
			},
			disabled: {
				control: "boolean",
				description: "Whether the switch is disabled.",
			},
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"size",
				"variant",
				"colour",
				"checked",
				"disabled",
				"class",
			]),
		},
		args: {
			size: "md",
			variant: "solid",
			colour: "accent",
			checked: false,
			disabled: false,
		},
	});
</script>

{#snippet basicStory(args: any)}
	<Switch {...args}>Activate Chakra</Switch>
{/snippet}

{#snippet sizesStory()}
	<HStack gap={8}>
		{#each switchSizes as size}
			<Switch {size}>{size}</Switch>
		{/each}
	</HStack>
{/snippet}

{#snippet variantsStory()}
	<HStack gap={8}>
		{#each switchVariants as variant}
			<Switch {variant} checked>{variant}</Switch>
		{/each}
	</HStack>
{/snippet}

{#snippet coloursStory()}
	<VStack gap={4} align="start">
		{#each colours as colour}
			<HStack gap={6} class="items-center">
				<Text size="xs" class="min-w-[8ch]">{colour}</Text>
				{#each switchVariants as variant}
					<Switch
						{colour}
						{variant}
						aria-label="{colour} {variant} off"
					/>
					<Switch
						{colour}
						{variant}
						checked
						aria-label="{colour} {variant} on"
					/>
				{/each}
			</HStack>
		{/each}
	</VStack>
{/snippet}

{#snippet disabledStory()}
	<HStack gap={4}>
		<Switch disabled>Disabled Off</Switch>
		<Switch disabled checked>Disabled On</Switch>
	</HStack>
{/snippet}

{#snippet checkIcon()}
	<Icon as={Check} class="h-3.5" />
{/snippet}

{#snippet xIcon()}
	<Icon as={X} class="h-3.5" />
{/snippet}

{#snippet thumbLabelStory()}
	<Switch size="lg" thumbLabel={{ on: checkIcon, off: xIcon }}>
		Switch me
	</Switch>
{/snippet}

{#snippet sunIcon()}
	<Icon as={Sun} weight="fill" class="h-3.5 text-yellow-400" />
{/snippet}

{#snippet moonIcon()}
	<Icon as={Moon} weight="fill" class="h-3.5 text-fg-muted" />
{/snippet}

{#snippet trackLabelStory()}
	<Switch size="lg" colour="blue" trackLabel={{ on: sunIcon, off: moonIcon }}>
		Dark mode
	</Switch>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Variants" template={variantsStory} />

<Story name="Colours" template={coloursStory} />

<Story name="Disabled" template={disabledStory} />

<Story name="Thumb Label" template={thumbLabelStory} />

<Story name="Track Label" template={trackLabelStory} />
