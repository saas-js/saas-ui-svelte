import Root from "./card-root.svelte";
import Header from "./card-header.svelte";
import Body from "./card-body.svelte";
import Footer from "./card-footer.svelte";
import Title from "./card-title.svelte";
import Description from "./card-description.svelte";

export { cardRoot, type CardVariants } from "./card-root.svelte";

export const CardRoot = Root;
export const CardHeader = Header;
export const CardBody = Body;
export const CardFooter = Footer;
export const CardTitle = Title;
export const CardDescription = Description;

export const Card = {
    Root,
    Header,
    Body,
    Footer,
    Title,
    Description,
};
