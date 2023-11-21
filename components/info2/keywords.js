const keywords = [
	{
		keyword: "webCrawler",
		title: "Web Crawler",
		detail: `A web crawler, also known as a web spider, web robot, or web scutter, is a program or automated script that systematically navigates the World Wide Web, visiting websites and collecting data from web pages. Web crawlers are commonly used for various purposes, including search engine indexing, web scraping, data mining, and website monitoring.`,
		lists: [
			{
				listTitle: "Purpose",
				keyPoints: [
					{
						itemTitle: "Indexing Webpages",
						itemDetail:
							"Web crawlers are used by search engines to discover and index webpages on the internet. They systematically browse through webpages, following links, and collecting information about the content of those pages.",
					},
					{
						itemTitle: "Gathering Information",
						itemDetail:
							"Web crawlers are used to collect data from websites for various purposes, such as data mining, content scraping, market research, and competitive analysis. They enable organizations to gather information from a large number of webpages efficiently.",
					},
					{
						itemTitle: "Monitoring Websites",
						itemDetail:
							"Web crawlers can be used to monitor websites for changes or updates. They can periodically crawl webpages and notify website owners or administrators about any modifications or issues detected.",
					},
				],
			},
		],
	},

	{
		keyword: "nextjs",
		title: "Next js",
		detail: "Next.js is a popular and open-source JavaScript framework that is built on top of React. It is designed for building web applications, and it provides a set of tools and features that simplify the development process and improve the performance and user experience of web applications",
		lists: [
			{
				listTitle: "Features",
				keyPoints: [
					{
						itemTitle: "Server-Side Rendering (SSR)",
						itemDetail:
							"Next.js supports server-side rendering out of the box, which means that the initial rendering of pages happens on the server, improving performance and SEO. It allows you to create dynamic web applications while maintaining the advantages of server-side rendering",
					},
					{
						itemTitle: "Static Site Generation (SSG)",
						itemDetail:
							"Next.js can also generate static HTML files at build time, which is a great option for content-heavy websites. This approach can significantly improve loading speed and scalability.",
					},
					{
						itemTitle: "Routing",
						itemDetail:
							"Next.js has a file-based routing system. You can create routes simply by organizing your project files and folders in the pages directory.",
					},
				],
			},
		],
	},

	{
		keyword: "reactjs",
		title: "React js",
		detail: "React, is an open-source JavaScript library for building user interfaces. It was developed and is maintained by Facebook and a community of individual developers and companies. React is a popular choice for creating interactive and dynamic user interfaces for web applications",
		lists: [
			{
				listTitle: "Features",
				keyPoints: [
					{
						itemTitle: "Component-Based",
						itemDetail:
							"React is built around the concept of reusable components. Components are self-contained, independent units of the user interface that can be composed to create complex UIs. This component-based architecture promotes reusability, maintainability, and scalability.",
					},
					{
						itemTitle: "Virtual DOM",
						itemDetail:
							"React uses a virtual representation of the DOM (Document Object Model) to optimize rendering performance. Instead of updating the actual DOM directly, React compares the virtual DOM to the real DOM and updates only the parts that have changed. This minimizes the number of updates and enhances the performance of web applications.",
					},
					{
						itemTitle: "JSX",
						itemDetail:
							"React introduces JSX (JavaScript XML), which is an extension to JavaScript that allows you to write HTML-like code within your JavaScript code. JSX makes it easier to define the structure of your components and is transpiled to regular JavaScript by build tools.",
					},
				],
			},
		],
	},
];

export default keywords;
