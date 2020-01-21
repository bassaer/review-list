import { Issue } from '../models/Issue';
import { Target } from '../models/Target';
import { Config } from '../models/Config';

const BADGE_COLOR = {color: "#FF0000"};
const API_URL = "http://localhost:8000";

interface RepoList {
    items: Array<Issue>
}

type IssueMap = Map<number, number>;
type Storage = {
    urls: Array<string>,
    issues: IssueMap
}

/**
 * TODO : load periodInMinutes from config(interval)
 */
chrome.alarms.create("watch_repo", { periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener((alerm: chrome.alarms.Alarm) => {
    if (alerm.name !== "watch_repo") {
        return;
    }
    run()
});

const run = () => {
    let curRepo: IssueMap

    loadStorage()
        .then((result: Storage) => {
            return loadIssues()
        })
        .then(repo => {
            curRepo = repo
            return fetch(API_URL)
        })
        .then(async(res): Promise<void> => {
            return res.json()
        })
        .then((data: any) => {
            const newRepo = parse(data as RepoList);
            const diff = compare(curRepo, newRepo);
            if (diff) {
                setBadge(diff.toString())
            }
        })
        .catch((err) => {
            console.error(err)
        });
}

const loadStorage = (): Promise<Storage> => {
    return new Promise( resolve => {
        chrome.storage.local.get(['config', 'issues'], data => {
            const urls: Array<string> = []
            const issues = new Map<number, number>();
            if (data && data.config) {
                data.config.targets.forEach((target: Target) => {
                    urls.push(target.url) ;
                });
            if (data && data.issues) {
                (data.issues as Array<Issue>).forEach(issue => {
                    issues.set(issue.id, issue.comments);
                });
            }           }
            resolve({urls: urls, issues: issues});
        });
    });
}

const compare = (curRepo: IssueMap, newRepo: IssueMap): number => {
    let count = 0;
    newRepo.forEach((value, key) => {
        const curComments = curRepo.get(key);
        if (typeof curComments === 'undefined') {
            count++;
            return;
        }
        count += value - curComments === 0 ? 0 : 1
    })
    return count
}

const parse = (repos: RepoList): IssueMap => {
    const result = new Map<number, number>();
    repos.items.forEach(repo => {
        result.set(repo.id, repo.comments);
    });
    return result;
}

const setBadge = (msg: string) => {
    chrome.browserAction.setBadgeText({text: msg});
    chrome.browserAction.setBadgeBackgroundColor(BADGE_COLOR);
}

const notify = (count: number) => {
    const options = {
        type: 'basic',
        iconUrl: "assets/icon_48.png",
        title: "counter",
        message: `count is ${count}`,
    }
    chrome.notifications.create(options)
};

run();
