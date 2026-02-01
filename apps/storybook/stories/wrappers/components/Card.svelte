<script lang="ts" module>
	// Wrapper components for complex Card stories
</script>

<script lang="ts">
	import { Card } from "$saas/components/card";
	import { Button } from "$saas/components/button";
	import { Badge } from "$saas/components/badge";
	import { Avatar } from "$saas/components/avatar";
	import { Text } from "$saas/typography/text";
	import { VStack, HStack } from "$saas/layout/stack";
	import { Box } from "$saas/layout/box";
	import {
		Form,
		FormField,
		SubmitButton,
		useForm,
	} from "$saas/components/form";
	import { Icon } from "$saas/components/icon";
	import X from "phosphor-svelte/lib/X";
	import Check from "phosphor-svelte/lib/Check";
	import { cardVariants, cardSizes } from "../../utils";

	interface Props {
		story:
			| "basic"
			| "variants"
			| "sizes"
			| "withForm"
			| "withImage"
			| "horizontal"
			| "withAvatar";
	}

	let { story }: Props = $props();

	const signupForm = useForm({
		defaultValues: { firstName: "", lastName: "" },
		onSubmit: (values) => console.log(values),
	});
</script>

{#if story === "basic"}
	<Card.Root class="w-80">
		<Card.Body class="gap-2">
			<Avatar
				src="https://api.dicebear.com/9.x/shapes/svg?seed=nue"
				name="Nue Camp"
				size="lg"
				shape="rounded"
			/>
			<Card.Title class="mt-2">Nue Camp</Card.Title>
			<Card.Description>
				This is the card body. Lorem ipsum dolor sit amet, consectetur
				adipiscing elit. Curabitur nec odio vel dui euismod fermentum.
			</Card.Description>
		</Card.Body>
		<Card.Footer class="justify-end">
			<Button variant="outline">View</Button>
			<Button>Join</Button>
		</Card.Footer>
	</Card.Root>
{:else if story === "variants"}
	<VStack align="start" gap={4}>
		{#each cardVariants as variant}
			<VStack gap={2} class="items-start">
				<Text size="xs">{variant}</Text>
				<Card.Root class="w-80" {variant}>
					<Card.Body class="gap-2">
						<Avatar
							src="https://picsum.photos/200/300"
							name="Nue Camp"
							size="lg"
							shape="rounded"
						/>
						<Card.Title class="mt-2">Nue Camp</Card.Title>
						<Card.Description>
							This is the card body. Lorem ipsum dolor sit amet,
							consectetur adipiscing elit.
						</Card.Description>
					</Card.Body>
					<Card.Footer class="justify-end">
						<Button variant="outline">View</Button>
						<Button>Join</Button>
					</Card.Footer>
				</Card.Root>
			</VStack>
		{/each}
	</VStack>
{:else if story === "sizes"}
	<VStack gap={4}>
		{#each cardSizes as size}
			<VStack gap={2} class="items-start">
				<Text size="xs">{size}</Text>
				<Card.Root {size}>
					<Card.Header>
						<Card.Title>Card - {size}</Card.Title>
					</Card.Header>
					<Card.Body class="text-fg-muted">
						This is the card body. Lorem ipsum dolor sit amet,
						consectetur adipiscing elit.
					</Card.Body>
				</Card.Root>
			</VStack>
		{/each}
	</VStack>
{:else if story === "withForm"}
	<Form form={signupForm}>
		<Card.Root class="max-w-sm">
			<Card.Header>
				<Card.Title>Sign up</Card.Title>
				<Card.Description>
					Fill in the form below to create an account
				</Card.Description>
			</Card.Header>
			<Card.Body>
				<VStack gap={4} class="w-full">
					<FormField name="firstName" label="First Name" />
					<FormField name="lastName" label="Last Name" />
				</VStack>
			</Card.Body>
			<Card.Footer class="justify-end">
				<SubmitButton variant="glass">Save</SubmitButton>
			</Card.Footer>
		</Card.Root>
	</Form>
{:else if story === "withImage"}
	<Card.Root class="max-w-sm overflow-hidden">
		<img
			src="https://picsum.photos/seed/sofa/800/600"
			alt="Green double couch with wooden legs"
			class="w-full rounded-lg object-cover"
		/>
		<Card.Body class="gap-2">
			<Card.Title>Living room Sofa</Card.Title>
			<Card.Description>
				This sofa is perfect for modern tropical spaces, baroque
				inspired spaces.
			</Card.Description>
			<Text size="xl" class="mt-2 font-medium tracking-tight">$450</Text>
		</Card.Body>
		<Card.Footer class="gap-2">
			<Button variant="solid">Buy now</Button>
			<Button variant="ghost">Add to cart</Button>
		</Card.Footer>
	</Card.Root>
{:else if story === "horizontal"}
	<Card.Root class="max-w-xl flex-row overflow-hidden">
		<img
			src="https://picsum.photos/seed/latte/800/600"
			alt="Caffe Latte"
			class="max-w-52 rounded-lg object-cover"
		/>
		<Box>
			<Card.Body>
				<Card.Title class="mb-2">The perfect latte</Card.Title>
				<Card.Description>
					Caffe latte is a coffee beverage of Italian origin made with
					espresso and steamed milk.
				</Card.Description>
				<HStack class="mt-4">
					<Badge>Hot</Badge>
					<Badge>Caffeine</Badge>
				</HStack>
			</Card.Body>
			<Card.Footer>
				<Button>Buy Latte</Button>
			</Card.Footer>
		</Box>
	</Card.Root>
{:else if story === "withAvatar"}
	<Card.Root class="w-80">
		<Card.Body>
			<HStack class="mb-6 gap-3">
				<Avatar
					src="https://api.dicebear.com/9.x/shapes/svg?seed=nate"
					name="Nate Foss"
				/>
				<VStack gap={0}>
					<Text class="font-semibold" size="sm">Nate Foss</Text>
					<Text class="text-fg-muted" size="sm">@natefoss</Text>
				</VStack>
			</HStack>
			<Card.Description>
				<strong class="text-fg-default font-semibold">Nate Foss</strong>
				{" "}has requested to join your team. You can approve or decline
				their request.
			</Card.Description>
		</Card.Body>
		<Card.Footer>
			<Button variant="subtle" colour="red" class="flex-1">
				<Icon as={X} size="sm" />
				Decline
			</Button>
			<Button variant="subtle" colour="blue" class="flex-1">
				<Icon as={Check} size="sm" />
				Approve
			</Button>
		</Card.Footer>
	</Card.Root>
{/if}
