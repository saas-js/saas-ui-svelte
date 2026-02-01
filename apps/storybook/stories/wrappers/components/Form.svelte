<script lang="ts" module>
	// Wrapper components for complex Form stories
	// These are imported by Form.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import {
		Form,
		FormField,
		SubmitButton,
		DisplayIf,
		useForm,
	} from "$saas/components/form";
	import { VStack, HStack } from "$saas/layout/stack";
	import { z } from "zod";

	const selectOptions = [
		{ label: "Option 1", value: "1" },
		{ label: "Option 2", value: "2" },
		{ label: "Option 3", value: "3" },
	];

	const radioOptions = [
		{ label: "React", value: "react" },
		{ label: "Svelte", value: "svelte" },
		{ label: "Vue", value: "vue" },
	];

	interface Props {
		story:
			| "basic"
			| "withValidation"
			| "fieldTypes"
			| "conditionalFields"
			| "submitOptions";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	{@const basicForm = useForm({
		defaultValues: { name: "" },
		onSubmit: (values) => alert(JSON.stringify(values, null, 2)),
	})}
	<Form form={basicForm} class="w-full max-w-sm">
		<VStack gap={4}>
			<FormField name="name" label="Name" placeholder="Enter your name" />
			<SubmitButton>Submit</SubmitButton>
		</VStack>
	</Form>
{:else if story === "withValidation"}
	{@const validationForm = useForm({
		schema: z.object({
			name: z
				.string()
				.min(1, "Name is required")
				.regex(/^[\p{L}\s]+$/u, "Name must contain only letters"),
			email: z.string().email("Invalid email"),
		}),
		defaultValues: { name: "", email: "" },
		onSubmit: async (values) => {
			await new Promise((r) => setTimeout(r, 1500));
			alert(JSON.stringify(values, null, 2));
		},
	})}
	<Form form={validationForm} class="w-full max-w-sm">
		<VStack gap={4}>
			<FormField
				name="name"
				label="Name"
				placeholder="Enter your name"
				required
			/>
			<FormField
				name="email"
				type="email"
				label="Email"
				placeholder="email@example.com"
				required
			/>
			<SubmitButton loadingText="Submitting...">Submit</SubmitButton>
		</VStack>
	</Form>
{:else if story === "fieldTypes"}
	{@const fieldTypesForm = useForm({
		defaultValues: {
			text: "",
			email: "",
			password: "",
			number: 0,
			numberInput: 10,
			textarea: "",
			select: "",
			checkbox: false,
			radio: "svelte",
			switch: false,
			slider: 50,
			pinInput: ["", "", "", ""],
		},
		onSubmit: (values) => alert(JSON.stringify(values, null, 2)),
	})}
	<Form form={fieldTypesForm} class="w-full max-w-sm">
		<VStack gap={4}>
			<FormField name="text" label="Text" placeholder="Text input" />
			<FormField
				name="email"
				type="email"
				label="Email"
				placeholder="email@example.com"
			/>
			<FormField
				name="password"
				type="password"
				label="Password"
				placeholder="Password"
			/>
			<FormField name="number" type="number" label="Number" />
			<FormField
				name="numberInput"
				type="number-input"
				label="Number Input"
				min={0}
				max={100}
				step={5}
			/>
			<FormField
				name="textarea"
				type="textarea"
				label="Textarea"
				placeholder="Description..."
			/>
			<FormField
				name="select"
				type="select"
				label="Select"
				placeholder="Choose..."
				options={selectOptions}
			/>
			<FormField
				name="checkbox"
				type="checkbox"
				label="I agree to the terms"
			/>
			<FormField
				name="radio"
				type="radio"
				label="Framework"
				options={radioOptions}
			/>
			<FormField
				name="switch"
				type="switch"
				label="Enable notifications"
			/>
			<FormField
				name="slider"
				type="slider"
				label="Volume"
				min={0}
				max={100}
				step={1}
				colour="indigo"
			/>
			<FormField
				name="pinInput"
				type="pin-input"
				label="Verification Code"
				count={4}
			/>
			<SubmitButton>Submit</SubmitButton>
		</VStack>
	</Form>
{:else if story === "conditionalFields"}
	{@const conditionalForm = useForm({
		schema: z.object({
			name: z.string().min(1, "Required"),
			showAge: z.boolean(),
			age: z.number().optional(),
		}),
		defaultValues: { name: "", showAge: false, age: 0 },
		onSubmit: (values) => alert(JSON.stringify(values, null, 2)),
	})}
	<Form form={conditionalForm} class="w-full max-w-sm">
		<VStack gap={4}>
			<FormField name="name" label="Name" required />
			<FormField name="showAge" type="checkbox" label="Show age field" />
			<DisplayIf name="showAge" condition={(v: unknown) => v === true}>
				<FormField name="age" type="number" label="Age" />
			</DisplayIf>
			<SubmitButton>Submit</SubmitButton>
		</VStack>
	</Form>
{:else if story === "submitOptions"}
	{@const submitOptionsForm = useForm({
		schema: z.object({
			name: z.string().min(1, "Name is required"),
			email: z.string().email("Invalid email"),
		}),
		defaultValues: { name: "", email: "" },
		onSubmit: async (values) => {
			await new Promise((r) => setTimeout(r, 1500));
			alert(JSON.stringify(values, null, 2));
		},
	})}
	<Form form={submitOptionsForm} class="w-full max-w-sm">
		<VStack gap={4}>
			<FormField name="name" label="Name" required />
			<FormField name="email" type="email" label="Email" required />
			<HStack gap={2} class="flex-wrap">
				<SubmitButton>Default</SubmitButton>
				<SubmitButton disableIfUntouched variant="outline"
					>Disable if untouched</SubmitButton
				>
				<SubmitButton disableIfInvalid variant="subtle"
					>Disable if invalid</SubmitButton
				>
			</HStack>
		</VStack>
	</Form>
{/if}
