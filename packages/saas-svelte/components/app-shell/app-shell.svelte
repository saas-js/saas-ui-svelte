<script lang="ts" module>
	import { tv } from "tailwind-variants";

	/**
	 * Tailwind Variants styles for the AppShell component
	 */
	export const appShell = tv({
		slots: {
			root: [
				"flex",
				"flex-col",
				"w-full",
				"overflow-hidden",
				"antialiased",
			],
			main: ["flex", "flex-1", "min-h-0"],
			content: ["flex", "flex-col", "flex-1", "min-w-0"],
		},
	});
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { Flex } from "$saas/layout/flex";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/**
		 * The top header navigation.
		 */
		header?: Snippet;
		/**
		 * Main sidebar, positioned on the left.
		 */
		sidebar?: Snippet;
		/**
		 * Secondary sidebar, positioned on the right.
		 */
		aside?: Snippet;
		/**
		 * The footer.
		 */
		footer?: Snippet;
		/**
		 * The main content.
		 */
		children?: Snippet;
		/**
		 * The height of the app shell.
		 * @default "100dvh"
		 */
		height?: string;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let {
		header,
		sidebar,
		aside,
		footer,
		children,
		height = "100dvh",
		class: className,
		style,
		...restProps
	}: Props = $props();

	const styles = $derived(appShell());
	const finalStyle = $derived(
		[`height: ${height}`, style].filter(Boolean).join("; "),
	);
</script>

<Flex
	direction="column"
	class={twMerge(styles.root(), className as string)}
	style={finalStyle}
	{...restProps}
>
	{#if header}
		{@render header()}
	{/if}

	<Flex class={styles.main()}>
		{#if sidebar}
			{@render sidebar()}
		{/if}

		<Flex direction="column" class={styles.content()}>
			{@render children?.()}
		</Flex>

		{#if aside}
			{@render aside()}
		{/if}
	</Flex>

	{#if footer}
		{@render footer()}
	{/if}
</Flex>
