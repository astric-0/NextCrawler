import { useContext } from "react";
import { Form } from "react-bootstrap";

import AppContext from "@/context/AppContext";
import { SourceField, SourceCMChoice } from "@/components";
import {
	faHand,
	faLink,
	faRoadBarrier,
	faStarOfLife,
} from "@fortawesome/free-solid-svg-icons";
import { faHourglass } from "@fortawesome/free-regular-svg-icons";

const SourceForm = () => {
	const { sourceState, setSourceState } = useContext(AppContext);
	const setter = (fieldname) => (event) =>
		setSourceState({
			...sourceState,
			[fieldname]: event.target.value.trim(),
		});

	return (
		<Form>
			<SourceField
				label="Url"
				xs="12"
				value={sourceState.defaultUrl}
				icon={faLink}
				onChange={setter("defaultUrl")}
			/>

			<SourceCMChoice />

			<SourceField
				type="number"
				label="Interval Gap"
				xs="12"
				value={sourceState.intervalGap}
				icon={faHourglass}
				onChange={setter("intervalGap")}
			/>

			<SourceField
				type="number"
				label="Interval Request Limit"
				xs="12"
				value={sourceState.intervalRequestLimit}
				icon={faRoadBarrier}
				onChange={setter("intervalRequestLimit")}
			/>

			<SourceField
				type="number"
				label="Max Host Limit"
				xs="12"
				value={sourceState.maxHostLimit}
				icon={faRoadBarrier}
				onChange={setter("maxHostLimit")}
			/>

			<SourceField
				type="number"
				label="Link Limit"
				xs="12"
				value={sourceState.linkLimit}
				icon={faHand}
				onChange={setter("linkLimit")}
			/>

			<SourceField
				label="Prefix"
				xs="12"
				value={sourceState.targetDir}
				icon={faStarOfLife}
				onChange={setter("targetDir")}
			/>

			<Form.Check
				label="Opt For Indexing"
				className="mt-3"
				type="switch"
				onClick={(_) =>
					setSourceState({
						...sourceState,
						upload: !sourceState.upload,
					})
				}
			/>
		</Form>
	);
};

export default SourceForm;
