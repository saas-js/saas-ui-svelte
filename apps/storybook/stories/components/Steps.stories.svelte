<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Steps } from "$saas/components/steps";
	import { Stack, VStack, HStack } from "$saas/layout/stack";
	import { Group } from "$saas/layout/group";
	import { Text } from "$saas/typography/text";
	import {
		commonArgTypes,
		getControls,
		colours,
		orientations,
		stepsSizes,
		stepsVariants,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Steps",
		component: Steps.Root,
		argTypes: {
			count: {
				control: "number",
				description: "The total number of steps.",
				table: { defaultValue: { summary: "3" } },
			},
			defaultStep: {
				control: "number",
				description: "The initial step (0-indexed).",
				table: { defaultValue: { summary: "0" } },
			},
			size: {
				control: "select",
				options: stepsSizes,
				description: "The size of the steps.",
				table: { defaultValue: { summary: "md" } },
			},
			variant: {
				control: "select",
				options: stepsVariants,
				description: "The visual variant of the steps.",
				table: { defaultValue: { summary: "solid" } },
			},
			orientation: {
				control: "select",
				options: orientations,
				description: "The orientation of the steps.",
				table: { defaultValue: { summary: "horizontal" } },
			},
			colour: {
				control: "select",
				options: colours,
				description: "The colour palette.",
				table: { defaultValue: { summary: "accent" } },
			},
			linear: {
				control: "boolean",
				description: "Whether steps must be completed in order.",
				table: { defaultValue: { summary: "false" } },
			},
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"count",
				"defaultStep",
				"size",
				"variant",
				"orientation",
				"colour",
				"linear",
				"class",
			]),
		},
		args: {
			count: 3,
			defaultStep: 1,
			size: "md",
			variant: "solid",
			orientation: "horizontal",
			colour: "gray",
			linear: false,
		},
	});
</script>

<script lang="ts">
	import User from "phosphor-svelte/lib/User";
	import Wallet from "phosphor-svelte/lib/Wallet";
	import CalendarBlank from "phosphor-svelte/lib/CalendarBlank";
</script>

