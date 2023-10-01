import { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import config from "@/config";

import SourceField from "./SourceField";

const SourceForm = _ => {
    const [sourceState, setSourceState] = useState({ ...config });
    const setter = fieldname =>
        event =>
            setSourceState({ ...sourceState, [fieldname]: event.target.value.trim() });

    return (
        <Form> 
            <Row className="justify-content-between">
                <SourceField 
                    label="Url" 
                    md="4" 
                    value={ sourceState.defaultUrl } 
                    onChange={ setter('defaultUrl') } 
                />

                <SourceField
                    type="number"
                    label="Interval Gap"
                    md="3"
                    value={ sourceState.intervalGap }
                    onChange={ setter('intervalGap') }
                />

                <SourceField
                    type="number"
                    label="Interval Request Limit"
                    md="3"
                    value={ sourceState.intervalGap }
                    onChange={ setter('intervalGap') }
                />
                
            </Row>

            <Row className="justify-content-between">
                <SourceField
                    type="number"
                    label="Max Host Limit"
                    md="3"
                    value={ sourceState.maxHostLimit }
                    onChange={ setter('maxHostLimit') }
                />

                <SourceField
                    type="number"
                    label="Link Limit"
                    md="3"
                    value={ sourceState.linkLimit }
                    onChange={ setter('linkLimit') }
                />

                <SourceField 
                    label="Target Directory"
                    md="3"
                    value={ sourceState.targetDir }
                    onChange={ setter('targetDir') }
                />
            </Row>
        </Form>
    );
}

export default SourceForm;