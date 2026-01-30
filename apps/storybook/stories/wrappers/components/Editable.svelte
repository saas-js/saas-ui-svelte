<script lang="ts" module>
	// Wrapper components for complex Editable stories
	// These are imported by Editable.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { Editable } from "$saas/components/editable";
	import { HStack, VStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import PencilSimple from "phosphor-svelte/lib/PencilSimple";
	import Check from "phosphor-svelte/lib/Check";
	import X from "phosphor-svelte/lib/X";
	import { colours } from "../../utils";

	interface Props {
		story:
			| "basic"
			| "controlled"
			| "doubleClick"
			| "disabled"
			| "invalid"
			| "textarea"
			| "withControls"
			| "colours";
	}

	let { story }: Props = $props();
	let name = $state("");
</script>

{#if story === "basic"}
	<Editable.Root defaultValue="Click to edit">
		<Editable.Area>
			<Editable.Preview />
			<Editable.Input />
		</Editable.Area>
	</Editable.Root>
{:else if story === "controlled"}
	<Editable.Root
		value={name}
		onValueChange={(e) => (name = e.value)}
		placeholder="Click to edit"
	>
		<Editable.Area>
			<Editable.Preview />
			<Editable.Input />
		</Editable.Area>
	</Editable.Root>
{:else if story === "doubleClick"}
	<Editable.Root defaultValue="Double click to edit" activationMode="dblclick">
		<Editable.Area>
			<Editable.Preview />
			<Editable.Input />
		</Editable.Area>
	</Editable.Root>
{:else if story === "disabled"}
	<Editable.Root disabled defaultValue="Click to edit">
		<Editable.Area>
			<Editable.Preview />
			<Editable.Input />
		</Editable.Area>
	</Editable.Root>
{:else if story === "invalid"}
	<Editable.Root invalid defaultValue="Click to edit">
		<Editable.Area>
			<Editable.Preview />
			<Editable.Input />
		</Editable.Area>
	</Editable.Root>
{:else if story === "textarea"}
	<Editable.Root defaultValue="Click to edit" autoResize class="w-full">
		<Editable.Area>
			<Editable.Preview class="min-h-14 items-start" />
			<Editable.Textarea class="min-h-14" />
		</Editable.Area>
	</Editable.Root>
{:else if story === "withControls"}
	<Editable.Root defaultValue="Click to edit">
		<Editable.Area>
			<Editable.Preview />
			<Editable.Input />
		</Editable.Area>
		<Editable.Control>
			<Editable.EditTrigger icon aria-label="Edit">
				<PencilSimple class="size-3.5" weight="bold" aria-hidden="true" />
			</Editable.EditTrigger>
			<Editable.CancelTrigger icon aria-label="Cancel">
				<X class="size-3.5" weight="bold" aria-hidden="true" />
			</Editable.CancelTrigger>
			<Editable.SubmitTrigger icon aria-label="Submit">
				<Check class="size-3.5" weight="bold" aria-hidden="true" />
			</Editable.SubmitTrigger>
		</Editable.Control>
	</Editable.Root>
{:else if story === "colours"}
	<VStack gap={4}>
		{#each colours as colour}
			<HStack gap={4} align="center">
				<Text size="xs" class="w-16">{colour}</Text>
				<Editable.Root defaultValue="Click to edit" {colour} class="w-full">
					<Editable.Area>
						<Editable.Preview />
						<Editable.Input />
					</Editable.Area>
				</Editable.Root>
			</HStack>
		{/each}
	</VStack>
{/if}
