<script lang="ts" module>
	// Wrapper components for complex Dialog stories
	// These are imported by Dialog.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { Dialog } from "$saas/components/dialog";
	import { Button } from "$saas/components/button";
	import { Input } from "$saas/components/input";
	import { Stack, VStack, HStack } from "$saas/layout/stack";
	import { DataList } from "$saas/components/data-list";
	import { Badge } from "$saas/components/badge";
	import { Avatar } from "$saas/components/avatar";
	import { Textarea } from "$saas/components/textarea";
	import { Text } from "$saas/typography/text";

	const focusClass =
		"focus-visible:outline-1 focus-visible:outline-fg-default focus-visible:outline-offset-2";

	class FocusState {
		inputRef = $state<HTMLInputElement | null>(null);
	}

	interface Props {
		story:
			| "basic"
			| "sizes"
			| "cover"
			| "initialFocus"
			| "insideScroll"
			| "outsideScroll"
			| "motionPreset"
			| "alertDialog"
			| "withDataList";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<Dialog.Root>
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
{:else if story === "sizes"}
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
{:else if story === "cover"}
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
{:else if story === "initialFocus"}
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
{:else if story === "insideScroll"}
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
{:else if story === "outsideScroll"}
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
{:else if story === "motionPreset"}
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
{:else if story === "alertDialog"}
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
{:else if story === "withDataList"}
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
{/if}
