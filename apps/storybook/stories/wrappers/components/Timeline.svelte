<script lang="ts" module>
	// Wrapper components for complex Timeline stories
	// These are imported by Timeline.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { Timeline } from "$saas/components/timeline";
	import { Avatar } from "$saas/components/avatar";
	import { Badge } from "$saas/components/badge";
	import { VStack, HStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import { Icon } from "$saas/components/icon";
	import Boat from "phosphor-svelte/lib/Boat";
	import Check from "phosphor-svelte/lib/Check";
	import Package from "phosphor-svelte/lib/Package";
	import { colours } from "../../utils";

	const timelineSizes = ["sm", "md", "lg", "xl"] as const;
	const timelineVariants = ["subtle", "solid", "outline", "plain"] as const;
	const contentBeforeSizes = ["sm", "md", "lg"] as const;

	interface Props {
		story:
			| "basic"
			| "sizes"
			| "variants"
			| "contentBefore"
			| "alternating"
			| "colours";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<Timeline.Root class="max-w-100">
		<Timeline.Item>
			<Timeline.Connector>
				<Icon as={Boat} />
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
				<Icon as={Check} />
			</Timeline.Connector>
			<Timeline.Content>
				<Timeline.Title>Order Confirmed</Timeline.Title>
				<Timeline.Description>18th May 2021</Timeline.Description>
			</Timeline.Content>
		</Timeline.Item>

		<Timeline.Item>
			<Timeline.Connector>
				<Icon as={Package} />
			</Timeline.Connector>
			<Timeline.Content>
				<Timeline.Title>Order Delivered</Timeline.Title>
				<Timeline.Description
					>20th May 2021, 10:30am</Timeline.Description
				>
			</Timeline.Content>
		</Timeline.Item>
	</Timeline.Root>
{:else if story === "sizes"}
	<VStack gap={8}>
		{#each timelineSizes as size}
			<VStack gap={2}>
				<Text size="xs" class="capitalize text-fg-muted">{size}</Text>
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
							<Icon as={Check} />
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
{:else if story === "variants"}
	<VStack gap={16}>
		{#each timelineVariants as variant}
			<VStack gap={2}>
				<Text size="xs" class="capitalize text-fg-muted">{variant}</Text
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
							<Icon as={Check} />
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
{:else if story === "contentBefore"}
	<VStack gap={8}>
		{#each contentBeforeSizes as size}
			<VStack gap={2}>
				<Text size="xs" class="capitalize text-fg-muted">{size}</Text>
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
{:else if story === "alternating"}
	<Timeline.Root size="md" variant="outline" class="max-w-125">
		<Timeline.Item>
			<Timeline.Content flex={1} alignItems="flex-end">
				<Timeline.Description>Jan 2020</Timeline.Description>
			</Timeline.Content>
			<Timeline.Connector>
				<Icon as={Check} />
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
				<Icon as={Check} />
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
				<Icon as={Check} />
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
				<Icon as={Package} />
			</Timeline.Connector>
			<Timeline.Content flex={1}>
				<Timeline.Description>Dec 2024</Timeline.Description>
			</Timeline.Content>
		</Timeline.Item>
	</Timeline.Root>
{:else if story === "colours"}
	<VStack gap={8}>
		{#each colours as colour}
			<HStack gap={4} class="items-start">
				<Text size="xs" class="w-16 pt-1">{colour}</Text>
				<Timeline.Root {colour} variant="solid">
					<Timeline.Item>
						<Timeline.Connector>
							<Icon as={Check} />
						</Timeline.Connector>
						<Timeline.Content>
							<Timeline.Title>Task completed</Timeline.Title>
							<Timeline.Description>Just now</Timeline.Description
							>
						</Timeline.Content>
					</Timeline.Item>
					<Timeline.Item>
						<Timeline.Connector>
							<Icon as={Package} />
						</Timeline.Connector>
						<Timeline.Content>
							<Timeline.Title>Package shipped</Timeline.Title>
							<Timeline.Description
								>2 hours ago</Timeline.Description
							>
						</Timeline.Content>
					</Timeline.Item>
				</Timeline.Root>
			</HStack>
		{/each}
	</VStack>
{/if}
