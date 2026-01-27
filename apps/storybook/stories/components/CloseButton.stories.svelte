<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { CloseButton } from "$saas/components/close-button";
	import { HStack } from "$saas/layout/stack";
	import { Icon } from "$saas/components/icon";
	import XCircle from "phosphor-svelte/lib/XCircle";
	import {
		commonArgTypes,
		getControls,
		closeButtonSizes,
		closeButtonVariants,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Close Button",
		component: CloseButton,
		argTypes: {
			size: {
				...commonArgTypes.size,
				options: closeButtonSizes,
				table: { defaultValue: { summary: "md" } },
			},
			variant: {
				...commonArgTypes.variant,
				options: closeButtonVariants,
				table: { defaultValue: { summary: "ghost" } },
			},
			colour: commonArgTypes.colour,
			disabled: commonArgTypes.disabled,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"size",
				"variant",
				"colour",
				"disabled",
				"class",
			]),
		},
		args: {
			size: "md",
			variant: "ghost",
		},
	});
</script>

{#snippet basicStory(args: any)}
	<CloseButton {...args} />
{/snippet}

{#snippet sizesStory()}
	<HStack gap={4} class="flex-wrap items-center">
		{#each closeButtonSizes as size}
			<CloseButton {size} variant="outline" />
		{/each}
	</HStack>
{/snippet}

{#snippet variantsStory()}
	<HStack gap={2}>
		<CloseButton variant="ghost" colour="indigo" />
		<CloseButton variant="outline" colour="indigo" />
		<CloseButton variant="subtle" colour="indigo" />
		<CloseButton variant="solid" colour="indigo" />
		<CloseButton variant="glass" colour="indigo" />
	</HStack>
{/snippet}

{#snippet customIconStory()}
	<CloseButton variant="ghost">
		<Icon as={XCircle} size="md" />
	</CloseButton>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Variants" template={variantsStory} />

<Story name="CustomIcon" template={customIconStory} />
