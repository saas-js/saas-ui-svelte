<script lang="ts">
	import { Alert } from "@saas-ui/svelte/components/alert";
	import { Text } from "@saas-ui/svelte/typography/text";
	import type { ComponentCategory } from "../../lib/stories";

	interface Props {
		component: string;
		story: string;
		category: ComponentCategory;
	}

	let { component, story, category }: Props = $props();

	// Dynamically import all wrapper components using import.meta.glob
	const componentWrappers = import.meta.glob("$wrappers/components/*.svelte", { eager: true });
	const layoutWrappers = import.meta.glob("$wrappers/layout/*.svelte", { eager: true });
	const typographyWrappers = import.meta.glob("$wrappers/typography/*.svelte", { eager: true });
	const utilitiesWrappers = import.meta.glob("$wrappers/utilities/*.svelte", { eager: true });

	const wrappersByCategory: Record<ComponentCategory, Record<string, unknown>> = {
		components: componentWrappers,
		layout: layoutWrappers,
		typography: typographyWrappers,
		utilities: utilitiesWrappers,
	};

	function getWrapper(category: ComponentCategory, componentName: string): any {
		const wrappers = wrappersByCategory[category];
		// Match the component name to the wrapper file path
		const key = Object.keys(wrappers).find(
			(k) => k.endsWith(`/${componentName}.svelte`)
		);
		if (key) {
			return (wrappers[key] as { default: any }).default;
		}
		return null;
	}

	const WrapperComponent = $derived(getWrapper(category, component));
</script>

{#if WrapperComponent}
	<WrapperComponent {story} />
{:else}
	<Alert status="error" title="Component wrapper not found">
		<Text size="sm">Unable to find wrapper for {category} component: {component}</Text>
	</Alert>
{/if}
