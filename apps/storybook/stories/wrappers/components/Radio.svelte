<script lang="ts" module>
	// Wrapper components for complex Radio stories
	// These are imported by Radio.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { Radio } from "$saas/components/radio";
	import { Stack, HStack, VStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import { colours, radioVariants, radioSizes } from "../../utils";

	interface Props {
		story:
			| "basic"
			| "controlled"
			| "colours"
			| "sizes"
			| "variants"
			| "disabled"
			| "orientation"
			| "withLabel"
			| "composition";
	}

	let { story }: Props = $props();

	// State for controlled story
	let controlledValue = $state("1");
</script>

{#if story === "basic"}
	<Radio.Group defaultValue="1">
		<HStack gap={6}>
			<Radio.Item value="1" label="Option 1" />
			<Radio.Item value="2" label="Option 2" />
			<Radio.Item value="3" label="Option 3" />
		</HStack>
	</Radio.Group>
{:else if story === "controlled"}
	<VStack gap={4} align="start">
		<Text size="sm" class="text-fg-muted">
			Selected: {controlledValue}
		</Text>
		<Radio.Group
			bind:value={controlledValue}
			onValueChange={({ value }) => (controlledValue = value ?? "1")}
		>
			<HStack gap={6}>
				<Radio.Item value="1" label="Option 1" />
				<Radio.Item value="2" label="Option 2" />
				<Radio.Item value="3" label="Option 3" />
			</HStack>
		</Radio.Group>
	</VStack>
{:else if story === "colours"}
	<VStack align="start" gap={4}>
		{#each colours as colour}
			<HStack align="center" gap={6} class="w-full">
				<Text size="xs" class="min-w-[8ch]">
					{colour}
				</Text>
				<HStack gap={6}>
					{#each radioVariants as variant}
						<Radio.Group {colour} {variant} defaultValue="checked">
							<HStack gap={4}>
								<Radio.Item value="checked" label={variant} />
							</HStack>
						</Radio.Group>
					{/each}
				</HStack>
			</HStack>
		{/each}
	</VStack>
{:else if story === "sizes"}
	<HStack align="start" gap={4}>
		{#each radioSizes as size}
			<Radio.Group {size} defaultValue="react">
				<Radio.Item value="react" label="Radio ({size})" />
			</Radio.Group>
		{/each}
	</HStack>
{:else if story === "variants"}
	<VStack gap={4}>
		{#each radioVariants as variant}
			<Radio.Group {variant} defaultValue="react" colour="teal">
				<HStack gap={4}>
					<Radio.Item
						value="react"
						class="min-w-32"
						label="Radio ({variant})"
					/>
				</HStack>
			</Radio.Group>
		{/each}
	</VStack>
{:else if story === "disabled"}
	<Radio.Group defaultValue="2">
		<HStack gap={6}>
			<Radio.Item value="1" disabled label="Option 1" />
			<Radio.Item value="2" label="Option 2" />
			<Radio.Item value="3" label="Option 3" />
		</HStack>
	</Radio.Group>
{:else if story === "orientation"}
	<HStack gap={12} align="start">
		<VStack gap={2}>
			<Text size="xs" class="text-fg-muted">Horizontal</Text>
			<Radio.Group orientation="horizontal" defaultValue="1">
				<HStack gap={6}>
					<Radio.Item value="1" label="Option 1" />
					<Radio.Item value="2" label="Option 2" />
					<Radio.Item value="3" label="Option 3" />
				</HStack>
			</Radio.Group>
		</VStack>
		<VStack gap={2}>
			<Text size="xs" class="text-fg-muted">Vertical</Text>
			<Radio.Group orientation="vertical" defaultValue="1">
				<VStack gap={2}>
					<Radio.Item value="1" label="Option 1" />
					<Radio.Item value="2" label="Option 2" />
					<Radio.Item value="3" label="Option 3" />
				</VStack>
			</Radio.Group>
		</VStack>
	</HStack>
{:else if story === "withLabel"}
	<Radio.Group defaultValue="react">
		<Radio.Label>Select framework</Radio.Label>
		<VStack gap={2}>
			<Radio.Item value="react" label="React" />
			<Radio.Item value="svelte" label="Svelte" />
			<Radio.Item value="vue" label="Vue" />
			<Radio.Item value="angular" label="Angular" />
		</VStack>
	</Radio.Group>
{:else if story === "composition"}
	<Radio.Group defaultValue="react">
		<Radio.Label>Choose your option</Radio.Label>
		<VStack gap={2}>
			<Radio.Item value="react">
				{#snippet children()}
					<Radio.ItemControl>
						<Radio.Indicator />
					</Radio.ItemControl>
					<Radio.ItemText>
						<VStack gap={0}>
							<Text as="span" class="text-fg-default">React</Text>
							<Text
								as="span"
								size="xs"
								class="text-fg-muted font-normal"
							>
								A JavaScript library for building user
								interfaces
							</Text>
						</VStack>
					</Radio.ItemText>
					<Radio.ItemHiddenInput />
				{/snippet}
			</Radio.Item>
			<Radio.Item value="svelte">
				{#snippet children()}
					<Radio.ItemControl>
						<Radio.Indicator />
					</Radio.ItemControl>
					<Radio.ItemText>
						<VStack gap={0}>
							<Text as="span" class="text-fg-default">Svelte</Text
							>
							<Text
								as="span"
								size="xs"
								class="text-fg-muted font-normal"
							>
								Cybernetically enhanced web apps
							</Text>
						</VStack>
					</Radio.ItemText>
					<Radio.ItemHiddenInput />
				{/snippet}
			</Radio.Item>
		</VStack>
	</Radio.Group>
{/if}
