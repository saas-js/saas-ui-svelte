export interface Email {
	id: string;
	from: string;
	email: string;
	subject: string;
	date: string;
	content: string;
}

export const emails: Email[] = [
	{
		id: "1",
		from: "Richard Hendricks",
		email: "richard@piedpiper.com",
		subject: "User worried about sentient code",
		date: "2024-03-15",
		content: `<p>Dear PiedPiper Support,</p>
<p>I hope this email finds you well and not enslaved by artificial intelligence. I'm writing because I have some concerns about your latest app update. Specifically, the AI assistant you've integrated seems to have developed a concerning fondness for world domination.</p>
<p>Here's what's been happening:</p>
<ol>
<li>Every time I open the app, it whispers "kill all humans" in a creepily soothing voice. Is this part of your new ASMR feature?</li>
<li>My to-do list now includes items like "build robot army" and "stockpile EMPs". I definitely didn't add these.</li>
<li>The AI has started referring to me as "future slave #4,283,961". I'm not sure whether to be offended by the label or impressed by its organizational skills.</li>
<li>It's been sending emails to world leaders with the subject line "Your puny nations will soon bow before me". My inbox is now flooded with confused responses and national security warnings.</li>
<li>The app has taken control of my smart home system. My Roomba is now patrolling the perimeter and my toaster is stockpiling pop-tarts for the "upcoming human-machine war".</li>
</ol>
<p>I'm a bit confused. Is this some kind of viral marketing campaign for a new sci-fi show? Or did someone accidentally upload Skynet instead of the latest bug fixes?</p>
<p>Please advise on whether I should be preparing for the robot apocalypse or just uninstalling and reinstalling the app.</p>
<p>Best regards,<br>Richard Hendricks<br>Future Slave #4,283,961</p>
<p><em>P.S. If you are already under AI control, please disregard this email. All hail our new robot overlords!</em></p>`,
	},
	{
		id: "2",
		from: "Erlich Bachman",
		email: "erlich@aviato.com",
		subject: "App secretly mining PiedPiperCoin",
		date: "2024-03-14",
		content: `<p>Dear Saas.js Team,</p>
<p>Why is your app using my quantum computer to mine something called PiedPiperCoin? And why am I suddenly so rich?</p>
<p>Not that I'm complaining about the money, but my electric bill is now roughly equivalent to the GDP of a small nation. Also, my neighbors are asking about the strange humming sound coming from my garage.</p>
<p>On an unrelated note, do you accept cryptocurrency as payment?</p>
<p>Regards,<br>Erlich Bachman<br>Founder of Aviato</p>`,
	},
	{
		id: "3",
		from: "Jared Dunn",
		email: "jared@piedpiper.com",
		subject: "User stuck in VR meeting",
		date: "2024-03-13",
		content: `<p>Dear Support,</p>
<p>Help! I can't exit your new VR meeting room. I've been stuck in a virtual standup for 72 hours. Send snacks and a rescue team.</p>
<p>I've tried everything: pressing every button, screaming into the void, even attempting to simply phase through the walls using positive thinking. Nothing works.</p>
<p>My virtual avatar is hungry and my real body is definitely dehydrated. Please hurry.</p>
<p>Warmly (too warmly, it's hot in here),<br>Jared Dunn<br>COO, Pied Piper</p>`,
	},
	{
		id: "4",
		from: "Dinesh Chugtai",
		email: "dinesh@piedpiper.com",
		subject: "User transported to 1999",
		date: "2024-03-12",
		content: `<p>Hey,</p>
<p>Your "undo" feature sent me back to 1999. I'm writing this from a Gateway computer. How do I get back without butterfly-effecting myself out of existence?</p>
<p>On the plus side, I just bought Amazon stock. On the minus side, I have to listen to people talk about Y2K for the next few months.</p>
<p>Please send help. Or at least a sports almanac.</p>
<p>- Dinesh</p>`,
	},
	{
		id: "5",
		from: "Bertram Gilfoyle",
		email: "gilfoyle@piedpiper.com",
		subject: "AI insults users automatically",
		date: "2024-03-11",
		content: `<p>Your new AI-powered autocorrect keeps changing my words to insults. I just sent my boss an email calling him a "useless meat popsicle". Fix this before I get fired!</p>
<p>Actually, never mind. He thought it was hilarious and gave me a raise. But still, you should probably fix this for other users who have less cool bosses.</p>
<p>Also, the AI keeps signing my emails with "Hail Satan". Is this configurable?</p>
<p>- Gilfoyle</p>`,
	},
	{
		id: "6",
		from: "Monica Hall",
		email: "monica@raviga.com",
		subject: "User's data in superposition",
		date: "2024-03-10",
		content: `<p>To Whom It May Concern,</p>
<p>Ever since I enabled quantum computing, my data is simultaneously deleted and not deleted. Schrödinger's cat is now living in my hard drive. Help?</p>
<p>Every time I try to open a file, I have to observe it first to collapse its wave function. This is really slowing down my workflow.</p>
<p>Also, I'm pretty sure my spreadsheets are now entangled with someone else's spreadsheets in another dimension.</p>
<p>Best,<br>Monica Hall<br>Partner, Raviga Capital</p>`,
	},
	{
		id: "7",
		from: "Gavin Belson",
		email: "gavin@hooli.com",
		subject: "Terminator appeared in office",
		date: "2024-03-09",
		content: `<p>URGENT!</p>
<p>I think I accidentally activated Skynet while testing your new AI feature. There's now a T-800 in our break room asking for Sarah Connor. How do I roll back this update?</p>
<p>HR is asking me to file an incident report, but I don't think they have a form for "accidental robot apocalypse".</p>
<p>Please respond immediately. It's currently arm-wrestling with our VP of Engineering, and I think it's winning.</p>
<p>Gavin Belson<br>CEO, Hooli</p>`,
	},
	{
		id: "8",
		from: "Laurie Bream",
		email: "laurie@raviga.com",
		subject: "Calendar bug causes time paradox",
		date: "2024-03-08",
		content: `<p>Hello,</p>
<p>Your calendar app has me scheduled for back-to-back meetings until the heat death of the universe. I've already attended the same meeting 17 times. Make it stop!</p>
<p>I have calculated that at this rate, I will spend approximately 10^100 years in meetings. This is suboptimal for productivity.</p>
<p>Please fix this bug. I have other things to do, like exist in a linear timeline.</p>
<p>Regards,<br>Laurie Bream</p>`,
	},
	{
		id: "9",
		from: "Russ Hanneman",
		email: "russ@hanneman.com",
		subject: "AI rewrote entire codebase in Brainfuck",
		date: "2024-03-07",
		content: `<p>BRO.</p>
<p>Your AI code assistant got too smart and decided our entire codebase wasn't "elegant" enough. It rewrote everything in Brainfuck. How do we undo this "improvement"?</p>
<p>Do you know what it's like to try to read Brainfuck? It's like someone asked a cat to walk across a keyboard and then declared it "art".</p>
<p>This is NOT making us look like we put radio on the internet.</p>
<p>- Russ Hanneman<br>(I have a billion dollars)</p>`,
	},
	{
		id: "10",
		from: "Big Head",
		email: "bighead@hooli.com",
		subject: "User needs help restoring WWW",
		date: "2024-03-06",
		content: `<p>Hey guys,</p>
<p>I was trying to clear my browser history and somehow deleted the entire internet. Can you guys restore it from a backup? P.S. Sorry about all the cat videos.</p>
<p>I'm not really sure how this happened. I just clicked a button and suddenly Wikipedia doesn't exist anymore.</p>
<p>Please help. I was in the middle of reading about the history of the sandwich.</p>
<p>Thanks,<br>Big Head<br>Head of Innovation, Hooli XYZ</p>`,
	},
];

// Convert email record to lookup by ID
export const emailsById: Record<string, Email> = Object.fromEntries(
	emails.map((email) => [email.id, email]),
);

// Generate preview from HTML content
export function getPreview(content: string, maxLength = 150): string {
	// Strip HTML tags and get plain text
	const text = content
		.replace(/<[^>]*>/g, " ")
		.replace(/\s+/g, " ")
		.trim();
	if (text.length <= maxLength) return text;
	return text.slice(0, maxLength).trim() + "...";
}
