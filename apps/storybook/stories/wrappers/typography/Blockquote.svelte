<script lang="ts" module>
	// Wrapper components for complex Blockquote stories
	// These are imported by Blockquote.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { Blockquote } from "$saas/typography/blockquote";
	import { Text } from "$saas/typography/text";
	import { HStack, VStack } from "$saas/layout/stack";
	import Quotes from "phosphor-svelte/lib/Quotes";
	import type { ColourName } from "$saas/utils/colours";
	import { availableColours } from "../../../../../packages/saas-svelte/utils/colours";

	const colours = availableColours;
	const blockquoteVariants = ["subtle", "solid", "plain"] as const;

	interface Props {
		story: "basic" | "withCite" | "colours" | "variants" | "icon" | "customIcon";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<Blockquote>
		<Text>
			If anyone thinks he is something when he is nothing, he deceives
			himself. Each one should test his own actions. Then he can take
			pride in himself, without comparing himself to anyone else.
		</Text>
	</Blockquote>
{:else if story === "withCite"}
	<Blockquote cite="Uzumaki Naruto" showDash>
		<Text>
			If anyone thinks he is something when he is nothing, he deceives
			himself. Each one should test his own actions. Then he can take
			pride in himself, without comparing himself to anyone else.
		</Text>
	</Blockquote>
{:else if story === "colours"}
	<VStack gap={4} class="w-full">
		{#each colours as colourName}
			<HStack gap={10} class="w-full px-4" align="center">
				<Text class="min-w-[8ch]">{colourName}</Text>
				<Blockquote
					colour={colourName as ColourName}
					cite="Uzumaki Naruto"
					showDash
				>
					<Text>
						If anyone thinks he is something when he is nothing, he
						deceives himself. Each one should test his own actions.
						Then he can take pride in himself, without comparing
						himself to anyone else.
					</Text>
				</Blockquote>
			</HStack>
		{/each}
	</VStack>
{:else if story === "variants"}
	<VStack gap={8}>
		<Blockquote variant="subtle">
			<Text>
				If anyone thinks he is something when he is nothing, he deceives
				himself. Each one should test his own actions. Then he can take
				pride in himself, without comparing himself to anyone else.
			</Text>
		</Blockquote>
		<Blockquote variant="solid">
			<Text>
				If anyone thinks he is something when he is nothing, he deceives
				himself. Each one should test his own actions. Then he can take
				pride in himself, without comparing himself to anyone else.
			</Text>
		</Blockquote>
		<Blockquote variant="plain">
			<Text>
				If anyone thinks he is something when he is nothing, he deceives
				himself. Each one should test his own actions. Then he can take
				pride in himself, without comparing himself to anyone else.
			</Text>
		</Blockquote>
	</VStack>
{:else if story === "icon"}
	<Blockquote
		variant="plain"
		colour="teal"
		showDash
		showIcon
		cite="Uzumaki Naruto"
	>
		<Text>
			If anyone thinks he is something when he is nothing, he deceives
			himself. Each one should test his own actions. Then he can take
			pride in himself, without comparing himself to anyone else.
		</Text>
	</Blockquote>
{:else if story === "customIcon"}
	<Blockquote cite="Uzumaki Naruto" colour="blue" icon={Quotes}>
		<Text>
			If anyone thinks he is something when he is nothing, he deceives
			himself. Each one should test his own actions. Then he can take
			pride in himself, without comparing himself to anyone else.
		</Text>
	</Blockquote>
{/if}
