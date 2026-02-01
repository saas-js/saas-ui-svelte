<script lang="ts">
	import { getLocaleContext } from "../locale-provider/context.svelte";

	interface Props extends Intl.NumberFormatOptions {
		/**
		 * The number to format
		 */
		value: number;
		/**
		 * The locale to use for formatting
		 * If not provided, uses the locale from LocaleProvider context
		 */
		locale?: string;
	}

	let { value, locale: localeProp, ...options }: Props = $props();

	const localeContext = getLocaleContext();

	const formattedValue = $derived.by(() => {
		const currentLocale = localeProp || localeContext?.locale || "en-US";

		const formatter = new Intl.NumberFormat(currentLocale, options);
		return formatter.format(value);
	});
</script>

{formattedValue}
