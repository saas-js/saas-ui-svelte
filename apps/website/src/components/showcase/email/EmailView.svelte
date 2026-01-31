<script lang="ts">
import { Button } from "@saas-ui/svelte/components/button";
import { Avatar } from "@saas-ui/svelte/components/avatar";
import { Kbd } from "@saas-ui/svelte/components/kbd";
import { Tooltip } from "@saas-ui/svelte/components/tooltip";
import ArrowBendUpLeftIcon from "phosphor-svelte/lib/ArrowBendUpLeftIcon";
import ArrowBendDoubleUpLeftIcon from "phosphor-svelte/lib/ArrowBendDoubleUpLeftIcon";
import ArrowBendUpRightIcon from "phosphor-svelte/lib/ArrowBendUpRightIcon";
import MagnifyingGlassIcon from "phosphor-svelte/lib/MagnifyingGlassIcon";
import PulseIcon from "phosphor-svelte/lib/PulseIcon";
import { emailsById } from "./emails";

interface Props {
	emailId: string | null;
}

let { emailId }: Props = $props();

let email = $derived(emailId ? emailsById[emailId] : null);
</script>

<div class="bg-bg-default flex flex-1 flex-col gap-2 overflow-auto">
	{#if email}
		<!-- Header toolbar -->
		<div
			class="bg-bg-default border-border-default sticky top-0 z-10 flex h-12 shrink-0 items-center gap-2 border-b px-3"
		>
			<Tooltip content="Activity">
				<Button
					variant="ghost"
					size="sm"
					icon
					colour="gray"
					aria-label="Activity"
				>
					<PulseIcon size={16} />
				</Button>
			</Tooltip>
			<Tooltip content="Reply">
				<Button
					variant="ghost"
					size="sm"
					icon
					colour="gray"
					aria-label="Reply"
				>
					<ArrowBendUpLeftIcon size={16} />
				</Button>
			</Tooltip>
			<Tooltip content="Reply All">
				<Button
					variant="ghost"
					size="sm"
					icon
					colour="gray"
					aria-label="Reply All"
				>
					<ArrowBendDoubleUpLeftIcon size={16} />
				</Button>
			</Tooltip>
			<Tooltip content="Forward">
				<Button
					variant="ghost"
					size="sm"
					icon
					colour="gray"
					aria-label="Forward"
				>
					<ArrowBendUpRightIcon size={16} />
				</Button>
			</Tooltip>
			<div class="relative flex flex-1 items-center">
				<div
					class="text-fg-muted pointer-events-none absolute z-2 flex h-full items-center justify-center px-3 text-[.8125rem]"
				>
					<MagnifyingGlassIcon size={13} />
				</div>
				<input
					placeholder="Search"
					class="border-border-default bg-bg-default hover:border-border-emphasized h-7 w-full min-w-7 appearance-none rounded border pr-10 pl-8 text-[.8125rem] leading-[1.1375rem] outline-0 focus-visible:border-indigo-600 focus-visible:outline-indigo-600 focus-visible:outline-solid hover:focus-visible:border-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
				/>
				<div
					class="absolute right-0 z-2 flex h-full items-center justify-center px-2 text-[.8125rem]"
				>
					<Kbd keys={["command"]} colour="indigo">K</Kbd>
				</div>
			</div>
		</div>

		<!-- Email content -->
		<div class="flex-1 overflow-y-auto px-4">
			<!-- Email header -->
			<div
				class="border-border-default flex items-center gap-3 border-b pb-4"
			>
				<Avatar name={email.from} size="lg" colour="indigo" />
				<div class="flex flex-col">
					<h2 class="text-sm leading-5 font-medium">{email.from}</h2>
					<p class="text-fg-muted text-[.8125rem]">{email.subject}</p>
				</div>
				<div class="flex-1"></div>
				<p class="text-fg-muted self-start text-xs">{email.date}</p>
			</div>

			<!-- Email body -->
			<div class="relative mx-auto w-full max-w-xl py-4">
				<div
					class="prose prose-sm text-fg-muted max-w-prose text-[.8125rem] leading-[1.7em] [&_li]:my-1 [&_li]:list-decimal [&_li]:pl-1 [&_ol]:my-3.5 [&_ol]:pl-6 [&_p]:my-3.5"
				>
					{@html email.content}
				</div>
			</div>
		</div>
	{:else}
		<div
			class="text-fg-muted flex flex-1 items-center justify-center text-sm"
		>
			Select an email to view
		</div>
	{/if}
</div>
