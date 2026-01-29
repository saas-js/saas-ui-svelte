<script lang="ts" module>
	// Wrapper components for complex Combobox stories
</script>

<script lang="ts">
	import { onMount } from "svelte";
	import { Combobox } from "$saas/components/combobox";
	import { Badge } from "$saas/components/badge";
	import { Button } from "$saas/components/button";
	import { Field } from "$saas/components/field";
	import { Popover } from "$saas/components/popover";
	import { VStack, HStack } from "$saas/layout/stack";
	import Code from "phosphor-svelte/lib/Code";
	import {
		comboboxSizes,
		comboboxVariants,
		comboboxColours,
	} from "../../utils";

	interface Props {
		story:
			| "basic"
			| "sizes"
			| "variants"
			| "multiple"
			| "asyncLoading"
			| "highlightMatch"
			| "openOnClick"
			| "field"
			| "disabled"
			| "disabledItem"
			| "inputGroup"
			| "invalid"
			| "controlledValue"
			| "controlledOpen"
			| "allowCustomValue"
			| "customObjects"
			| "minCharacters"
			| "limit"
			| "virtualised"
			| "colours"
			| "customFilter"
			| "links"
			| "inPopover";
	}

	let { story }: Props = $props();

	const frameworks = [
		{ label: "React", value: "react" },
		{ label: "Solid", value: "solid" },
		{ label: "Vue", value: "vue" },
		{ label: "Angular", value: "angular" },
		{ label: "Svelte", value: "svelte" },
		{ label: "Preact", value: "preact" },
		{ label: "Qwik", value: "qwik" },
		{ label: "Lit", value: "lit" },
		{ label: "Alpine.js", value: "alpinejs" },
		{ label: "Ember", value: "ember" },
		{ label: "Next.js", value: "nextjs" },
	];

	const skills = [
		{ label: "JavaScript", value: "javascript" },
		{ label: "TypeScript", value: "typescript" },
		{ label: "React", value: "react" },
		{ label: "Node.js", value: "nodejs" },
		{ label: "GraphQL", value: "graphql" },
		{ label: "PostgreSQL", value: "postgresql" },
	];

	// Items with multiple searchable properties for custom filter demo
	const people = [
		{
			label: "John Doe",
			value: "john",
			email: "john@example.com",
			role: "Developer",
		},
		{
			label: "Jane Smith",
			value: "jane",
			email: "jane@example.com",
			role: "Designer",
		},
		{
			label: "Bob Wilson",
			value: "bob",
			email: "bob@example.com",
			role: "Developer",
		},
		{
			label: "Alice Brown",
			value: "alice",
			email: "alice@example.com",
			role: "Manager",
		},
		{
			label: "Charlie Davis",
			value: "charlie",
			email: "charlie@example.com",
			role: "Designer",
		},
	];

	// Items with links for navigation demo
	const linkItems = [
		{ label: "React", value: "react", href: "https://react.dev" },
		{ label: "Solid", value: "solid", href: "https://solidjs.com" },
		{ label: "Vue", value: "vue", href: "https://vuejs.org" },
		{ label: "Angular", value: "angular", href: "https://angular.io" },
		{ label: "Svelte", value: "svelte", href: "https://svelte.dev" },
		{ label: "Preact", value: "preact", href: "https://preactjs.com" },
		{ label: "Qwik", value: "qwik", href: "https://qwik.builder.io" },
		{ label: "Lit", value: "lit", href: "https://lit.dev" },
		{ label: "Alpine.js", value: "alpinejs", href: "https://alpinejs.dev" },
		{ label: "Ember", value: "ember", href: "https://emberjs.com" },
		{ label: "Next.js", value: "nextjs", href: "https://nextjs.org" },
	];

	let selectedSkills = $state<string[]>([]);
	let controlledValue = $state<string[]>([]);
	let isOpen = $state(false);
	let customValue = $state<string[]>([]);
	let asyncItems = $state<
		Array<{ name: string; height: string; mass: string }>
	>([]);
	let isLoading = $state(false);
	let asyncInputValue = $state("");

	// Countries loaded from CDN
	let countries = $state<
		Array<{ label: string; value: string; flag: string }>
	>([]);
	let countriesLoading = $state(true);

	// Custom filter state
	let customFilterInput = $state("");

	// Custom filter function that searches multiple fields
	function customFilterPeople(inputValue: string) {
		if (!inputValue) return people;
		const search = inputValue.toLowerCase();
		return people.filter(
			(person) =>
				person.label.toLowerCase().includes(search) ||
				person.email.toLowerCase().includes(search) ||
				person.role.toLowerCase().includes(search),
		);
	}

	async function fetchCharacters(search: string = "") {
		isLoading = true;
		try {
			const response = await fetch(
				`https://swapi.py4e.com/api/people/?search=${search}`,
			);
			const data = await response.json();
			asyncItems = data.results;
		} catch {
			asyncItems = [];
		} finally {
			isLoading = false;
		}
	}

	async function fetchCountries() {
		countriesLoading = true;
		try {
			const response = await fetch(
				"https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/index.json",
			);
			const data: Array<{ name: string; code: string; emoji: string }> =
				await response.json();
			// Filter out non-country codes and transform to combobox format
			const excluded = [
				"EU",
				"UN",
				"AC",
				"CP",
				"DG",
				"EA",
				"IC",
				"TA",
				"XK",
			];
			countries = data
				.filter(
					(c) => c.code.length === 2 && !excluded.includes(c.code),
				)
				.map((c) => ({ label: c.name, value: c.code, flag: c.emoji }));
		} catch {
			countries = [];
		} finally {
			countriesLoading = false;
		}
	}

	// Load initial data on mount
	onMount(() => {
		fetchCharacters();
		fetchCountries();
	});

	// Debounced search
	let searchTimeout: ReturnType<typeof setTimeout>;
	function handleAsyncInputChange(value: string) {
		asyncInputValue = value;
		clearTimeout(searchTimeout);
		searchTimeout = setTimeout(() => {
			fetchCharacters(value);
		}, 300);
	}
