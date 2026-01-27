<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
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
	import X from "phosphor-svelte/lib/X";
	import Check from "phosphor-svelte/lib/Check";

	import {
		commonArgTypes,
		getControls,
		cardVariants,
		cardSizes,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Card",
		component: Card.Root,
		argTypes: {
			variant: {
				...commonArgTypes.variant,
				options: cardVariants,
				table: { defaultValue: { summary: "outline" } },
			},
			size: {
				...commonArgTypes.size,
				options: cardSizes,
				table: { defaultValue: { summary: "md" } },
			},
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls(["variant", "size", "children", "class"]),
		},
		args: {
			variant: "outline",
			size: "md",
		},
	});
</script>

<script lang="ts">
	const signupForm = useForm({
		defaultValues: { firstName: "", lastName: "" },
		onSubmit: (values) => console.log(values),
	});
</script>

{#snippet basicStory(args: any)}
	<Card.Root class="w-80" {...args}>
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
{/snippet}

{#snippet variantsStory()}
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
{/snippet}

{#snippet sizesStory()}
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
{/snippet}

{#snippet withImageStory()}
	<Card.Root class="max-w-sm overflow-hidden">
		<img
			src="https://picsum.photos/seed/sofa/800/600"
			alt="Green double couch with wooden legs"
			class="w-full object-cover rounded-lg"
		/>
		<Card.Body class="gap-2">
			<Card.Title>Living room Sofa</Card.Title>
			<Card.Description>
				This sofa is perfect for modern tropical spaces, baroque
				inspired spaces.
			</Card.Description>
			<Text size="xl" class="font-medium tracking-tight mt-2">$450</Text>
		</Card.Body>
		<Card.Footer class="gap-2">
			<Button variant="solid">Buy now</Button>
			<Button variant="ghost">Add to cart</Button>
		</Card.Footer>
	</Card.Root>
{/snippet}

{#snippet horizontalStory()}
	<Card.Root class="flex-row overflow-hidden max-w-xl">
		<img
			src="https://picsum.photos/seed/latte/800/600"
			alt="Caffe Latte"
			class="object-cover max-w-52 rounded-lg"
		/>
		<Box>
			<Card.Body>
				<Card.Title class="mb-2">The perfect latte</Card.Title>
				<Card.Description>
					Caffè latte is a coffee beverage of Italian origin made with
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
{/snippet}

{#snippet withAvatarStory()}
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
				<strong class="font-semibold text-fg-default">Nate Foss</strong>
				{" "}has requested to join your team. You can approve or decline
				their request.
			</Card.Description>
		</Card.Body>
		<Card.Footer>
			<Button variant="subtle" colour="red" class="flex-1">
				<X class="h-4 w-4" aria-hidden="true" />
				Decline
			</Button>
			<Button variant="subtle" colour="blue" class="flex-1">
				<Check class="h-4 w-4" aria-hidden="true" />
				Approve
			</Button>
		</Card.Footer>
	</Card.Root>
{/snippet}

{#snippet withFormStory()}
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
{/snippet}

<Story name="Basic" template={basicStory} />
<Story name="Variants" template={variantsStory} />
<Story name="Sizes" template={sizesStory} />
<Story name="With Form" template={withFormStory} />
<Story name="With Image" template={withImageStory} />
<Story name="Horizontal" template={horizontalStory} />
<Story name="With Avatar" template={withAvatarStory} />
