<script lang="ts">
	import type { Snippet } from "svelte";
	import { setLocaleContext, type LocaleContext } from "./context.svelte";

	interface Props {
		/**
		 * The locale to use for the application
		 */
		locale: string;
		/**
		 * The content to wrap
		 */
		children: Snippet;
	}

	let { locale, children }: Props = $props();

	// Determine text direction based on locale
	const rtlLocales = ["ar", "he", "fa", "ur"];

	// Create reactive context state
	const getDir = (loc: string): "ltr" | "rtl" => {
		const lang = loc.split("-")[0];
		return rtlLocales.includes(lang) ? "rtl" : "ltr";
	};

	let contextState = $state<LocaleContext>({
		locale: "en",
		dir: "ltr",
	});

	// Update context when locale changes
	$effect(() => {
		contextState.locale = locale;
		contextState.dir = getDir(locale);
	});

	setLocaleContext(contextState);
</script>

{@render children()}
