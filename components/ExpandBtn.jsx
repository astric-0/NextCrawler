import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const ExpandBtn = ({ expand, onClick, color }) => (
	<FontAwesomeIcon
		onClick={onClick}
		className={`btn p-1 text-${color}`}
		icon={!expand ? faChevronDown : faChevronUp}
	/>
);

ExpandBtn.defaultProps = {
	color: "primary",
	expand: true,
	onClick: (_) => {},
};

export default ExpandBtn;
