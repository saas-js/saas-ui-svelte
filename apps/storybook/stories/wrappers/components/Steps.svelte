<script lang="ts" module>
	// Wrapper components for complex Steps stories
	// These are imported by Steps.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { Steps } from "$saas/components/steps";
	import { Stack, VStack, HStack } from "$saas/layout/stack";
	import { Group } from "$saas/layout/group";
	import { Text } from "$saas/typography/text";
	import User from "phosphor-svelte/lib/User";
	import Wallet from "phosphor-svelte/lib/Wallet";
	import CalendarBlank from "phosphor-svelte/lib/CalendarBlank";
	import { colours, stepsSizes } from "../../utils";

	interface Props {
		story:
			| "basic"
			| "sizes"
			| "variants"
			| "colours"
			| "vertical"
			| "icon"
			| "description";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<Steps.Root defaultStep={1} count={3}>
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
{:else if story === "sizes"}
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
{:else if story === "variants"}
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
{:else if story === "colours"}
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
{:else if story === "vertical"}
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
{:else if story === "icon"}
	<Steps.Root defaultStep={1} count={3}>
		<Steps.List>
			<Steps.Item index={0} icon={User} aria-label="Contact Details" />
			<Steps.Item index={1} icon={Wallet} aria-label="Payment" />
			<Steps.Item
				index={2}
				icon={CalendarBlank}
				aria-label="Appointment"
			/>
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
{:else if story === "description"}
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
{/if}
