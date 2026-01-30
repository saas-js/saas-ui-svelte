<script lang="ts">
import { Heading } from "@saas-ui/svelte/typography/heading";
import { Text } from "@saas-ui/svelte/typography/text";
import { Link } from "@saas-ui/svelte/components/link";
import { List } from "@saas-ui/svelte/components/list";

const features = [
	{
		title: "Built for Svelte 5",
		description:
			"Leveraging runes and snippets for optimal performance and developer experience.",
	},
	{
		title: "Accessible by default",
		description:
			"All components follow WAI-ARIA guidelines using Ark UI primitives.",
	},
	{
		title: "Beautiful design",
		description:
			"Carefully crafted components inspired by premium SaaS applications.",
	},
	{
		title: "Dark mode ready",
		description: "Built-in support for light and dark themes.",
	},
	{
		title: "Fully customisable",
		description: "Extend and modify components to match your brand.",
	},
];

const sponsors = [
	{ name: "Frank Faubert", href: "https://github.com/ffaubert" },
	{ name: "Appulse Software", href: "https://appulse.net/" },
];

const acknowledgements = [
	{
		name: "Svelte",
		href: "https://svelte.dev/",
		description: "The reactive framework powering our components.",
	},
	{
		name: "Ark UI",
		href: "https://ark-ui.com/",
		description:
			"Headless UI primitives providing accessibility and behaviour.",
	},
	{
		name: "Phosphor Icons",
		href: "https://phosphoricons.com/",
		description: "Beautiful, flexible icon family.",
	},
	{
		name: "Tailwind CSS",
		href: "https://tailwindcss.com/",
		description: "Utility-first CSS framework for styling.",
	},
	{
		name: "SaaS UI",
		href: "https://saas-ui.dev/",
		description:
			"The original React design system that inspired this port.",
	},
];
</script>

<div class="flex flex-col gap-4 items-start pb-4">
	<Heading as="h1" size="2xl" weight="semibold" class="tracking-tight">
		Introduction
	</Heading>
	<Text class="text-fg-muted">
		SaaS UI Svelte is an open-source design system for building modern web
		applications with a native, high-quality feel.
	</Text>
</div>

<div class="flex flex-col gap-0 text-sm items-start">
	<Text class="text-fg-muted leading-relaxed mb-3.5">
		Inspired by macOS and premium tools like Linear, Attio, and Superhuman, it
		provides intuitive primitives that empower developers to create beautiful,
		user-friendly interfaces without sacrificing development velocity.
	</Text>
	<Text class="text-fg-muted leading-relaxed my-3.5">
		Whether you're building a simple dashboard or a complex enterprise
		application, SaaS UI Svelte helps you deliver polished experiences that
		users love.
	</Text>

	<Heading
		as="h2"
		id="features"
		size="lg"
		weight="semibold"
		class="tracking-tight mt-7 mb-3.5 scroll-mt-20"
	>
		<Link href="#features" variant="underline">Features</Link>
	</Heading>
	<List.Root class="mt-3.5 mb-7 pl-5 list-disc">
		{#each features as feature}
			<List.Item class="my-3 pl-1.5 text-fg-muted">
				<Text as="strong" class="text-fg-default">{feature.title}</Text>
				{" "}- {feature.description}
			</List.Item>
		{/each}
	</List.Root>

	<Heading
		as="h2"
		id="sponsors"
		size="lg"
		weight="semibold"
		class="tracking-tight mt-7 mb-3.5 scroll-mt-20"
	>
		<Link href="#sponsors" variant="underline">Sponsors</Link>
	</Heading>
	<List.Root class="mt-3.5 mb-7 pl-5 list-disc">
		{#each sponsors as sponsor}
			<List.Item class="my-3 pl-1.5">
				<Link href={sponsor.href} variant="underline">{sponsor.name}</Link>
			</List.Item>
		{/each}
	</List.Root>

	<Heading
		as="h2"
		id="acknowledgements"
		size="lg"
		weight="semibold"
		class="tracking-tight mt-7 mb-3.5 scroll-mt-20"
	>
		<Link href="#acknowledgements" variant="underline">Acknowledgements</Link>
	</Heading>
	<Text class="leading-relaxed text-fg-muted">
		SaaS UI Svelte is built with the help of many amazing libraries and their
		authors, without them this wouldn't be possible.
	</Text>
	<List.Root class="mt-3.5 mb-7 pl-5 list-disc">
		{#each acknowledgements as item}
			<List.Item class="my-3 pl-1.5 text-fg-muted">
				<Link href={item.href} variant="underline" class="text-fg-default">
					{item.name}
				</Link>
				{" "}- {item.description}
			</List.Item>
		{/each}
	</List.Root>
</div>
