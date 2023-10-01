import { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import config from "@/config";

import { SourceField } from "@/components";

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
                    xxl="4" 
                    value={ sourceState.defaultUrl } 
                    onChange={ setter('defaultUrl') } 
                />

                <SourceField
                    type="number"
                    label="Interval Gap"
                    xxl="3"
                    value={ sourceState.intervalGap }
                    onChange={ setter('intervalGap') }
                />

                <SourceField
                    type="number"
                    label="Interval Request Limit"
                    xxl="3"
                    value={ sourceState.intervalRequestLimit }
                    onChange={ setter('intervalRequestLimit') }
                />
                
            </Row>

            <Row className="justify-content-between">
                <SourceField
                    type="number"
                    label="Max Host Limit"
                    xxl="3"
                    value={ sourceState.maxHostLimit }
                    onChange={ setter('maxHostLimit') }
                />

                <SourceField
                    type="number"
                    label="Link Limit"
                    xxl="3"
                    value={ sourceState.linkLimit }
                    onChange={ setter('linkLimit') }
                />

                <SourceField 
                    label="Target Directory"
                    xxl="3"
                    value={ sourceState.targetDir }
                    onChange={ setter('targetDir') }
                />
            </Row>
        </Form>
    );
}

export default SourceForm;