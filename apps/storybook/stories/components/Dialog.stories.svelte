<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Dialog } from "$saas/components/dialog";
	import { Button } from "$saas/components/button";
	import { Input } from "$saas/components/input";
	import { Stack, VStack, HStack } from "$saas/layout/stack";
	import { DataList } from "$saas/components/data-list";
	import { Badge } from "$saas/components/badge";
	import { Avatar } from "$saas/components/avatar";
	import { Textarea } from "$saas/components/textarea";
	import { Text } from "$saas/typography/text";

	import {
		commonArgTypes,
		getControls,
		dialogSizes,
		dialogPlacements,
		dialogScrollBehaviors,
		dialogMotionPresets,
		dialogRoles,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Dialog",
		component: Dialog.Root,
		argTypes: {
			open: {
				control: "boolean",
			},
			size: {
				...commonArgTypes.size,
				options: dialogSizes,
			},
			placement: {
				control: "select",
				options: dialogPlacements,
				table: { defaultValue: { summary: "center" } },
			},
			scrollBehavior: {
				control: "select",
				options: dialogScrollBehaviors,
				table: { defaultValue: { summary: "outside" } },
			},
			motionPreset: {
				control: "select",
				options: dialogMotionPresets,
				table: { defaultValue: { summary: "scale" } },
			},
			role: {
				control: "select",
				options: dialogRoles,
				table: { defaultValue: { summary: "dialog" } },
			},
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"open",
				"size",
				"placement",
				"scrollBehavior",
				"motionPreset",
				"role",
				"children",
				"class",
			]),
		},
		args: {
			size: "md",
			placement: "center",
			scrollBehavior: "outside",
			motionPreset: "scale",
			role: "dialog",
		},
	});

	const focusClass =
		"focus-visible:outline-1 focus-visible:outline-fg-default focus-visible:outline-offset-2";

	class FocusState {
		inputRef = $state<HTMLInputElement | null>(null);
	}
</script>

