import type { ZodSchema, ZodError } from "zod";

export interface UseFormOptions<T extends Record<string, unknown>> {
	schema?: ZodSchema<T>;
	defaultValues: T;
	onSubmit: (values: T) => void | Promise<void>;
	onInvalid?: (errors: ZodError<T>) => void;
	mode?: "onChange" | "onBlur" | "onSubmit";
}

export function useForm<T extends Record<string, unknown>>({
	schema,
	defaultValues,
	onSubmit,
	onInvalid,
	mode = "onBlur",
}: UseFormOptions<T>) {
	let values = $state<T>({ ...defaultValues });
	let errors = $state<Partial<Record<keyof T, string>>>({});
	let touched = $state<Partial<Record<keyof T, boolean>>>({});
	let dirty = $state<Partial<Record<keyof T, boolean>>>({});
	let isSubmitting = $state(false);

	const validate = (field?: keyof T): boolean => {
		if (!schema) return true;
		const result = schema.safeParse(values);

		if (result.success) {
			if (field) delete errors[field];
			else errors = {};
			return true;
		}

		const issueMap = Object.fromEntries(
			result.error.issues.map((e) => [e.path[0], e.message]),
		) as Partial<Record<keyof T, string>>;

		if (field) {
			if (issueMap[field])
				errors = { ...errors, [field]: issueMap[field] };
			else delete errors[field];
			return !issueMap[field];
		}

		errors = issueMap;
		onInvalid?.(result.error);
		return false;
	};

	return {
		get values() {
			return values;
		},
		get errors() {
			return errors;
		},
		get isSubmitting() {
			return isSubmitting;
		},
		get isValid() {
			return !Object.keys(errors).length;
		},
		get isDirty() {
			return Object.values(dirty).some(Boolean);
		},
		getValue: (name: string) => values[name as keyof T],
		setValue: (name: string, value: unknown) => {
			const key = name as keyof T;
			values = { ...values, [key]: value };
			dirty = { ...dirty, [key]: value !== defaultValues[key] };
			if (mode === "onChange") validate(key);
		},
		getError: (name: string) => errors[name as keyof T],
		setTouched: (name: string) => {
			const key = name as keyof T;
			touched = { ...touched, [key]: true };
			if (mode === "onBlur") validate(key);
		},
		validate: () => validate(),
		reset: () => {
			values = { ...defaultValues };
			errors = {};
			touched = {};
			dirty = {};
			isSubmitting = false;
		},
		handleSubmit: async (e: SubmitEvent) => {
			e.preventDefault();
			touched = Object.fromEntries(
				Object.keys(defaultValues).map((k) => [k, true]),
			) as Partial<Record<keyof T, boolean>>;
			if (!validate()) return;
			isSubmitting = true;
			try {
				await onSubmit(values);
			} finally {
				isSubmitting = false;
			}
		},
	};
}

export type FormApi = ReturnType<typeof useForm>;
