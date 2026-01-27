<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import {
		Form,
		FormField,
		SubmitButton,
		DisplayIf,
		useForm,
	} from "$saas/components/form";
	import { VStack, HStack } from "$saas/layout/stack";
	import { commonArgTypes, getControls } from "../utils";
	import { z } from "zod";

	const { Story } = defineMeta({
		title: "components/Form",
		component: Form,
		argTypes: {
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: { controls: getControls(["children", "class"]) },
	});

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
</script>

{#snippet basicStory()}
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
{/snippet}

{#snippet validationStory()}
	{@const validationForm = useForm({
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
{/snippet}

{#snippet fieldTypesStory()}
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
{/snippet}

{#snippet conditionalStory()}
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
			<DisplayIf name="showAge" condition={(v) => v === true}>
				<FormField name="age" type="number" label="Age" />
			</DisplayIf>
			<SubmitButton>Submit</SubmitButton>
		</VStack>
	</Form>
{/snippet}

{#snippet submitOptionsStory()}
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
{/snippet}

<Story name="Basic" template={basicStory} />
<Story name="With Validation" template={validationStory} />
<Story name="Field Types" template={fieldTypesStory} />
<Story name="Conditional Fields" template={conditionalStory} />
<Story name="Submit Options" template={submitOptionsStory} />
