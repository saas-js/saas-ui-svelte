<script module lang="ts">
	import { tv } from "tailwind-variants";

	export const STAT_CTX = Symbol("STAT_CTX");

	export const stat = tv({
		slots: {
			root: [
				"flex",
				"flex-col",
				"flex-1",
				"gap-y-0",
				"gap-x-0",
				"relative",
				"antialiased",
			],
			label: ["text-fg-muted", "select-none", "text-sm", "leading-sm"],
			valueText: [
				"tracking-tight",
				"proportional-nums",
				"gap-y-1",
				"gap-x-1",
				"font-semibold",
				"inline-flex",
				"text-xl",
				"leading-2xl",
			],
			valueUnit: [
				"text-fg-muted",
				"font-normal",
				"tracking-normal",
				"text-xs",
				"leading-xs",
			],
			helpText: ["text-fg-muted", "text-xs", "leading-xs"],
			trend: [
				"tabular-nums",
				"whitespace-nowrap",
				"select-none",
				"items-center",
				"font-medium",
				"inline-flex",
				"rounded-full",
				"gap-y-0",
				"gap-x-0",
				"min-h-5",
				"text-xs",
				"leading-xs",
			],
			trendIcon: [
				"justify-center",
				"items-center",
				"inline-flex",
				"mr-1",
			],
		},
	});

	export interface StatContext {
		styles: ReturnType<typeof stat>;
	}
</script>

<script lang="ts">
	import { setContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";

	interface Props {
		/**
		 * The content of the stat.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		[key: string]: any;
	}

	let { children, class: className, ...restProps }: Props = $props();

	const classes = $derived(stat());

	setContext<StatContext>(STAT_CTX, {
		get styles() {
			return classes;
		},
	});
</script>

<dl class={twMerge(classes.root(), className)} {...restProps}>
	{@render children()}
</dl>
