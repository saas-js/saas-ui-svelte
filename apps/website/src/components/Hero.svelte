<script lang="ts">
	import { Button } from "@saas-ui/svelte/components/button";
	import { Clipboard } from "@ark-ui/svelte/clipboard";
	import ClipboardText from "phosphor-svelte/lib/ClipboardText";
	import Check from "phosphor-svelte/lib/Check";
</script>

<section class="relative overflow-hidden pt-32 pb-20">
	<div class="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
		<div class="flex flex-col items-center gap-8 text-center">
			<div class="flex max-w-4xl flex-col items-center gap-5">
				<h1
					class="text-4xl font-semibold tracking-tight text-fg-default sm:text-5xl md:text-6xl text-balance"
				>
					The Svelte component library for startups.
				</h1>
				<p class="max-w-2xl text-lg font-medium text-fg-muted">
					Saas UI Svelte is an open source Svelte component system
					built on Ark UI. Designed to help you build beautiful,
					consistent SaaS applications.
				</p>
			</div>

			<div class="flex flex-col items-center gap-3 sm:flex-row">
				<Button
					as="a"
					href="/docs/components/overview"
					variant="glass"
					colour="indigo"
					size="lg"
					class="min-w-44"
				>
					View all components
				</Button>

				<Clipboard.Root value="npm i @saas-ui/svelte">
					<Clipboard.Trigger
						class="inline-flex h-10 cursor-pointer select-none items-center gap-3 whitespace-nowrap rounded-md border border-border-default bg-bg-default px-5 text-sm font-medium text-fg-default transition-colors hover:bg-bg-subtle focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						<span class="text-fg-muted">$</span>
						<span>npm i @saas-ui/svelte</span>
						<Clipboard.Indicator>
							{#snippet copied()}
								<Check class="size-4 text-green-600" />
							{/snippet}
							<ClipboardText class="size-4" />
						</Clipboard.Indicator>
					</Clipboard.Trigger>
				</Clipboard.Root>
			</div>
		</div>
	</div>
</section>
