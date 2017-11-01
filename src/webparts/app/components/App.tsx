import * as React from 'react';
import styles from './App.module.scss';
import { IAppWebPartProps } from '../IAppWebPartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { HttpClient, IHttpClientOptions, HttpClientConfiguration } from '@microsoft/sp-http';

//Office-ui-fabric-react
import { Image } from 'office-ui-fabric-react/lib/Image';
import { Label } from 'office-ui-fabric-react/lib/Label';

export interface IAppProps extends IAppWebPartProps {
  basicHttpClient: HttpClient;
}

export interface ITweetsState {
  tweets: ITweetsItem[];
}

export interface ITweetsItem {
  statuses: any,
  user: {
    profile_image_url_https: string,
    name: string,
    screen_name: string,
    location: string
  },
  text: string,
  created_at: string
}

export default class App extends React.Component<IAppProps, ITweetsState> {
  
  //initiating tweets intial state
  constructor(props: IAppProps, state: ITweetsState) {
    super(props);
    this.state = {
      tweets: []
    };
  }

  public render(): JSX.Element {

    //tweets template
    const tweets: JSX.Element[] = this.state.tweets.map((tweet: ITweetsItem, k: number): JSX.Element => {
      return (
        <div key={k} className={styles.tweetPost}>  

          <div className={ "ms-Grid-row" } >
            <div className={ "ms-Grid-col ms-lg-2 ms-xl2"}>
              <Image src={tweet.user.profile_image_url_https} />
            </div>
            <div className={ "ms-Grid-col ms-lg-10 ms-xl10"}>
              <b>{tweet.user.name}</b>
              <br />
              @{tweet.user.screen_name} - {tweet.user.location}
            </div>
          </div>

          <div className={ "ms-Grid-row" }>
            <hr />
            <h3>{tweet.text}</h3>
            <h5>Posted at {tweet.created_at}</h5>
          </div>    
          
        </div>        
      )
    });

    //app template
    return (
    <div className={styles.app}>
      <div className={styles.container}>

        <div className={`ms-Grid-row  ${styles.header}`}>
          <div className="ms-Grid-col ms-lg-3 ms-xl3 ms-xlPush2 ms-lgPush1">
            <Image src="https://static1.squarespace.com/static/585fa2e4ebbd1af27cda80da/58b00b94be659418cfcb2cbb/58b00bf52994cabdb1a62a7d/1487932495208/Twitter-Icon.png?format=100w" alt="twitter icon" />
          </div>
          <div className="ms-Grid-col ms-lg-9 ms-xl9 ms-xlPush2 ms-lgPush1">             
            <span className={`ms-fontColor-white ${styles.title}`}>#sharepoint</span>
            <br />
            <span className="ms-fontColor-white ms-font-xl">Created by Aubrey Phan</span>
          </div>
        </div>

        <div className={`ms-Grid-row ${styles.creator}`}></div>

        <div className={`ms-Grid-row ${styles.body}`}>
          <Label className="ms-textAlignCenter">Check these tweets out!</Label>
          {tweets} 
        </div>          

        </div> {/* end container*/}
    </div> //end return
    );
  }

  public componentDidMount() {
    console.log("component Did Mount!");
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
