<script module lang="ts">
import { tv, type VariantProps } from "tailwind-variants";

export const presenceBadge = tv({
	base: ["flex", "items-center", "justify-center"],
	variants: {
		variant: {
			badge: [
				"absolute",
				"bottom-0",
				"right-0",
				"translate-x-[12%]",
				"translate-y-[12%]",
				"rounded-full",
				"border-[0.10em]",
				"border-bg-default",
			],
			ring: [
				"absolute",
				"inset-0",
				"rounded-full",
				"outline-2",
				"outline-offset-2",
				"outline",
			],
		},
		size: {
			"2xs": "",
			xs: "",
			sm: "",
			md: "",
			lg: "",
			xl: "",
			"2xl": "",
		},
		presence: {
			online: "",
			offline: "",
			busy: "",
			dnd: "",
			away: "",
		},
	},
	compoundVariants: [
		// Badge variant sizes
		{ variant: "badge", size: "2xs", class: "size-1.5" },
		{ variant: "badge", size: "xs", class: "size-2" },
		{ variant: "badge", size: "sm", class: "size-2.5" },
		{ variant: "badge", size: "md", class: "size-3" },
		{ variant: "badge", size: "lg", class: "size-3.5" },
		{ variant: "badge", size: "xl", class: "size-4" },
		{ variant: "badge", size: "2xl", class: "size-5" },
		// Badge variant presence colors (background)
		{ variant: "badge", presence: "online", class: "bg-green-solid" },
		{ variant: "badge", presence: "offline", class: "bg-gray-solid" },
		{ variant: "badge", presence: "busy", class: "bg-red-solid" },
		{ variant: "badge", presence: "dnd", class: "bg-red-solid" },
		{ variant: "badge", presence: "away", class: "bg-yellow-solid" },
		// Ring variant presence colors (outline)
		{
			variant: "ring",
			presence: "online",
			class: "outline-green-solid",
		},
		{
			variant: "ring",
			presence: "offline",
			class: "outline-gray-solid",
		},
		{ variant: "ring", presence: "busy", class: "outline-red-solid" },
		{ variant: "ring", presence: "dnd", class: "outline-red-solid" },
		{
			variant: "ring",
			presence: "away",
			class: "outline-yellow-solid",
		},
	],
	defaultVariants: {
		variant: "badge",
		size: "md",
		presence: "online",
	},
});

export const presenceBadgeOutOfOffice = tv({
	base: [
		"bg-bg-default",
		"border-[0.12em]",
		"outline-[0.12em]",
		"outline-bg-default",
		"outline",
	],
	variants: {
		presence: {
			online: "border-green-solid",
			offline: "border-gray-solid",
			busy: "border-red-solid",
			dnd: "border-red-solid",
			away: "border-yellow-solid",
		},
	},
	defaultVariants: {
		presence: "online",
	},
});

export type PresenceBadgeVariants = VariantProps<typeof presenceBadge>;
export type PresenceStatus = NonNullable<PresenceBadgeVariants["presence"]>;
</script>

<script lang="ts">
import { getContext } from "svelte";
import { twMerge } from "tailwind-merge";
import { PERSONA_CTX, type PersonaContext } from "./persona.svelte";

interface Props {
	/**
	 * The presence status to display.
	 * Defaults to context presence or "online".
	 */
	presence?: PresenceStatus;
	/**
	 * Additional CSS classes.
	 */
	class?: string;
}

let { presence: propPresence, class: className }: Props = $props();

const personaContext = getContext<PersonaContext>(PERSONA_CTX);
const size = $derived(personaContext?.size ?? "md");
const variant = $derived(personaContext?.variant ?? "badge");
const outOfOffice = $derived(personaContext?.outOfOffice ?? false);
const presence = $derived(propPresence ?? personaContext?.presence ?? "online");

const baseStyles = $derived(presenceBadge({ variant, size, presence }));

const outOfOfficeStyles = $derived(
	outOfOffice && variant === "badge"
		? presenceBadgeOutOfOffice({ presence })
		: "",
);

const styles = $derived(
	twMerge(baseStyles, outOfOfficeStyles, className as string),
);
</script>

<span class={styles} role="img" aria-label={`Status: ${presence}`}></span>
