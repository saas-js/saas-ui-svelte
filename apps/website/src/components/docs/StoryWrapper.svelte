<script lang="ts">
import { Alert } from "@saas-ui/svelte/components/alert";
import { Text } from "@saas-ui/svelte/typography/text";
import { Spinner } from "@saas-ui/svelte/components/spinner";
import type { ComponentCategory } from "../../lib/stories";

interface Props {
	component: string;
	story: string;
	category: ComponentCategory;
}

let { component, story, category }: Props = $props();

// Dynamically import wrapper components lazily (not eager) to reduce bundle size
const componentWrappers = import.meta.glob<{ default: any }>(
	"$wrappers/components/*.svelte",
);
const layoutWrappers = import.meta.glob<{ default: any }>(
	"$wrappers/layout/*.svelte",
);
const typographyWrappers = import.meta.glob<{ default: any }>(
	"$wrappers/typography/*.svelte",
);
const utilitiesWrappers = import.meta.glob<{ default: any }>(
	"$wrappers/utilities/*.svelte",
);

const wrappersByCategory: Record<
	ComponentCategory,
	Record<string, () => Promise<{ default: any }>>
> = {
	components: componentWrappers,
	layout: layoutWrappers,
	typography: typographyWrappers,
	utilities: utilitiesWrappers,
};

async function loadWrapper(
	category: ComponentCategory,
	componentName: string,
): Promise<any> {
	const wrappers = wrappersByCategory[category];
	const key = Object.keys(wrappers).find((k) =>
		k.endsWith(`/${componentName}.svelte`),
	);
	if (key) {
		const module = await wrappers[key]();
		return module.default;
	}
	return null;
}

const wrapperPromise = $derived(loadWrapper(category, component));
</script>

{#await wrapperPromise}
	<Spinner size="md" />
{:then WrapperComponent}
	{#if WrapperComponent}
		<WrapperComponent {story} />
	{:else}
		<Alert status="error" title="Component wrapper not found">
			<Text size="sm"
				>Unable to find wrapper for {category} component: {component}</Text
			>
		</Alert>
	{/if}
{:catch}
	<Alert status="error" title="Failed to load component">
		<Text size="sm">Error loading wrapper for {component}</Text>
	</Alert>
{/await}
