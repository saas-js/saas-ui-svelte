import React from "react";
import {
	Title,
	Subtitle,
	Description,
	Primary,
	Stories,
	useOf,
} from "@storybook/addon-docs/blocks";

interface SubComponentProp {
	type: string;
	default: string;
	description: string;
}

interface SubComponent {
	name: string;
	description: string;
	props: Record<string, SubComponentProp>;
}

function SubComponentsSection() {
	const resolvedOf = useOf("meta");

	if (resolvedOf.type !== "meta") {
		return null;
	}

	const subComponents = resolvedOf.preparedMeta?.parameters
		?.subComponents as SubComponent[];

	if (!subComponents || subComponents.length === 0) {
		return null;
	}

	return (
		<div className="subcomponents-section">
			<h2
				style={{
					fontSize: "1.25rem",
					fontWeight: 700,
					marginTop: "2.5rem",
					marginBottom: "1rem",
				}}
			>
				Component API
			</h2>
			{subComponents.map((component) => (
				<div key={component.name} style={{ marginBottom: "2rem" }}>
					<h3
						style={{
							fontSize: "1rem",
							fontWeight: 600,
							marginBottom: "0.5rem",
							fontFamily: "monospace",
						}}
					>
						{component.name}
					</h3>
					{component.description && (
						<p
							style={{
								marginBottom: "1rem",
								color: "var(--sb-color-text-secondary, #666)",
							}}
						>
							{component.description}
						</p>
					)}
					<table
						style={{
							width: "100%",
							borderCollapse: "collapse",
							fontSize: "0.875rem",
						}}
					>
						<thead>
							<tr
								style={{
									borderBottom:
										"1px solid var(--sb-color-border, #e0e0e0)",
								}}
							>
								<th
									style={{
										textAlign: "left",
										padding: "0.75rem 1rem",
										fontWeight: 600,
									}}
								>
									Prop
								</th>
								<th
									style={{
										textAlign: "left",
										padding: "0.75rem 1rem",
										fontWeight: 600,
									}}
								>
									Type
								</th>
								<th
									style={{
										textAlign: "left",
										padding: "0.75rem 1rem",
										fontWeight: 600,
									}}
								>
									Default
								</th>
								<th
									style={{
										textAlign: "left",
										padding: "0.75rem 1rem",
										fontWeight: 600,
									}}
								>
									Description
								</th>
							</tr>
						</thead>
						<tbody>
							{Object.entries(component.props).map(
								([propName, propInfo]) => (
									<tr
										key={propName}
										style={{
											borderBottom:
												"1px solid var(--sb-color-border, #e0e0e0)",
										}}
									>
										<td
											style={{
												padding: "0.75rem 1rem",
												fontFamily: "monospace",
												color: "var(--sb-color-text-primary, #333)",
											}}
										>
											{propName}
										</td>
										<td
											style={{
												padding: "0.75rem 1rem",
												fontFamily: "monospace",
												color: "var(--sb-color-text-secondary, #666)",
											}}
										>
											{propInfo.type}
										</td>
										<td
											style={{
												padding: "0.75rem 1rem",
												fontFamily: "monospace",
												color: "var(--sb-color-text-secondary, #666)",
											}}
										>
											{propInfo.default}
										</td>
										<td
											style={{
												padding: "0.75rem 1rem",
												color: "var(--sb-color-text-secondary, #666)",
											}}
										>
											{propInfo.description}
										</td>
									</tr>
								),
							)}
						</tbody>
					</table>
				</div>
			))}
		</div>
	);
}

export function DocsPage() {
	return (
		<>
			<Title />
			<Subtitle />
			<Description />
			<Primary />
			<SubComponentsSection />
			<Stories />
		</>
	);
}
