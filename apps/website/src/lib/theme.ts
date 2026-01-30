export type Theme = "dark" | "light";

export function getTheme(): Theme {
	if (typeof window === "undefined") return "light";
	const stored = localStorage.getItem("theme");
	if (stored === "dark" || stored === "light") return stored;
	return matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
}

export function toggleTheme(): Theme {
	const html = document.documentElement;
	const newTheme: Theme = html.classList.contains("dark") ? "light" : "dark";
	html.classList.add("no-transitions");
	html.classList.replace(newTheme === "dark" ? "light" : "dark", newTheme);
	localStorage.setItem("theme", newTheme);
	requestAnimationFrame(() => html.classList.remove("no-transitions"));
	return newTheme;
}

export const themeInitScript = `(function(){var d=document.documentElement,t=localStorage.getItem("theme")||(matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light");d.classList.add(t)})()`;
