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
		if (!inputText || typeof inputText !== "string") return [];

		const queryArray = Array.isArray(queries) ? queries : [queries];
		if (queryArray.length === 0 || queryArray.every((q) => !q)) {
			return [{ text: inputText, match: false }];
		}

		const pattern = queryArray
			.filter((q) => q)
			.map(escapeRegExp)
			.join("|");

		const flags = ignoreCase ? "gi" : "g";
		const regex = new RegExp(
			`(${pattern})`,
			matchAll ? flags : flags.replace("g", ""),
		);

		const parts = inputText.split(regex);
		const result: Array<{ text: string; match: boolean }> = [];

		for (let i = 0; i < parts.length; i++) {
			if (parts[i]) {
				const isMatch = queryArray.some((q) => {
					if (ignoreCase) {
						return q.toLowerCase() === parts[i].toLowerCase();
					}
					return q === parts[i];
				});
				result.push({ text: parts[i], match: isMatch });
			}
		}

		return result;
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
