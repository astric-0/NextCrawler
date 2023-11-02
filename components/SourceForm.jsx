import { useContext } from "react";
import { Form } from "react-bootstrap";

import AppContext from "@/context/AppContext";
import { SourceField, SourceCMChoice } from "@/components";

const SourceForm = _ => {    
    const { sourceState, setSourceState } = useContext(AppContext);
    const setter = fieldname =>
        event =>
            setSourceState({ ...sourceState, [fieldname]: event.target.value.trim() });

    return (
        <Form>

            <SourceField
                label="Url"
                xs="12"
                value={sourceState.defaultUrl}
                onChange={setter('defaultUrl')}
            />
            
            <SourceCMChoice />

            <SourceField
                type="number"
                label="Interval Gap"
                xs="12"
                value={sourceState.intervalGap}
                onChange={setter('intervalGap')}
            />

            <SourceField
                type="number"
                label="Interval Request Limit"
                xs="12"
                value={sourceState.intervalRequestLimit}
                onChange={setter('intervalRequestLimit')}
            />

            <SourceField
                type="number"
                label="Max Host Limit"
                xs="12"
                value={sourceState.maxHostLimit}
                onChange={setter('maxHostLimit')}
            />

            <SourceField
                type="number"
                label="Link Limit"
                xs="12"
                value={sourceState.linkLimit}
                onChange={setter('linkLimit')}
            />

            <SourceField
                label="Prefix"
                xs="12"
                value={sourceState.targetDir}
                onChange={setter('targetDir')}
            />

            <Form.Check 
                className="mt-3" 
                type="switch" 
                label="Opt For Indexing" 
                onClick={_ => setSourceState({ ...sourceState, 'upload': !sourceState.upload })}
            />
        </Form>
    );
}

export default SourceForm;