{#snippet basicStory(args: any)}
	<Steps.Root {...args}>
		<Steps.List>
			<Steps.Item index={0} title="Step 1" />
			<Steps.Item index={1} title="Step 2" />
			<Steps.Item index={2} title="Step 3" />
		</Steps.List>

		<Steps.Content index={0}>Step 1 content</Steps.Content>
		<Steps.Content index={1}>Step 2 content</Steps.Content>
		<Steps.Content index={2}>Step 3 content</Steps.Content>
		<Steps.CompletedContent>All steps are complete!</Steps.CompletedContent>

		<Group>
			<Steps.PrevTrigger>Prev</Steps.PrevTrigger>
			<Steps.NextTrigger>Next</Steps.NextTrigger>
		</Group>
	</Steps.Root>
{/snippet}

{#snippet sizesStory()}
	<VStack gap={16}>
		{#each stepsSizes as size}
			<Steps.Root {size} count={3}>
				<Steps.List>
					<Steps.Item index={0} title="Step 1" />
					<Steps.Item index={1} title="Step 2" />
					<Steps.Item index={2} title="Step 3" />
				</Steps.List>

				<Steps.Content index={0}>Step 1 content</Steps.Content>
				<Steps.Content index={1}>Step 2 content</Steps.Content>
				<Steps.Content index={2}>Step 3 content</Steps.Content>
				<Steps.CompletedContent
					>All steps are complete!</Steps.CompletedContent
				>

				<Group>
					<Steps.PrevTrigger>Prev</Steps.PrevTrigger>
					<Steps.NextTrigger>Next</Steps.NextTrigger>
				</Group>
			</Steps.Root>
		{/each}
	</VStack>
{/snippet}

{#snippet coloursStory()}
	<VStack gap={10}>
		{#each colours as colour}
			<HStack gap={4} class="items-center">
				<Text size="xs" class="w-16">{colour}</Text>
				<Steps.Root {colour} defaultStep={1} count={3} class="flex-1">
					<Steps.List>
						<Steps.Item index={0} title="Step 1" />
						<Steps.Item index={1} title="Step 2" />
						<Steps.Item index={2} title="Step 3" />
					</Steps.List>
				</Steps.Root>
			</HStack>
		{/each}
	</VStack>
{/snippet}

{#snippet verticalStory()}
	<Steps.Root
		orientation="vertical"
		class="h-[400px]"
		defaultStep={1}
		count={3}
	>
		<Steps.List>
			<Steps.Item index={0} title="Step 1" />
			<Steps.Item index={1} title="Step 2" />
			<Steps.Item index={2} title="Step 3" />
		</Steps.List>

		<Stack>
			<Steps.Content index={0}>Step 1 content</Steps.Content>
			<Steps.Content index={1}>Step 2 content</Steps.Content>
			<Steps.Content index={2}>Step 3 content</Steps.Content>
			<Steps.CompletedContent
				>All steps are complete!</Steps.CompletedContent
			>

			<Group>
				<Steps.PrevTrigger>Prev</Steps.PrevTrigger>
				<Steps.NextTrigger>Next</Steps.NextTrigger>
			</Group>
		</Stack>
	</Steps.Root>
{/snippet}

{#snippet variantsStory()}
	<VStack gap={16}>
		{#each ["subtle", "solid"] as variant (variant)}
			<Steps.Root
				variant={variant as "subtle" | "solid"}
				defaultStep={1}
				count={3}
			>
				<Steps.List>
					<Steps.Item index={0} title="Step 1" />
					<Steps.Item index={1} title="Step 2" />
					<Steps.Item index={2} title="Step 3" />
				</Steps.List>

				<Steps.Content index={0}>Step 1</Steps.Content>
				<Steps.Content index={1}>Step 2</Steps.Content>
				<Steps.Content index={2}>Step 3</Steps.Content>
				<Steps.CompletedContent
					>All steps are complete!</Steps.CompletedContent
				>

				<Group>
					<Steps.PrevTrigger>Prev</Steps.PrevTrigger>
					<Steps.NextTrigger>Next</Steps.NextTrigger>
				</Group>
			</Steps.Root>
		{/each}
	</VStack>
{/snippet}

{#snippet iconStory()}
	<Steps.Root defaultStep={1} count={3}>
		<Steps.List>
			<Steps.Item index={0} icon={User} aria-label="Contact Details" />
			<Steps.Item index={1} icon={Wallet} aria-label="Payment" />
			<Steps.Item index={2} icon={CalendarBlank} aria-label="Appointment" />
		</Steps.List>

		<Steps.Content index={0}>Contact Details</Steps.Content>
		<Steps.Content index={1}>Payment</Steps.Content>
		<Steps.Content index={2}>Book an Appointment</Steps.Content>
		<Steps.CompletedContent>All steps are complete!</Steps.CompletedContent>

		<Group>
			<Steps.PrevTrigger>Prev</Steps.PrevTrigger>
			<Steps.NextTrigger>Next</Steps.NextTrigger>
		</Group>
	</Steps.Root>
{/snippet}

{#snippet descriptionStory()}
	<Steps.Root defaultStep={1} count={3}>
		<Steps.List>
			<Steps.Item index={0} title="Step 1" description="This step" />
			<Steps.Item index={1} title="Step 2" description="That step" />
			<Steps.Item index={2} title="Step 3" description="Final step" />
		</Steps.List>

		<Steps.Content index={0}>Step 1</Steps.Content>
		<Steps.Content index={1}>Step 2</Steps.Content>
		<Steps.Content index={2}>Step 3</Steps.Content>
		<Steps.CompletedContent>All steps are complete!</Steps.CompletedContent>

		<Group>
			<Steps.PrevTrigger>Prev</Steps.PrevTrigger>
			<Steps.NextTrigger>Next</Steps.NextTrigger>
		</Group>
	</Steps.Root>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Variants" template={variantsStory} />

<Story name="Colours" template={coloursStory} />

<Story name="Vertical" template={verticalStory} />

<Story name="Icon" template={iconStory} />

<Story name="Description" template={descriptionStory} />
