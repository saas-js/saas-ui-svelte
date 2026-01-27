<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Timeline } from "$saas/components/timeline";
	import { Avatar } from "$saas/components/avatar";
	import { Badge } from "$saas/components/badge";
	import { VStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import Boat from "phosphor-svelte/lib/Boat";
	import Check from "phosphor-svelte/lib/Check";
	import Package from "phosphor-svelte/lib/Package";
	import {
		commonArgTypes,
		getControls,
		timelineSizes,
		timelineVariants,
	} from "../utils";

	const { Story } = defineMeta({
		title: "Components/Timeline",
		component: Timeline.Root,
		argTypes: {
			size: {
				control: "select",
				options: timelineSizes,
				description: "The size of the timeline.",
				table: {
					defaultValue: { summary: "md" },
				},
			},
			variant: {
				control: "select",
				options: timelineVariants,
				description: "The visual style of the timeline.",
				table: {
					defaultValue: { summary: "solid" },
				},
			},
			colour: {
				...commonArgTypes.colour,
				table: {
					defaultValue: { summary: "gray" },
				},
			},
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls(["size", "variant", "colour", "class"]),
		},
		args: {
			size: "md",
			variant: "solid",
			colour: "gray",
		},
	});
</script>

<script lang="ts">
	import type { Story as StoryType } from "@storybook/addon-svelte-csf";
</script>

{#snippet basicStory(args: StoryType["args"])}
	<Timeline.Root {...args} class="max-w-[400px]">
		<Timeline.Item>
			<Timeline.Connector>
				<Boat />
			</Timeline.Connector>
			<Timeline.Content>
				<Timeline.Title>Product Shipped</Timeline.Title>
				<Timeline.Description>13th May 2021</Timeline.Description>
				<Text size="sm">
					We shipped your product via <strong>FedEx</strong> and it should
					arrive within 3-5 business days.
				</Text>
			</Timeline.Content>
		</Timeline.Item>

		<Timeline.Item>
			<Timeline.Connector>
				<Check />
			</Timeline.Connector>
			<Timeline.Content>
				<Timeline.Title>Order Confirmed</Timeline.Title>
				<Timeline.Description>18th May 2021</Timeline.Description>
			</Timeline.Content>
		</Timeline.Item>

		<Timeline.Item>
			<Timeline.Connector>
				<Package />
			</Timeline.Connector>
			<Timeline.Content>
				<Timeline.Title>Order Delivered</Timeline.Title>
				<Timeline.Description
					>20th May 2021, 10:30am</Timeline.Description
				>
			</Timeline.Content>
		</Timeline.Item>
	</Timeline.Root>
{/snippet}

{#snippet sizesStory()}
	<VStack gap={8}>
		{#each timelineSizes as size}
			<VStack gap={2}>
				<Text size="xs" class="text-fg-muted capitalize">{size}</Text>
				<Timeline.Root {size}>
					<Timeline.Item>
						<Timeline.Connector>
							<Avatar
								size="full"
								name="Sage"
								src="https://i.pravatar.cc/150?u=sage"
							/>
						</Timeline.Connector>
						<Timeline.Content>
							<Timeline.Title>
								<span class="font-medium">sage</span>
								created a new project
							</Timeline.Title>
						</Timeline.Content>
					</Timeline.Item>

					<Timeline.Item>
						<Timeline.Connector>
							<Check />
						</Timeline.Connector>
						<Timeline.Content>
							<Timeline.Title>
								<span class="font-medium">sage</span>
								changed status from
								<Badge size="sm" variant="subtle"
									>In progress</Badge
								>
								to
								<Badge size="sm" variant="subtle" colour="teal"
									>Completed</Badge
								>
							</Timeline.Title>
						</Timeline.Content>
					</Timeline.Item>
				</Timeline.Root>
			</VStack>
		{/each}
	</VStack>
{/snippet}

{#snippet variantsStory()}
	<VStack gap={16}>
		{#each timelineVariants as variant}
			<VStack gap={2}>
				<Text size="xs" class="text-fg-muted capitalize">{variant}</Text
				>
				<Timeline.Root {variant}>
					<Timeline.Item>
						<Timeline.Connector>
							<Avatar
								size="full"
								name="Sage"
								src="https://i.pravatar.cc/150?u=sage"
							/>
						</Timeline.Connector>
						<Timeline.Content>
							<Timeline.Title>
								<span class="font-medium">sage</span>
								created a new project
							</Timeline.Title>
						</Timeline.Content>
					</Timeline.Item>

					<Timeline.Item>
						<Timeline.Connector>
							<Check />
						</Timeline.Connector>
						<Timeline.Content>
							<Timeline.Title>
								<span class="font-medium">sage</span>
								changed status from
								<Badge size="sm" variant="subtle"
									>In progress</Badge
								>
								to
								<Badge size="sm" variant="subtle" colour="teal"
									>Completed</Badge
								>
							</Timeline.Title>
						</Timeline.Content>
					</Timeline.Item>
				</Timeline.Root>
			</VStack>
		{/each}
	</VStack>
{/snippet}

{#snippet contentBeforeStory()}
	<VStack gap={8}>
		{#each ["sm", "md", "lg"] as size}
			<VStack gap={2}>
				<Text size="xs" class="text-fg-muted capitalize">{size}</Text>
				<Timeline.Root {size}>
					<Timeline.Item>
						<Timeline.Content width="auto">
							<Timeline.Title whiteSpace="nowrap"
								>Nov 1994</Timeline.Title
							>
						</Timeline.Content>
						<Timeline.Connector>1</Timeline.Connector>
						<Timeline.Content>
							<Timeline.Title>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit.
							</Timeline.Title>
						</Timeline.Content>
					</Timeline.Item>

					<Timeline.Item>
						<Timeline.Content width="auto">
							<Timeline.Title whiteSpace="nowrap"
								>Nov 2010</Timeline.Title
							>
						</Timeline.Content>
						<Timeline.Connector>2</Timeline.Connector>
						<Timeline.Content>
							<Timeline.Title>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit.
							</Timeline.Title>
						</Timeline.Content>
					</Timeline.Item>
				</Timeline.Root>
			</VStack>
		{/each}
	</VStack>
{/snippet}

{#snippet alternatingStory()}
	<Timeline.Root size="md" variant="outline" class="max-w-[500px]">
		<Timeline.Item>
			<Timeline.Content flex={1} alignItems="flex-end">
				<Timeline.Description>Jan 2020</Timeline.Description>
			</Timeline.Content>
			<Timeline.Connector>
				<Check />
			</Timeline.Connector>
			<Timeline.Content flex={1}>
				<Timeline.Title>Founded Company</Timeline.Title>
				<Timeline.Description
					>Started with a team of 3 people</Timeline.Description
				>
			</Timeline.Content>
		</Timeline.Item>

		<Timeline.Item>
			<Timeline.Content flex={1} alignItems="flex-end">
				<Timeline.Title>Series A Funding</Timeline.Title>
				<Timeline.Description
					>Raised $5M from investors</Timeline.Description
				>
			</Timeline.Content>
			<Timeline.Connector>
				<Check />
			</Timeline.Connector>
			<Timeline.Content flex={1}>
				<Timeline.Description>Jun 2021</Timeline.Description>
			</Timeline.Content>
		</Timeline.Item>

		<Timeline.Item>
			<Timeline.Content flex={1} alignItems="flex-end">
				<Timeline.Description>Mar 2023</Timeline.Description>
			</Timeline.Content>
			<Timeline.Connector>
				<Check />
			</Timeline.Connector>
			<Timeline.Content flex={1}>
				<Timeline.Title>100k Users</Timeline.Title>
				<Timeline.Description
					>Reached major milestone</Timeline.Description
				>
			</Timeline.Content>
		</Timeline.Item>

		<Timeline.Item>
			<Timeline.Content flex={1} alignItems="flex-end">
				<Timeline.Title>Global Expansion</Timeline.Title>
				<Timeline.Description
					>Opened offices in 5 countries</Timeline.Description
				>
			</Timeline.Content>
			<Timeline.Connector>
				<Package />
			</Timeline.Connector>
			<Timeline.Content flex={1}>
				<Timeline.Description>Dec 2024</Timeline.Description>
			</Timeline.Content>
		</Timeline.Item>
	</Timeline.Root>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Variants" template={variantsStory} />

<Story name="ContentBefore" template={contentBeforeStory} />

<Story name="Alternating" template={alternatingStory} />