{#snippet basicStory(args: any)}
	<Dialog.Root {...args}>
		<Dialog.Trigger>Open Dialog</Dialog.Trigger>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Dialog Title</Dialog.Title>
				<Dialog.CloseButton />
			</Dialog.Header>
			<Dialog.Body>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
					do eiusmod tempor incididunt ut labore et dolore magna
					aliqua.
				</p>
			</Dialog.Body>
			<Dialog.Footer>
				<Dialog.ActionTrigger>Cancel</Dialog.ActionTrigger>
				<Button variant="glass" colour="indigo" class={focusClass}
					>Save</Button
				>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
{/snippet}

{#snippet sizesStory()}
	<HStack align="start" gap={6}>
		{#each ["xs", "sm", "md", "lg"] as const as size}
			<VStack gap={2} class="items-center">
				<Text size="xs">{size}</Text>
				<Dialog.Root {size}>
					<Dialog.Trigger variant="outline" {size}>
						Open
					</Dialog.Trigger>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>Dialog Title</Dialog.Title>
							<Dialog.CloseButton />
						</Dialog.Header>
						<Dialog.Body>
							<p>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit.
							</p>
						</Dialog.Body>
						<Dialog.Footer>
							<Dialog.ActionTrigger>Cancel</Dialog.ActionTrigger>
							<Button
								variant="glass"
								colour="indigo"
								class={focusClass}>Save</Button
							>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Root>
			</VStack>
		{/each}
	</HStack>
{/snippet}

{#snippet coverStory()}
	<Dialog.Root size="cover" placement="center" motionPreset="slide-in-bottom">
		<Dialog.Trigger>Open Dialog</Dialog.Trigger>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Dialog Title</Dialog.Title>
				<Dialog.CloseButton />
			</Dialog.Header>
			<Dialog.Body>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			</Dialog.Body>
		</Dialog.Content>
	</Dialog.Root>
{/snippet}

{#snippet insideScrollStory()}
	<Dialog.Root scrollBehavior="inside" size="sm">
		<Dialog.Trigger>Inside Scroll</Dialog.Trigger>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>With Inside Scroll</Dialog.Title>
				<Dialog.CloseButton />
			</Dialog.Header>
			<Dialog.Body>
				{#each Array(20) as _}
					<p class="mb-4">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua.
					</p>
				{/each}
			</Dialog.Body>
		</Dialog.Content>
	</Dialog.Root>
{/snippet}

{#snippet outsideScrollStory()}
	<Dialog.Root scrollBehavior="outside" size="sm">
		<Dialog.Trigger>Outside Scroll</Dialog.Trigger>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>With Outside Scroll</Dialog.Title>
				<Dialog.CloseButton />
			</Dialog.Header>
			<Dialog.Body>
				{#each Array(20) as _}
					<p class="mb-4">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua.
					</p>
				{/each}
			</Dialog.Body>
		</Dialog.Content>
	</Dialog.Root>
{/snippet}

{#snippet motionPresetStory()}
	<Dialog.Root motionPreset="slide-in-bottom">
		<Dialog.Trigger>Slide in Bottom</Dialog.Trigger>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Dialog Title</Dialog.Title>
				<Dialog.CloseButton />
			</Dialog.Header>
			<Dialog.Body>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
					do eiusmod tempor incididunt ut labore et dolore magna
					aliqua.
				</p>
			</Dialog.Body>
			<Dialog.Footer>
				<Dialog.ActionTrigger>Cancel</Dialog.ActionTrigger>
				<Button variant="glass" colour="indigo" class={focusClass}
					>Save</Button
				>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
{/snippet}

{#snippet initialFocusStory()}
	{@const state = new FocusState()}
	<Dialog.Root initialFocusEl={() => state.inputRef}>
		<Dialog.Trigger>Open Dialog</Dialog.Trigger>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>User Information</Dialog.Title>
				<Dialog.CloseButton />
			</Dialog.Header>
			<Dialog.Body>
				<Stack gap={4}>
					<Input placeholder="First Name" />
					<Input placeholder="Last Name" />
					<input
						bind:this={state.inputRef}
						placeholder="Email (Focused First)"
					/>
				</Stack>
			</Dialog.Body>
			<Dialog.Footer>
				<Dialog.ActionTrigger>Cancel</Dialog.ActionTrigger>
				<Button variant="glass" colour="indigo" class={focusClass}
					>Save</Button
				>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
{/snippet}

{#snippet alertDialogStory()}
	<Dialog.Root role="alertdialog">
		<Dialog.Trigger>Open Dialog</Dialog.Trigger>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Are you sure?</Dialog.Title>
				<Dialog.CloseButton />
			</Dialog.Header>
			<Dialog.Body>
				<p>
					This action cannot be undone. This will permanently delete
					your account and remove your data from our systems.
				</p>
			</Dialog.Body>
			<Dialog.Footer>
				<Dialog.ActionTrigger>Cancel</Dialog.ActionTrigger>
				<Button variant="glass" colour="red" class={focusClass}
					>Delete</Button
				>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
{/snippet}

{#snippet withDataListStory()}
	<VStack align="start">
		<Dialog.Root>
			<Dialog.Trigger variant="outline">Open Dialog</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>Prepare Chakra V3</Dialog.Title>
					<Dialog.CloseButton />
				</Dialog.Header>
				<Dialog.Body class="pb-8">
					<DataList.Root orientation="horizontal">
						<DataList.Item>
							<DataList.ItemLabel>Status</DataList.ItemLabel>
							<DataList.ItemValue>
								<Badge colour="green">Completed</Badge>
							</DataList.ItemValue>
						</DataList.Item>
						<DataList.Item>
							<DataList.ItemLabel>Assigned to</DataList.ItemLabel>
							<DataList.ItemValue>
								<HStack>
									<Avatar
										size="xs"
										src="https://api.dicebear.com/9.x/shapes/svg?seed=james"
										name="Eelco Wiersma"
									/>
									Eelco Wiersma
								</HStack>
							</DataList.ItemValue>
						</DataList.Item>
						<DataList.Item>
							<DataList.ItemLabel>Due date</DataList.ItemLabel>
							<DataList.ItemValue
								>12th August 2024</DataList.ItemValue
							>
						</DataList.Item>
					</DataList.Root>

					<Textarea placeholder="Add a note" class="mt-8" />
				</Dialog.Body>
			</Dialog.Content>
		</Dialog.Root>
	</VStack>
{/snippet}

<Story name="Basic" template={basicStory} />
<Story name="Sizes" template={sizesStory} />
<Story name="Cover" template={coverStory} />
<Story name="Initial Focus" template={initialFocusStory} />
<Story name="Inside Scroll" template={insideScrollStory} />
<Story name="Outside Scroll" template={outsideScrollStory} />
<Story name="Motion Preset" template={motionPresetStory} />
<Story name="Alert Dialog" template={alertDialogStory} />
<Story name="With Data List" template={withDataListStory} />