</script>

{#if story === "basic"}
	<Combobox
		items={frameworks}
		label="Select framework"
		placeholder="Type to search"
		class="w-80"
	/>
{:else if story === "sizes"}
	<VStack gap={8} class="w-80">
		{#each comboboxSizes as size}
			<Combobox
				items={frameworks}
				label="Size: {size}"
				placeholder="Type to search"
				{size}
			/>
		{/each}
	</VStack>
{:else if story === "variants"}
	<VStack gap={8} class="w-80">
		{#each comboboxVariants as variant}
			<Combobox
				items={frameworks}
				label="Variant: {variant}"
				placeholder="Type to search"
				{variant}
			/>
		{/each}
	</VStack>
{:else if story === "multiple"}
	<VStack gap={1.5} class="w-80">
		{#if selectedSkills.length > 0}
			<HStack gap={2} class="flex-wrap">
				{#each selectedSkills as skill}
					<Badge
						>{skills.find((s) => s.value === skill)?.label ??
							skill}</Badge
					>
				{/each}
			</HStack>
		{/if}
		<Combobox
			items={skills}
			label="Select Skills"
			placeholder="Type to search"
			multiple
			bind:value={selectedSkills}
		/>
	</VStack>
{:else if story === "asyncLoading"}
	{@const items = asyncItems.map((c) => ({
		label: c.name,
		value: c.name,
		description: `${c.height}cm / ${c.mass}kg`,
	}))}
	<Combobox
		{items}
		label="Search Star Wars Characters"
		placeholder="Type to search"
		loading={isLoading}
		loadingText="Loading..."
		emptyText="No characters found"
		openOnClick
		disableFilter
		itemDescriptionKey="description"
		onInputValueChange={(e) => handleAsyncInputChange(e.inputValue)}
		class="w-80"
	/>
{:else if story === "highlightMatch"}
	<Combobox
		items={frameworks}
		label="Select framework"
		placeholder="Type to search"
		highlightMatch
		class="w-80"
	/>
{:else if story === "openOnClick"}
	<Combobox
		items={frameworks}
		label="Select framework"
		placeholder="Click to open"
		openOnClick
		class="w-80"
	/>
{:else if story === "field"}
	<Field.Root class="w-80">
		<Field.Label>Framework</Field.Label>
		<Combobox items={frameworks} placeholder="Type to search" />
		<Field.HelperText>The framework you love to use</Field.HelperText>
	</Field.Root>
{:else if story === "disabled"}
	<Combobox
		items={frameworks}
		label="Select framework"
		placeholder="Type to search"
		disabled
		class="w-80"
	/>
{:else if story === "disabledItem"}
	<Combobox
		items={frameworks}
		label="Select framework"
		placeholder="Type to search"
		isItemDisabled={(item) =>
			item.value === "angular" || item.value === "ember"}
		class="w-80"
	/>
{:else if story === "inputGroup"}
	<Combobox
		items={frameworks}
		label="Select framework"
		placeholder="Type to search"
		startIcon={Code}
		class="w-80"
	/>
{:else if story === "invalid"}
	<Combobox
		items={frameworks}
		label="Select framework"
		placeholder="Type to search"
		invalid
		class="w-80"
	/>
{:else if story === "controlledValue"}
	<VStack gap={4} class="w-80">
		<HStack gap={2} class="text-sm">
			<span>Selected:</span>
			{#if controlledValue.length > 0}
				<HStack gap={1}>
					{#each controlledValue as v}<Badge>{v}</Badge>{/each}
				</HStack>
			{:else}
				<span class="text-fg-muted">N/A</span>
			{/if}
		</HStack>
		<Combobox
			items={frameworks}
			label="Select framework"
			placeholder="Type to search"
			bind:value={controlledValue}
		/>
	</VStack>
{:else if story === "controlledOpen"}
	<VStack gap={4} class="w-80">
		<HStack gap={2}>
			<Button size="sm" onclick={() => (isOpen = !isOpen)}
				>{isOpen ? "Close" : "Open"} Combobox</Button
			>
			<span class="text-sm text-fg-muted">Open: {isOpen}</span>
		</HStack>
		<Combobox
			items={frameworks}
			label="Select framework"
			placeholder="Type to search"
			bind:open={isOpen}
		/>
	</VStack>
{:else if story === "allowCustomValue"}
	<VStack gap={4} class="w-80">
		<HStack gap={2} class="text-sm">
			<span>Value:</span>
			{#if customValue.length > 0}
				<HStack gap={1}>
					{#each customValue as v}<Badge>{v}</Badge>{/each}
				</HStack>
			{:else}
				<span class="text-fg-muted">N/A</span>
			{/if}
		</HStack>
		<Combobox
			items={frameworks}
			label="Select or type custom"
			placeholder="Type anything..."
			allowCustomValue
			bind:value={customValue}
		/>
	</VStack>
{:else if story === "customObjects"}
	<Combobox
		items={countries}
		label="Select country"
		placeholder="Type to search"
		itemPrefixKey="flag"
		limit={10}
		openOnClick
		class="w-80"
	/>
{:else if story === "minCharacters"}
	<Combobox
		items={frameworks}
		label="Select framework"
		placeholder="Type at least 2 characters"
		minCharacters={2}
		class="w-80"
	/>
{:else if story === "limit"}
	<Combobox
		items={frameworks}
		label="Select framework"
		placeholder="Type to search"
		limit={5}
		class="w-80"
	/>
{:else if story === "virtualised"}
	<Combobox
		items={countries}
		label="Select country"
		placeholder="Type to search"
		itemPrefixKey="flag"
		virtualised
		limit={10}
		openOnClick
		class="w-80"
	/>
{:else if story === "colours"}
	<VStack gap={8} class="w-80">
		{#each comboboxColours as colour}
			<Combobox
				items={frameworks}
				label="Colour: {colour}"
				placeholder="Type to search"
				{colour}
			/>
		{/each}
	</VStack>
{:else if story === "customFilter"}
	{@const filteredPeople = customFilterPeople(customFilterInput)}
	<VStack gap={2} class="w-80">
		<Combobox
			items={filteredPeople}
			label="Search People"
			placeholder="Search by name, email, or role..."
			disableFilter
			openOnClick
			itemDescriptionKey="email"
			onInputValueChange={(e) => (customFilterInput = e.inputValue)}
		/>
		<p class="text-xs text-fg-muted">
			Try searching "developer" or "example.com"
		</p>
	</VStack>
{:else if story === "links"}
	<Combobox
		items={linkItems}
		label="Select framework"
		placeholder="Search frameworks..."
		openOnClick
		class="w-80"
	/>
{:else if story === "inPopover"}
	<Popover.Root>
		<Popover.Trigger triggerText="Select framework" />
		<Popover.Content>
			<Popover.Header>
				<Popover.Title>Select framework</Popover.Title>
			</Popover.Header>
			<Popover.Body>
				<Combobox
					items={frameworks}
					placeholder="Type to search"
					openOnClick
				/>
			</Popover.Body>
		</Popover.Content>
	</Popover.Root>
{/if}
