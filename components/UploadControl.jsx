import React, { useContext } from "react";
import AppContext from "@/context/AppContext";
import { faCloudArrowUp, faGhost } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { weaverStates } from "@/lib/services";

const UploadControl = () => {
	const { crawler } = useContext(AppContext);

	if (crawler.getState() != weaverStates.active) return;

	const upload = crawler.getUpload();
	const [active, [icon, variant]] = [
		upload,
		upload
			? [faCloudArrowUp, "outline-success"]
			: [faGhost, "outline-danger"],
	];

	return (
		<Button
			className="shadow"
			variant={variant}
			active={active}
			onClick={(_) => {
				crawler.setUpload(!upload);
			}}
		>
			<FontAwesomeIcon icon={icon} />
		</Button>
	);
};

export default UploadControl;
