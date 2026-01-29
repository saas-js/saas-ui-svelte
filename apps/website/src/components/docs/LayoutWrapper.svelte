<script lang="ts">
	import { Alert } from "@saas-ui/svelte/components/alert";
	import { Text } from "@saas-ui/svelte/typography/text";
	import AspectRatioWrapper from "$wrappers/layout/AspectRatio.svelte";
	import BleedWrapper from "$wrappers/layout/Bleed.svelte";
	import BoxWrapper from "$wrappers/layout/Box.svelte";
	import CentreWrapper from "$wrappers/layout/Centre.svelte";
	import CircleWrapper from "$wrappers/layout/Circle.svelte";
	import ContainerWrapper from "$wrappers/layout/Container.svelte";
	import FlexWrapper from "$wrappers/layout/Flex.svelte";
	import FloatWrapper from "$wrappers/layout/Float.svelte";
	import GridWrapper from "$wrappers/layout/Grid.svelte";
	import GroupWrapper from "$wrappers/layout/Group.svelte";
	import StackWrapper from "$wrappers/layout/Stack.svelte";

	interface Props {
		component: string;
		story: string;
	}

	let { component, story }: Props = $props();

	const wrappers: Record<string, any> = {
		AspectRatio: AspectRatioWrapper,
		Bleed: BleedWrapper,
		Box: BoxWrapper,
		Centre: CentreWrapper,
		Circle: CircleWrapper,
		Container: ContainerWrapper,
		Flex: FlexWrapper,
		Float: FloatWrapper,
		Grid: GridWrapper,
		Group: GroupWrapper,
		Stack: StackWrapper,
	};

	const WrapperComponent = $derived(wrappers[component]);
</script>

{#if WrapperComponent}
	<WrapperComponent {story} />
{:else}
	<Alert status="error" title="Component wrapper not found">
		<Text size="sm">Unable to find wrapper for layout component: {component}</Text>
	</Alert>
{/if}
