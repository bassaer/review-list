import React from "react";
import { Issue } from "../models/Issue";
import "../styles/Issue.scss"

const IssueBox: React.FC<Issue> = props => {
    return (
        <li className="collection-item avatar repo-item">
            <img src={props.user.iconUrl} className="circle" alt="auther icon"/>
            <span className="title-container">
                <h6 className="teal-text title">
                    {props.title}
                </h6>
                <p>
                    #{props.id} opened {props.createdAt} by {props.user.login}
                </p>
            </span>
            <span className="teal white-text badge">
                {props.comments}
            </span>
        </li>
    );
};

export default IssueBox;
