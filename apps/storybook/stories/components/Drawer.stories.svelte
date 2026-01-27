<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Drawer } from "$saas/components/drawer";
	import { Button } from "$saas/components/button";
	import { Input } from "$saas/components/input";
	import { Stack, VStack, HStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import { Kbd } from "$saas/components/kbd";

	import {
		commonArgTypes,
		getControls,
		drawerSizes,
		drawerPlacements,
		dialogRoles,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Drawer",
		component: Drawer.Root,
		argTypes: {
			open: {
				control: "boolean",
			},
			size: {
				...commonArgTypes.size,
				options: drawerSizes,
			},
			placement: {
				control: "select",
				options: drawerPlacements,
				table: { defaultValue: { summary: "end" } },
			},
			attached: {
				control: "boolean",
				description:
					"Whether the drawer is attached to the edge of the viewport.",
				table: { defaultValue: { summary: "false" } },
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
				"attached",
				"role",
				"children",
				"class",
			]),
		},
		args: {
			size: "xs",
			placement: "end",
			attached: false,
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
	<Drawer.Root {...args}>
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
				<p class="mt-4 text-fg-muted">
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
{/snippet}

{#snippet attachedStory()}
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
{/snippet}

{#snippet sizesStory()}
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
{/snippet}

{#snippet offsetStory()}
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
{/snippet}

{#snippet placementStory()}
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
{/snippet}

{#snippet initialFocusStory()}
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
{/snippet}

<Story name="Basic" template={basicStory} />
<Story name="Attached" template={attachedStory} />
<Story name="Sizes" template={sizesStory} />
<Story name="Offset" template={offsetStory} />
<Story name="Placement" template={placementStory} />
<Story name="Initial Focus" template={initialFocusStory} />
