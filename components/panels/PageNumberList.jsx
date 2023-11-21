import React, { useEffect, useState } from "react";
import { Container, ButtonGroup, ToggleButton, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

const PageNumberList = ({
	variant,
	start,
	end,
	current,
	setCurrent,
	max,
	refresh,
	children,
	checkRefresh,
}) => {
	const btnList = [];
	const [window, setWindow] = useState({ left: end, right: end - max });

	useEffect(
		(_) => {
			if (checkRefresh()) setWindow({ left: end, right: end - max });
		},
		[refresh()]
	);

	for (let i = window.left; i > start && i > window.right; i--) {
		btnList.push(
			<ToggleButton
				key={i}
				type="radio"
				active={i == current}
				variant={"outline-" + variant}
				onClick={(_) => {
					setCurrent(i);
				}}
			>
				{i}
			</ToggleButton>
		);
	}

	if (end == 0) return <></>;

	const shiftLeft = (_) => {
		window.left = window.left + max > end ? end : window.left + max;
		window.right = window.left - max;
		setWindow({ ...window });
	};

	const shiftRight = (_) => {
		window.left =
			window.left - max < start + max
				? start + max > end
					? end
					: start + max
				: window.left - max;
		window.right = window.left - max;
		setWindow({ ...window });
	};

	const arrowClasses = `mx-2 text-${variant}`;
	return (
		<Container className="mb-3 fixed-bottom">
			<div className="d-flex justify-content-center">
				{children}
				<Button
					variant="outline"
					className={arrowClasses}
					onClick={shiftLeft}
				>
					<FontAwesomeIcon icon={faCaretLeft} />
				</Button>
				<ButtonGroup className="shadow w-50">{btnList}</ButtonGroup>
				<Button
					variant="outline"
					className={arrowClasses}
					onClick={shiftRight}
				>
					<FontAwesomeIcon icon={faCaretRight} />
				</Button>
			</div>
		</Container>
	);
};

PageNumberList.defaultProps = {
	variant: "primary",
	start: 0,
	end: 0,
	steps: 10,
	current: 0,
	setCurrent: (_) => {},
	max: 10,
	refresh: (_) => {},
	checkRefresh: (_) => true,
};

export default PageNumberList;
