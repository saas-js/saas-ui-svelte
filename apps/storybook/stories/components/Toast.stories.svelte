<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Toast, type ToastStatus } from "$saas/components/toast";
	import { HStack } from "$saas/layout/stack";
	import { Button } from "$saas/components/button";
	import { commonArgTypes, getControls, toastStatuses } from "../utils";
	import ToastStoryWrapper, {
		sharedToaster as toaster,
	} from "./ToastStoryWrapper.svelte";

	const { Story } = defineMeta({
		title: "components/Toast",
		component: Toast,
		argTypes: {
			status: {
				control: "select",
				options: toastStatuses,
				description: "The status of the toast.",
				table: { defaultValue: { summary: "info" } },
			},
			title: {
				control: "text",
				description: "The title of the toast.",
			},
			description: {
				control: "text",
				description: "The description of the toast.",
			},
			icon: commonArgTypes.icon,
			closable: {
				control: "boolean",
				description: "Whether to show the close button.",
				table: { defaultValue: { summary: "true" } },
			},
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"status",
				"title",
				"description",
				"icon",
				"closable",
				"class",
			]),
		},
		args: {
			status: "info",
			title: "Toast Title",
			description: "This is a toast description.",
		},
	});

	let stackCount = $state(0);
</script>

{#snippet defaultStory(args: any)}
	<Toast {...args} />
{/snippet}

{#snippet basicStory()}
	<ToastStoryWrapper>
		<Button
			onclick={() =>
				toaster.create({
					description: "This is a toast notification.",
					type: "info",
				})}
		>
			Show Toast
		</Button>
	</ToastStoryWrapper>
{/snippet}

{#snippet statusStory()}
	<ToastStoryWrapper>
		<HStack gap={2} class="flex-wrap">
			<Button
				colour="blue"
				onclick={() =>
					toaster.create({
						description: "Here is some useful information.",
						type: "info",
					})}
			>
				Info
			</Button>
			<Button
				colour="green"
				onclick={() =>
					toaster.create({
						description: "Your changes have been saved.",
						type: "success",
					})}
			>
				Success
			</Button>
			<Button
				colour="orange"
				onclick={() =>
					toaster.create({
						description: "This action cannot be undone.",
						type: "warning",
					})}
			>
				Warning
			</Button>
			<Button
				colour="red"
				onclick={() =>
					toaster.create({
						description: "Something went wrong. Please try again.",
						type: "error",
					})}
			>
				Error
			</Button>
			<Button
				colour="gray"
				onclick={() =>
					toaster.create({
						description:
							"Please wait while we process your request.",
						type: "loading",
					})}
			>
				Loading
			</Button>
		</HStack>
	</ToastStoryWrapper>
{/snippet}

{#snippet actionStory()}
	<ToastStoryWrapper>
		<Button
			onclick={() =>
				toaster.create({
					title: "Update successful",
					description: "File saved successfully to the server",
					type: "success",
					action: {
						label: "Undo",
						onClick: () => console.log("Undo clicked"),
					},
				})}
		>
			Show Toast with Action
		</Button>
	</ToastStoryWrapper>
{/snippet}

{#snippet durationStory()}
	<ToastStoryWrapper>
		<HStack gap={2} class="flex-wrap">
			<Button
				onclick={() =>
					toaster.create({
						description: "This will disappear quickly.",
						type: "info",
						duration: 1000,
					})}
			>
				1 Second
			</Button>
			<Button
				onclick={() =>
					toaster.create({
						description: "This uses the default duration.",
						type: "info",
						duration: 5000,
					})}
			>
				5 Seconds
			</Button>
			<Button
				onclick={() =>
					toaster.create({
						description: "This will stay until dismissed.",
						type: "info",
						duration: Infinity,
					})}
			>
				Persistent
			</Button>
		</HStack>
	</ToastStoryWrapper>
{/snippet}

{#snippet stackingStory()}
	<ToastStoryWrapper>
		<HStack gap={2} class="flex-wrap">
			<Button
				onclick={() => {
					stackCount++;
					toaster.create({
						description: "File saved successfully",
						type: ["info", "success", "warning", "error"][
							stackCount % 4
						] as ToastStatus,
						duration: 10000,
					});
				}}
			>
				Add Toast
			</Button>
			<Button
				variant="outline"
				onclick={() => {
					for (let i = 0; i < 5; i++) {
						setTimeout(() => {
							stackCount++;
							toaster.create({
								description: "File saved successfully",
								type: ["info", "success", "warning", "error"][
									stackCount % 4
								] as ToastStatus,
								duration: 15000,
							});
						}, i * 100);
					}
				}}
			>
				Add 5 Toasts
			</Button>
		</HStack>
	</ToastStoryWrapper>
{/snippet}

<Story name="Default" template={defaultStory} />

<Story name="Basic" template={basicStory} />

<Story name="Status" template={statusStory} />

<Story name="With Action" template={actionStory} />

<Story name="Duration" template={durationStory} />

<Story name="Stacking" template={stackingStory} />
