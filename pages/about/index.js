import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import config from "@/config";
import { Info2 } from "@/components";

const About = () => {
	const [imgUrls, setImgUrls] = useState({});
	const [isPending, setIsPending] = useState(true);

	useEffect(() => {
		(async function () {
			try {
				const response = await fetch(config.imgListUrl);
				if (response.status == 200) setImgUrls(await response.json());
			} catch (error) {
				console.error(error);
			}

			setIsPending(false);
		})();
	}, []);

	if (isPending) return <></>;

	return (
		<Container className="p-2">
			<Info2.ProjectCard src={config.imgUrl + "/" + imgUrls.projectImg} />
			<Info2.KeywordCard />
			<Info2.RequirementsList
				src={config.imgUrl + "/" + imgUrls.requirementImg}
			/>
		</Container>
	);
};

export default About;
