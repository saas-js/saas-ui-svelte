<script lang="ts" module>
	// Wrapper component for Alert stories
</script>

<script lang="ts">
	import { Alert } from "$saas/components/alert";
	import { Stack } from "$saas/layout/stack";
	import Alarm from "phosphor-svelte/lib/Alarm";

	interface Props {
		story: "basic" | "description" | "status" | "variants" | "customIcon";
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
{/if}
