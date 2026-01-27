<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Popover } from "$saas/components/popover";
	import { Button } from "$saas/components/button";
	import { Input } from "$saas/components/input";
	import { Textarea } from "$saas/components/textarea";
	import { Field } from "$saas/components/field";
	import { Text } from "$saas/typography/text";
	import { VStack, HStack } from "$saas/layout/stack";
	import { Box } from "$saas/layout/box";
	import { getControls, popoverSizes } from "../utils";

	const { Story } = defineMeta({
		title: "components/Popover",
		component: Popover.Root,
		argTypes: {
			size: {
				control: "select",
				options: popoverSizes,
				description: "The size of the popover.",
				table: { defaultValue: { summary: "md" } },
			},
			open: {
				control: "boolean",
				description: "Whether the popover is open.",
			},
			autoFocus: {
				control: "boolean",
				description:
					"Whether to auto-focus the first focusable element.",
				table: { defaultValue: { summary: "true" } },
			},
			closeOnEscape: {
				control: "boolean",
				description: "Whether to close on escape key.",
				table: { defaultValue: { summary: "true" } },
			},
			closeOnInteractOutside: {
				control: "boolean",
				description: "Whether to close when clicking outside.",
				table: { defaultValue: { summary: "true" } },
			},
			modal: {
				control: "boolean",
				description: "Whether the popover should be modal.",
				table: { defaultValue: { summary: "false" } },
			},
			lazyMount: {
				control: "boolean",
				description: "Whether to enable lazy mounting.",
				table: { defaultValue: { summary: "false" } },
			},
			unmountOnExit: {
				control: "boolean",
				description: "Whether to unmount on exit.",
				table: { defaultValue: { summary: "false" } },
			},
		},
		parameters: {
			controls: getControls([
				"size",
				"open",
				"autoFocus",
				"closeOnEscape",
				"closeOnInteractOutside",
				"modal",
				"lazyMount",
				"unmountOnExit",
			]),
		},
		args: {
			size: "md",
		},
	});
</script>

<script lang="ts">
	let controlledOpen = $state(false);
	let inputRef = $state<HTMLInputElement | null>(null);
</script>

