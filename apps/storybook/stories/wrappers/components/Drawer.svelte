<script lang="ts" module>
	// Wrapper components for complex Drawer stories
	// These are imported by Drawer.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { Drawer } from "$saas/components/drawer";
	import { Button } from "$saas/components/button";
	import { Input } from "$saas/components/input";
	import { Stack, HStack } from "$saas/layout/stack";
	import { Kbd } from "$saas/components/kbd";

	const focusClass =
		"focus-visible:outline-1 focus-visible:outline-fg-default focus-visible:outline-offset-2";

	class FocusState {
		inputRef = $state<HTMLInputElement | null>(null);
	}

	interface Props {
		story:
			| "basic"
			| "attached"
			| "sizes"
			| "offset"
			| "placement"
			| "initialFocus";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<Drawer.Root>
		<Drawer.Trigger variant="outline" size="sm">Open Drawer</Drawer.Trigger>
		<Drawer.Content>
			<Drawer.Header>
				<Drawer.Title>Drawer Title</Drawer.Title>
				<Drawer.CloseButton />
			</Drawer.Header>
			<Drawer.Body>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
					do eiusmod tempor incididunt ut labore et dolore magna
					aliqua.
				</p>
				<p class="text-fg-muted mt-4">
					Press the <Kbd>esc</Kbd> key to close the drawer.
				</p>
			</Drawer.Body>
			<Drawer.Footer>
				<Drawer.ActionTrigger variant="ghost"
					>Cancel</Drawer.ActionTrigger
				>
				<Button variant="glass" colour="indigo" class={focusClass}
					>Save</Button
				>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{:else if story === "attached"}
	<Drawer.Root attached>
		<Drawer.Trigger variant="outline" size="sm">Open Drawer</Drawer.Trigger>
		<Drawer.Content>
			<Drawer.Header>
				<Drawer.Title>Drawer Title</Drawer.Title>
				<Drawer.CloseButton />
			</Drawer.Header>
			<Drawer.Body>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
					do eiusmod tempor incididunt ut labore et dolore magna
					aliqua.
				</p>
			</Drawer.Body>
			<Drawer.Footer>
				<Drawer.ActionTrigger variant="ghost"
					>Cancel</Drawer.ActionTrigger
				>
				<Button variant="glass" colour="indigo" class={focusClass}
					>Save</Button
				>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{:else if story === "sizes"}
	<HStack align="start" gap={6} wrap="wrap">
		{#each ["xs", "sm", "md", "lg", "xl", "full"] as const as size}
			<Drawer.Root {size}>
				<Drawer.Trigger variant="outline" size="sm">
					Open ({size})
				</Drawer.Trigger>
				<Drawer.Content>
					<Drawer.Header>
						<Drawer.Title>Drawer Title</Drawer.Title>
						<Drawer.CloseButton />
					</Drawer.Header>
					<Drawer.Body>
						Press the <Kbd>esc</Kbd> key to close the drawer.
					</Drawer.Body>
					<Drawer.Footer>
						<Drawer.ActionTrigger variant="ghost"
							>Cancel</Drawer.ActionTrigger
						>
						<Button
							variant="glass"
							colour="indigo"
							class={focusClass}>Save</Button
						>
					</Drawer.Footer>
				</Drawer.Content>
			</Drawer.Root>
		{/each}
	</HStack>
{:else if story === "offset"}
	<Drawer.Root>
		<Drawer.Trigger variant="outline" size="sm">Open Drawer</Drawer.Trigger>
		<Drawer.Content offset="1rem" rounded="rounded-md">
			<Drawer.Header>
				<Drawer.Title>Drawer Title</Drawer.Title>
				<Drawer.CloseButton />
			</Drawer.Header>
			<Drawer.Body>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
					do eiusmod tempor incididunt ut labore et dolore magna
					aliqua.
				</p>
			</Drawer.Body>
			<Drawer.Footer>
				<Drawer.ActionTrigger variant="ghost"
					>Cancel</Drawer.ActionTrigger
				>
				<Button variant="glass" colour="indigo" class={focusClass}
					>Save</Button
				>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{:else if story === "placement"}
	<HStack align="start" gap={6} wrap="wrap">
		{#each ["bottom", "top", "start", "end"] as const as placement}
			<Drawer.Root {placement}>
				<Drawer.Trigger variant="outline" size="sm">
					Open ({placement})
				</Drawer.Trigger>
				<Drawer.Content
					rounded={placement === "bottom"
						? "rounded-t-lg"
						: placement === "top"
							? "rounded-b-lg"
							: undefined}
				>
					<Drawer.Header>
						<Drawer.Title>Drawer Title</Drawer.Title>
						<Drawer.CloseButton />
					</Drawer.Header>
					<Drawer.Body>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua.
						</p>
					</Drawer.Body>
					<Drawer.Footer>
						<Drawer.ActionTrigger variant="ghost"
							>Cancel</Drawer.ActionTrigger
						>
						<Button
							variant="glass"
							colour="indigo"
							class={focusClass}>Save</Button
						>
					</Drawer.Footer>
				</Drawer.Content>
			</Drawer.Root>
		{/each}
	</HStack>
{:else if story === "initialFocus"}
	{@const state = new FocusState()}
	<Drawer.Root initialFocusEl={() => state.inputRef}>
		<Drawer.Trigger variant="outline" size="sm">Open Drawer</Drawer.Trigger>
		<Drawer.Content>
			<Drawer.Header>
				<Drawer.Title>User Information</Drawer.Title>
				<Drawer.CloseButton />
			</Drawer.Header>
			<Drawer.Body>
				<Stack gap={4}>
					<Input placeholder="First Name" />
					<Input placeholder="Last Name" />
					<Input
						bind:ref={state.inputRef}
						placeholder="Email (Focused First)"
					/>
				</Stack>
			</Drawer.Body>
			<Drawer.Footer>
				<Drawer.ActionTrigger variant="ghost"
					>Cancel</Drawer.ActionTrigger
				>
				<Button variant="glass" colour="indigo" class={focusClass}
					>Save</Button
				>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}
