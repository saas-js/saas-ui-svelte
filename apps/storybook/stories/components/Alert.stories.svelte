<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Alert } from "$saas/components/alert";
	import { Stack } from "$saas/layout/stack";
	import Alarm from "phosphor-svelte/lib/Alarm";
	import {
		commonArgTypes,
		getControls,
		alertVariants,
		alertStatuses,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Alert",
		component: Alert,
		argTypes: {
			status: {
				control: "select",
				options: alertStatuses,
				description: "The status of the alert.",
				table: { defaultValue: { summary: "info" } },
			},
			variant: {
				...commonArgTypes.variant,
				options: alertVariants,
				table: { defaultValue: { summary: "subtle" } },
			},
			colour: commonArgTypes.colour,
			title: {
				control: "text",
				description: "The title of the alert.",
			},
			icon: commonArgTypes.icon,
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"status",
				"variant",
				"colour",
				"title",
				"icon",
				"children",
				"class",
			]),
		},
		args: {
			status: "info",
			variant: "subtle",
			title: "This is the alert title",
		},
	});
</script>

{#snippet basicStory(args: any)}
	<Alert {...args} />
{/snippet}

{#snippet descriptionStory()}
	<Alert status="error" title="Invalid Fields">
		Your form has some errors. Please fix them and try again.
	</Alert>
{/snippet}

{#snippet statusStory()}
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
{/snippet}

{#snippet variantsStory()}
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
{/snippet}

{#snippet customIconStory()}
	<Alert
		status="warning"
		title="Submitting this form will delete your account"
		icon={Alarm}
	/>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Description" template={descriptionStory} />

<Story name="Status" template={statusStory} />

<Story name="Variants" template={variantsStory} />

<Story name="Custom Icon" template={customIconStory} />
