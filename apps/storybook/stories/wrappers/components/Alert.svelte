<script lang="ts" module>
	// Wrapper component for Alert stories
</script>

<script lang="ts">
	import { Alert } from "$saas/components/alert";
	import { Stack, VStack, HStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import Alarm from "phosphor-svelte/lib/Alarm";
	import { colours } from "../../utils";

	interface Props {
		story: "basic" | "description" | "status" | "variants" | "customIcon" | "colours";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<Alert status="info" variant="subtle" title="This is the alert title" />
{:else if story === "description"}
	<Alert status="error" title="Invalid Fields">
		Your form has some errors. Please fix them and try again.
	</Alert>
{:else if story === "status"}
	<Stack gap={2} class="w-full">
		<Alert
			status="error"
			title="There was an error processing your request"
		/>
		<Alert
			status="info"
			title="Chakra is going live on August 30th. Get ready!"
		/>
		<Alert
			status="warning"
			title="Seems your account is about expire, upgrade now"
		/>
		<Alert status="success" title="Data uploaded to the server. Fire on!" />
	</Stack>
{:else if story === "variants"}
	<Stack gap={3} class="w-full">
		<Alert
			status="success"
			variant="subtle"
			title="Data uploaded to the server. Fire on!"
		/>
		<Alert
			status="success"
			variant="solid"
			title="Data uploaded to the server. Fire on!"
		/>
		<Alert
			status="success"
			variant="surface"
			title="Data uploaded to the server. Fire on!"
		/>
		<Alert
			status="success"
			variant="outline"
			title="Data uploaded to the server. Fire on!"
		/>
	</Stack>
{:else if story === "customIcon"}
	<Alert
		status="warning"
		title="Submitting this form will delete your account"
		icon={Alarm}
	/>
{:else if story === "colours"}
	<VStack gap={4} class="w-full">
		{#each colours as colour}
			<HStack gap={4} class="w-full items-center">
				<Text size="xs" class="w-16">{colour}</Text>
				<Alert {colour} variant="subtle" title="Alert with {colour} colour" class="flex-1" />
			</HStack>
		{/each}
	</VStack>
{/if}
