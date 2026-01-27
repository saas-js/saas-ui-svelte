<script lang="ts" module>
	import { tv } from "tailwind-variants";

	export const SIDEBAR_CTX = Symbol("SIDEBAR_CTX");

	export interface SidebarContext {
		styles: ReturnType<typeof sidebar>;
		collapsed?: boolean;
	}

	/**
	 * Tailwind Variants styles for the Sidebar component
	 */
	export const sidebar = tv({
		slots: {
			root: [
				"flex flex-col",
				"min-w-[220px] max-w-[100vw]",
				"h-full min-h-[400px]",
				"border-r border-border-default",
				"bg-bg-panel",
				"transition-all duration-200 ease-[cubic-bezier(.34,1.24,0.64,1)]",
				"w-60",
				"antialiased",
			],
			header: ["flex items-center", "pr-3 py-2 pl-4", "shrink-0"],
			body: ["flex flex-col flex-1", "gap-4", "overflow-y-auto", "p-3"],
			footer: [
				"flex items-center",
				"px-3 py-2",
				"shrink-0",
				"border-t border-border-muted",
			],
			group: ["relative"],
			groupLabel: [
				"text-xs font-medium",
				"text-fg-muted",
				"px-2.5 py-1.5",
				"uppercase tracking-wide",
			],
			groupContent: ["flex flex-col", "pt-1"],
			item: [
				"isolate",
				"flex items-center",
				"gap-2",
				"w-full h-7",
				"px-2.5",
				"text-[.8125rem] leading-[1.1375rem]",
				"text-fg-muted",
				"rounded",
				"cursor-pointer",
				"whitespace-nowrap",
				"overflow-hidden",
				"transition-all duration-150",
				"hover:bg-bg-subtle hover:text-fg-default",
				"active:bg-bg-muted",
				"focus-visible:outline-1 focus-visible:outline-solid focus-visible:outline-accent-solid",
				"disabled:opacity-50 disabled:cursor-not-allowed",
			],
			itemIcon: ["w-4 h-4", "shrink-0"],
			itemLabel: ["flex-1", "truncate"],
			toggle: [
				"flex items-center justify-center",
				"w-7 h-7",
				"rounded",
				"cursor-pointer",
				"transition-all duration-150",
				"hover:bg-bg-subtle",
				"focus-visible:outline-1 focus-visible:outline-solid focus-visible:outline-accent-solid",
			],
		},
		variants: {
			active: {
				true: {
					item: "bg-bg-subtle text-fg-default",
				},
			},
		},
	});
</script>

<script lang="ts">
	import { setContext } from "svelte";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	interface Props extends HTMLAttributes<HTMLElement> {
		/**
		 * The content to render inside the sidebar
		 */
		children?: Snippet;
	}

	let { children, class: className, ...restProps }: Props = $props();

	const styles = $derived(sidebar());

	setContext<SidebarContext>(SIDEBAR_CTX, {
		get styles() {
			return styles;
		},
	});

	const finalClass = $derived(styles.root({ class: className as string }));
</script>

<aside class={finalClass} {...restProps}>
	{@render children?.()}
</aside>
