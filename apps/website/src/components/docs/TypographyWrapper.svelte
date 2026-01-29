<script lang="ts">
	import { Alert } from "@saas-ui/svelte/components/alert";
	import { Text } from "@saas-ui/svelte/typography/text";
	import BlockquoteWrapper from "$wrappers/typography/Blockquote.svelte";
	import CodeWrapper from "$wrappers/typography/Code.svelte";
	import EmWrapper from "$wrappers/typography/Em.svelte";
	import HeadingWrapper from "$wrappers/typography/Heading.svelte";
	import HighlightWrapper from "$wrappers/typography/Highlight.svelte";
	import MarkWrapper from "$wrappers/typography/Mark.svelte";
	import TextWrapper from "$wrappers/typography/Text.svelte";

	interface Props {
		component: string;
		story: string;
	}

	let { component, story }: Props = $props();

	const wrappers: Record<string, any> = {
		Blockquote: BlockquoteWrapper,
		Code: CodeWrapper,
		Em: EmWrapper,
		Heading: HeadingWrapper,
		Highlight: HighlightWrapper,
		Mark: MarkWrapper,
		Text: TextWrapper,
	};

	const WrapperComponent = $derived(wrappers[component]);
</script>

{#if WrapperComponent}
	<WrapperComponent {story} />
{:else}
	<Alert status="error" title="Component wrapper not found">
		<Text size="sm">Unable to find wrapper for typography component: {component}</Text>
	</Alert>
{/if}
