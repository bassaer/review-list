import React from 'react';
import '../styles/App.scss';
import IssueTable from './IssueTable';
import { Issue } from "../models/Issue";
import { getRepo } from "../api/Client";
import { Target } from '../models/Target';

class App extends React.Component {
    targets: Array<Target>
    err?: string
    debug: Array<string>

  constructor(props: any) {
    super(props)
    this.targets = [];
    this.debug = [];
    this.state = {
      loading: true
    };
    this.load();
  }

  load() {
    new Promise<Array<string>>(resolve => {
        chrome.storage.local.get('config', data => {
            const urls: Array<string> = [];
            if (data && data.config) {
                data.config.targets.forEach((target: Target) => {
                    urls.push(target.url) ;
                });
            }
            resolve(urls)
        });
    }).then(urls => {
        for (const url of urls) {
            getRepo(url)
                // eslint-disable-next-line no-loop-func
                .then((issues: Array<Issue>) => {
                    this.targets.push({url: url, issues: issues})
                    chrome.storage.local.set({targets: this.targets});
                    this.setState({
                        loading: false
                    });
                })
            .catch(err => {
                this.err = `url: ${url}, err: ${err}`;
                console.error(this.err);
                this.setState({
                    loading: false
                })
            });
        }

    });
  }

    build() {
        const results: Array<JSX.Element> = []
        for (const target of this.targets) {
            results.push(<IssueTable {...target}/> )
        }
        if (results.length > 0) {
            return <React.Fragment>{results}</React.Fragment>
        }
        return <p>{ this.err ? this.err : 'No Repositories' }</p>
    }

  save() {
    if (chrome && chrome.storage && chrome.storage.local) {
        chrome.storage.local.set({targets: this.targets})
    }
  }

  openOptionPage() {
    if (chrome && chrome.runtime && chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage()
    }
  }

  componentDidMount() {
    if (chrome && chrome.browserAction && chrome.browserAction.setBadgeText) {
        chrome.browserAction.setBadgeText({text: ""})
    }
  }

  debugger() {
      const result: Array<JSX.Element> = [];
      for (const item of this.debug) {
        result.push(<p>{item}</p>)
      }
      return result;
  }

  render() {
    this.save()
    return (
      <div className="App">
        <button onClick={this.openOptionPage}>options</button>
        { this.build() }
        {this.debug.length > 0 && this.debugger()}
      </div>
    );
  }

}

export default App;