{#snippet basicStory(args: any)}
	<Popover.Root {...args}>
		<Popover.Trigger triggerText="Click me" />
		<Popover.Content>
			<Popover.Arrow />
			<Popover.Body>
				<Popover.Title>Naruto Form</Popover.Title>
				<Text size="sm" class="my-4">
					Naruto is a Japanese manga series written and illustrated by
					Masashi Kishimoto.
				</Text>
				<Input placeholder="Your fav. character" size="sm" />
			</Popover.Body>
		</Popover.Content>
	</Popover.Root>
{/snippet}

{#snippet controlledStory()}
	<HStack gap={4} align="center">
		<Popover.Root bind:open={controlledOpen}>
			<Popover.Trigger triggerText="Click me" />
			<Popover.Content>
				<Popover.Arrow />
				<Popover.Body>
					This is a controlled popover. Use the button to toggle.
				</Popover.Body>
			</Popover.Content>
		</Popover.Root>
		<Text size="sm" class="text-fg-muted">Open: {controlledOpen}</Text>
	</HStack>
{/snippet}

{#snippet sizesStory()}
	<HStack gap={10} align="center">
		{#each popoverSizes as size}
			<Popover.Root {size}>
				<Popover.Trigger
					triggerText="Size: {size}"
					triggerSize={size}
				/>
				<Popover.Content>
					<Popover.Arrow />
					<Popover.Body>
						<Popover.Title>Naruto Form</Popover.Title>
						<Text size="sm" class="my-4">
							Naruto is a Japanese manga series written and
							illustrated by Masashi Kishimoto.
						</Text>
						<Input placeholder="Your fav. character" {size} />
					</Popover.Body>
				</Popover.Content>
			</Popover.Root>
		{/each}
	</HStack>
{/snippet}

{#snippet lazyMountedStory()}
	<Popover.Root lazyMount unmountOnExit>
		<Popover.Trigger triggerText="Click me" />
		<Popover.Content>
			<Popover.Arrow />
			<Popover.Body>
				<Popover.Title>Lazy Mounted</Popover.Title>
				<Text size="sm" class="my-4">
					This popover content is lazily mounted and unmounts when
					closed.
				</Text>
			</Popover.Body>
		</Popover.Content>
	</Popover.Root>
{/snippet}

{#snippet placementStory()}
	<Popover.Root positioning={{ placement: "bottom-end" }}>
		<Popover.Trigger triggerText="Bottom End" />
		<Popover.Content>
			<Popover.Arrow />
			<Popover.Body>
				This popover is positioned at the bottom-end of the trigger.
			</Popover.Body>
		</Popover.Content>
	</Popover.Root>
{/snippet}

{#snippet offsetStory()}
	<Popover.Root positioning={{ offset: { crossAxis: 0, mainAxis: 7 } }}>
		<Popover.Trigger triggerText="Click me" />
		<Popover.Content>
			<Popover.Body>
				This popover has a custom offset from the trigger.
			</Popover.Body>
		</Popover.Content>
	</Popover.Root>
{/snippet}

{#snippet sameWidthStory()}
	<Popover.Root positioning={{ sameWidth: true }}>
		<Popover.Trigger triggerText="Click me" triggerClass="min-w-xs" />
		<Popover.Content class="w-auto!">
			<Popover.Arrow />
			<Popover.Body>
				This popover has the same width as the trigger button.
			</Popover.Body>
		</Popover.Content>
	</Popover.Root>
{/snippet}

{#snippet nestedStory()}
	<Popover.Root>
		<Popover.Trigger triggerText="Click me" />
		<Popover.Content>
			<Popover.Arrow />
			<Popover.Body>
				<Text size="sm" class="mb-4">
					Naruto is a Japanese manga series written and illustrated by
					Masashi Kishimoto.
				</Text>

				<Popover.Root
					portalled={false}
					positioning={{ placement: "bottom" }}
				>
					<Popover.Trigger
						triggerText="Open Nested Popover"
						triggerSize="xs"
					/>
					<Popover.Content>
						<Popover.Arrow />
						<Popover.Body>Some nested popover content</Popover.Body>
					</Popover.Content>
				</Popover.Root>
			</Popover.Body>
		</Popover.Content>
	</Popover.Root>
{/snippet}

{#snippet initialFocusStory()}
	<Popover.Root initialFocusEl={() => inputRef}>
		<Popover.Trigger triggerText="Click me" />
		<Popover.Content>
			<Popover.Header>
				<Popover.Title>Manage Your Channels</Popover.Title>
			</Popover.Header>
			<Popover.Arrow />
			<Popover.Body>
				<Text size="sm" class="mb-4">
					The input below will be focused when the popover opens.
				</Text>
				<Input
					bind:ref={inputRef}
					placeholder="I get focused"
					size="sm"
				/>
			</Popover.Body>
			<Popover.Footer>
				<Box class="text-sm flex-1">Step 2 of 4</Box>
				<HStack gap={2}>
					<Button size="sm" variant="ghost">Prev</Button>
					<Button size="sm">Next</Button>
				</HStack>
			</Popover.Footer>
			<Popover.CloseTrigger />
		</Popover.Content>
	</Popover.Root>
{/snippet}

{#snippet formStory()}
	<Popover.Root size="lg">
		<Popover.Trigger triggerText="Click me" />
		<Popover.Content class="rounded-xl" style="width: 320px;">
			<Popover.Arrow />
			<Popover.Body>
				<VStack gap={4}>
					<Field.Root>
						<Field.Label>Width</Field.Label>
						<Input placeholder="40px" size="sm" />
					</Field.Root>
					<Field.Root>
						<Field.Label>Height</Field.Label>
						<Input placeholder="32px" size="sm" />
					</Field.Root>
					<Field.Root>
						<Field.Label>Comments</Field.Label>
						<Textarea placeholder="Start typing..." size="sm" />
					</Field.Root>
				</VStack>
			</Popover.Body>
			<Popover.CloseTrigger />
		</Popover.Content>
	</Popover.Root>
{/snippet}

{#snippet withHeaderFooterStory()}
	<Popover.Root>
		<Popover.Trigger triggerText="Click me" />
		<Popover.Content>
			<Popover.Header>
				<Popover.Title>Confirmation</Popover.Title>
			</Popover.Header>
			<Popover.Arrow />
			<Popover.Body>
				<Text size="sm">
					Are you sure you want to delete this item? This action
					cannot be undone.
				</Text>
			</Popover.Body>
			<Popover.Footer>
				<HStack gap={2} class="ml-auto">
					<Popover.CloseTrigger buttonText="Cancel" />
					<Button size="sm" colour="red">Delete</Button>
				</HStack>
			</Popover.Footer>
			<Popover.CloseTrigger />
		</Popover.Content>
	</Popover.Root>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Controlled" template={controlledStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="LazyMounted" template={lazyMountedStory} />

<Story name="Placement" template={placementStory} />

<Story name="Offset" template={offsetStory} />

<Story name="SameWidth" template={sameWidthStory} />

<Story name="Nested" template={nestedStory} />

<Story name="InitialFocus" template={initialFocusStory} />

<Story name="Form" template={formStory} />

<Story name="WithHeaderFooter" template={withHeaderFooterStory} />
