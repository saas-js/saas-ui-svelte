<script lang="ts">
	import { getLocaleContext } from "../locale-provider/context.svelte";

	interface Props {
		/**
		 * The byte size to format.
		 */
		value: number;
		/**
		 * The unit granularity to display.
		 * @default "byte"
		 */
		unit?: "bit" | "byte";
		/**
		 * The unit display format.
		 * @default "short"
		 */
		unitDisplay?: "long" | "short" | "narrow";
		/**
		 * The locale to use for formatting.
		 * If not provided, uses the locale from LocaleProvider context.
		 */
		locale?: string;
	}

	let {
		value,
		unit = "byte",
		unitDisplay = "short",
		locale: localeProp,
	}: Props = $props();

	const localeContext = getLocaleContext();

	const formattedValue = $derived.by(() => {
		const currentLocale = localeProp || localeContext?.locale || "en-US";

		// Determine appropriate unit
		const units =
			unit === "bit"
				? ["bit", "kbit", "Mbit", "Gbit", "Tbit"]
				: ["byte", "kilobyte", "megabyte", "gigabyte", "terabyte"];

		let unitIndex = 0;
		let displayValue = value;

		// Find the appropriate unit
		while (displayValue >= 1024 && unitIndex < units.length - 1) {
			displayValue /= 1024;
			unitIndex++;
		}

		// Format the number
		const numberFormatter = new Intl.NumberFormat(currentLocale, {
			style: "decimal",
			maximumFractionDigits: 2,
			minimumFractionDigits: 0,
		});

		// Format with unit
		const formatted = numberFormatter.format(displayValue);

		// Get unit abbreviation based on unitDisplay
		let unitString = "";
		let separator = " ";

		if (unitDisplay === "narrow") {
			const abbreviations =
				unit === "bit"
					? ["b", "kb", "Mb", "Gb", "Tb"]
					: ["B", "kB", "MB", "GB", "TB"];
			unitString = abbreviations[unitIndex];
			separator = ""; // No space for narrow
		} else if (unitDisplay === "short") {
			const abbreviations =
				unit === "bit"
					? ["bit", "kbit", "Mbit", "Gbit", "Tbit"]
					: ["byte", "kB", "MB", "GB", "TB"];
			unitString = abbreviations[unitIndex];
			if (displayValue !== 1 && unitIndex === 0) {
				unitString += "s";
			}
		} else {
			// long
			unitString = units[unitIndex];
			if (displayValue !== 1) {
				unitString += "s";
			}
		}

		return `${formatted}${separator}${unitString}`;
	});
</script>

{formattedValue}
