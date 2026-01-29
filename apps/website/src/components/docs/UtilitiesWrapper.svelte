<script lang="ts">
	import { Alert } from "@saas-ui/svelte/components/alert";
	import { Text } from "@saas-ui/svelte/typography/text";
	import FormatByteWrapper from "$wrappers/utilities/FormatByte.svelte";
	import FormatNumberWrapper from "$wrappers/utilities/FormatNumber.svelte";
	import LocaleProviderWrapper from "$wrappers/utilities/LocaleProvider.svelte";
	import PortalWrapper from "$wrappers/utilities/Portal.svelte";
	import VisuallyHiddenWrapper from "$wrappers/utilities/VisuallyHidden.svelte";

	interface Props {
		component: string;
		story: string;
	}

	let { component, story }: Props = $props();

	const wrappers: Record<string, any> = {
		FormatByte: FormatByteWrapper,
		FormatNumber: FormatNumberWrapper,
		LocaleProvider: LocaleProviderWrapper,
		Portal: PortalWrapper,
		VisuallyHidden: VisuallyHiddenWrapper,
	};

	const WrapperComponent = $derived(wrappers[component]);
</script>

{#if WrapperComponent}
	<WrapperComponent {story} />
{:else}
	<Alert status="error" title="Component wrapper not found">
		<Text size="sm">Unable to find wrapper for utility component: {component}</Text>
	</Alert>
{/if}
