<script lang="ts" module>
	// Wrapper components for complex Toast stories
	// These are imported by Toast.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { Toast, type ToastStatus } from "$saas/components/toast";
	import { HStack } from "$saas/layout/stack";
	import { Button } from "$saas/components/button";
	import ToastStoryWrapper, {
		sharedToaster as toaster,
	} from "../../components/ToastStoryWrapper.svelte";

	interface Props {
		story:
			| "default"
			| "basic"
			| "status"
			| "withAction"
			| "duration"
			| "stacking";
	}

	let { story }: Props = $props();

	let stackCount = $state(0);
</script>

{#if story === "default"}
	<Toast
		status="info"
		title="Toast Title"
		description="This is a toast description."
	/>
{:else if story === "basic"}
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
{:else if story === "status"}
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
						description: "Please wait while we process your request.",
						type: "loading",
					})}
			>
				Loading
			</Button>
		</HStack>
	</ToastStoryWrapper>
{:else if story === "withAction"}
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
{:else if story === "duration"}
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
{:else if story === "stacking"}
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
{/if}
