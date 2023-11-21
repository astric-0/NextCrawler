import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PanelTitle = ({ title, icon }) => (
	<h3 className="fw-bold">
		<FontAwesomeIcon className="mx-2" icon={icon} />
		<span>{title}</span>
	</h3>
);

export default PanelTitle;
