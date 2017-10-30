import * as React from 'react';
import styles from './App.module.scss';
import { IAppWebPartProps } from '../IAppWebPartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { HttpClient, IHttpClientOptions, HttpClientConfiguration } from '@microsoft/sp-http';

export interface IAppProps extends IAppWebPartProps {
  basicHttpClient: HttpClient;
}

export interface ITweetsState {
  tweets: ITweetsItem[];
}

export interface ITweetsItem {
  statuses: any,
  user: {
    name: string,
    screen_name: string,
    location: string
  },
  text: string,
  created_at: string
}

export default class App extends React.Component<IAppProps, {tweets: any}> {
  
  constructor(props: IAppProps, state: ITweetsState) {
    super(props);
    this.state = {
      tweets: []
    };
  }

  public render(): JSX.Element {
    const tweets: JSX.Element[] = this.state.tweets.map((tweet: ITweetsItem, k: number): JSX.Element => {
      return (
        <div key={k} className="tweet-post">  
          <h1>{tweet.user.name}</h1>
          <h5>{tweet.user.screen_name}</h5>
          <h5>{tweet.user.location}</h5>
          <h3>{tweet.text}</h3>
        </div>        
      )
    });

    return (
    <div>
      <div className={styles.container}>
        <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
          <div className="ms-Grid-col ms-lg10 ms-xl8 ms-xlPush2 ms-lgPush1">
            
            <span className="ms-font-xl ms-fontColor-white">Welcome to !</span>
            <p className="ms-font-l ms-fontColor-white">Created by Aubrey Phan</p>
            {tweets} 

          </div>
        </div>
      </div>
    </div>
    );
  }

  public componentDidMount() {
    console.log("componentDidMount!!");
    this.getTweets(this.props.description);
  }
  private getTweets(description: string): void {
    var httpClientOptions : IHttpClientOptions = {};
    httpClientOptions.headers = {
        'Accept': 'application/json'
    }

    this.props.basicHttpClient.get('https://aubreyprojects.000webhostapp.com/tweets.php', 
      HttpClient.configurations.v1,  
      httpClientOptions
    )
      .then((response: Response): Promise<{ statuses: ITweetsItem[] }> => {
        return response.json();
      })
      .then((response: { statuses: ITweetsItem[] }): void => {
        this.setState({
          tweets: response.statuses
        });
      }, (error: any): void => {
        this.setState({
          tweets: []
        });
      });
  }  

}
