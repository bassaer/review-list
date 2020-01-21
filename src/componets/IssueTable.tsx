import React from "react";
import { Collapsible, CollapsibleItem } from "react-materialize";
import IssueBox from "./IssueBox";
import { Target } from "../models/Target";
import { parseReponame } from "../utils/url";

const IssueTable: React.FC<Target> = props => {
    const rows = Object.values(props.issues).map((issue) =>
        <IssueBox {...issue} />
    );
    return (
        <Collapsible>
            <CollapsibleItem header={parseReponame(props.url)} iconClassName="code">
                <ul className="collection">
                    {rows}
                </ul>
            </CollapsibleItem>
        </Collapsible>
    );
};

export default IssueTable;
