<script lang="ts">
import { Button } from "@saas-ui/svelte/components/button";
import { Avatar } from "@saas-ui/svelte/components/avatar";
import { Icon } from "@saas-ui/svelte/components/icon";
import { Kbd } from "@saas-ui/svelte/components/kbd";
import { Tooltip } from "@saas-ui/svelte/components/tooltip";
import { Box } from "@saas-ui/svelte/layout/box";
import { Flex } from "@saas-ui/svelte/layout/flex";
import { VStack } from "@saas-ui/svelte/layout/stack";
import { Centre } from "@saas-ui/svelte/layout/centre";
import { Heading } from "@saas-ui/svelte/typography/heading";
import { Text } from "@saas-ui/svelte/typography/text";
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

<Flex direction="column" gap={2} class="bg-bg-default flex-1 overflow-auto">
	{#if email}
		<!-- Header toolbar -->
		<Flex
			align="center"
			gap={2}
			class="bg-bg-default border-border-default sticky top-0 z-10 h-12 shrink-0 border-b px-3"
		>
			<Tooltip content="Activity">
				<Button
					variant="ghost"
					size="sm"
					icon
					colour="gray"
					aria-label="Activity"
				>
					<Icon as={PulseIcon} size="sm" />
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
					<Icon as={ArrowBendUpLeftIcon} size="sm" />
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
					<Icon as={ArrowBendDoubleUpLeftIcon} size="sm" />
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
					<Icon as={ArrowBendUpRightIcon} size="sm" />
				</Button>
			</Tooltip>
			<Flex align="center" class="relative flex-1">
				<Flex
					align="center"
					justify="center"
					class="text-fg-muted pointer-events-none absolute z-2 h-full px-3 text-[.8125rem]"
				>
					<Icon as={MagnifyingGlassIcon} size="xs" />
				</Flex>
				<input
					placeholder="Search"
					class="border-border-default bg-bg-default hover:border-border-emphasized h-7 w-full min-w-7 appearance-none rounded border pr-10 pl-8 text-[.8125rem] leading-[1.1375rem] outline-0 focus-visible:border-indigo-600 focus-visible:outline-indigo-600 focus-visible:outline-solid hover:focus-visible:border-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
				/>
				<Flex
					align="center"
					justify="center"
					class="absolute right-0 z-2 h-full px-2 text-[.8125rem]"
				>
					<Kbd keys={["command"]} colour="indigo">K</Kbd>
				</Flex>
			</Flex>
		</Flex>

		<!-- Email content -->
		<Box class="flex-1 overflow-y-auto px-4">
			<!-- Email header -->
			<Flex
				align="center"
				gap={3}
				class="border-border-default border-b pb-4"
			>
				<Avatar name={email.from} size="lg" colour="indigo" />
				<VStack gap={0}>
					<Heading as="h2" size="sm" weight="medium">{email.from}</Heading>
					<Text class="text-fg-muted text-[.8125rem]">{email.subject}</Text>
				</VStack>
				<Box class="flex-1"></Box>
				<Text size="xs" class="text-fg-muted self-start">{email.date}</Text>
			</Flex>

			<!-- Email body -->
			<Box class="relative mx-auto w-full max-w-xl py-4">
				<Box
					class="prose prose-sm text-fg-muted max-w-prose text-[.8125rem] leading-[1.7em] [&_li]:my-1 [&_li]:list-decimal [&_li]:pl-1 [&_ol]:my-3.5 [&_ol]:pl-6 [&_p]:my-3.5"
				>
					{@html email.content}
				</Box>
			</Box>
		</Box>
	{:else}
		<Centre
			class="text-fg-muted flex-1 text-sm"
		>
			Select an email to view
		</Centre>
	{/if}
</Flex>
