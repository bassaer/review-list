import axios from "axios";
import { Issue } from "../models/Issue";
import { Response } from "../models/Response"

export const getRepo = (url: string) => {
    return new Promise<Array<Issue>>((resolve, reject) => {
        axios
            .get(url)
            .then(res => resolve(parse(res.data)))
            .catch( err => reject(err));
    });
};

const parse = (body: any): Array<Issue> => {
    const response: Response = body
    const issues: Array<Issue> = response.items.map((item) => {
        return {
            id: item.number,
            title: item.title,
            comments: item.comments,
            url: item.html_url,
            createdAt: item.created_at,
            user: {
                login: item.user.login,
                iconUrl: item.user.avatar_url,
                htmlUrl: item.user.html_url
            }
        }
    });
    return issues;
}
