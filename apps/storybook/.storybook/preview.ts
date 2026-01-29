import type { Preview } from "@storybook/sveltekit";
import { themes } from "storybook/theming";
import { DocsPage } from "./DocsPage";
import "../app.css";

const preview: Preview = {
	tags: ["autodocs"],
	parameters: {
		docs: {
			page: DocsPage,
		},
		backgrounds: {
			disabled: true,
		},

		darkMode: {
			current: "light",
			classTarget: "html",
			darkClass: "dark",
			lightClass: "light",
			stylePreview: true,
			dark: {
				...themes.dark,
			},
			light: {
				...themes.normal,
			},
		},

		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},

		a11y: {
			// 'todo' - show a11y violations in the test UI only
			// 'error' - fail CI on a11y violations
			// 'off' - skip a11y checks entirely
			test: "todo",
		},
	},
};

if (typeof window !== "undefined") {
	// Added optional chaining and checks to prevent SSR errors
	const docHtml = document.documentElement;
	let isDark = docHtml.classList.contains("dark");

	const observer = new MutationObserver(() => {
		const currentlyDark = docHtml.classList.contains("dark");

		if (currentlyDark !== isDark) {
			isDark = currentlyDark;

			docHtml.classList.add("no-transitions");

			window.requestAnimationFrame(() => {
				window.requestAnimationFrame(() => {
					docHtml.classList.remove("no-transitions");
				});
			});
		}
	});

	observer.observe(docHtml, {
		attributes: true,
		attributeFilter: ["class"],
	});
}

export default preview;
