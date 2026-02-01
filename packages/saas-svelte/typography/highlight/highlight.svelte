<script lang="ts">
	import { Mark } from "$saas/typography/mark";
	import type { MarkVariants } from "$saas/typography/mark/mark.svelte";
	import { Text } from "$saas/typography/text";
	import type { ColourName } from "$saas/utils/colours";

	interface Props {
		/**
		 * The query string or array of strings to highlight in the text.
		 */
		query: string | string[];
		/**
		 * The text content to search within and highlight matches.
		 */
		text: string;
		/**
		 * Whether to ignore case when matching the query.
		 * @default false
		 */
		ignoreCase?: boolean;
		/**
		 * Whether to match all instances of the query.
		 * @default true
		 */
		matchAll?: boolean;
		/**
		 * The visual style variant for highlighted text.
		 * @default "subtle"
		 */
		variant?: MarkVariants["variant"];
		/**
		 * The colour palette to use for highlighted text.
		 * @default "orange"
		 */
		colour?: ColourName;
		/**
		 * Additional CSS classes to apply to the highlighted text.
		 */
		markClass?: string;
		/**
		 * Additional CSS classes to apply to the container.
		 */
		class?: string;
	}

	let {
		query,
		text,
		ignoreCase = false,
		matchAll = true,
		variant = "subtle",
		colour = "orange",
		markClass,
		class: className,
	}: Props = $props();

	function escapeRegExp(str: string): string {
		return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	}

	function highlightText(
		inputText: string,
		queries: string | string[],
	): Array<{ text: string; match: boolean }> {
		if (!inputText) return [];

		const queryArray = Array.isArray(queries) ? queries : [queries];
		const validQueries = queryArray.filter(Boolean);

		if (validQueries.length === 0) {
			return [{ text: inputText, match: false }];
		}

		const pattern = validQueries.map(escapeRegExp).join("|");
		const flags = ignoreCase ? "gi" : "g";
		const regex = new RegExp(
			`(${pattern})`,
			matchAll ? flags : flags.replace("g", ""),
		);

		return inputText
			.split(regex)
			.filter(Boolean)
			.map((part) => ({
				text: part,
				match: validQueries.some((q) =>
					ignoreCase
						? q.toLowerCase() === part.toLowerCase()
						: q === part,
				),
			}));
	}

	const parts = $derived(highlightText(text, query));
</script>

<Text class={className}
	>{#each parts as { text: partText, match }}{#if match}<Mark
				{variant}
				{colour}
				class={markClass}>{partText}</Mark
			>{:else}{partText}{/if}{/each}</Text
>
