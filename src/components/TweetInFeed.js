import React from "react";
import './TweetInFeed.css';
import golf from "../images/golf.png";
import canoe from "../images/canoe.jpeg";
import netflix from "../images/netflix.jpeg";
import shivbuild from "../images/shivbuild.png";
import IMDb from "../images/IMDb.png";
import { defaultImgs } from "../defaultimgs";
import { Icon } from "web3uikit"
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";


const TweetInFeed = ({ profile }) => {

  const [tweetArr, setTweetArr] = useState();
  const { Moralis, account } = useMoralis();

  useEffect(() => {
    async function getTweets() {
      try {
        const Tweets = Moralis.Object.extend("Tweets");
        const query = new Moralis.Query(Tweets)
        if (profile) {
          query.equalTo("tweeterAcc", account);
        }
        const results = await query.find();

        setTweetArr(results);
        console.log(results);
      } catch (error) {
        console.error(error);
      }
    }
    getTweets();
  }, [profile]);


  return (
    <>

      {tweetArr?.map((e) => {
        return (
          <>

            <div className="feedTweet">
              <img src={e.attributes.tweeterPfp ? e.attributes.tweeterPfp : defaultImgs[0]} className="profilePic"></img>
              <div className="completeTweet">
                <div className="who">
                  {e.attributes.tweeterUserName.slice(0, 6)}
                  <div className="accWhen">{
                    `${e.attributes.tweeterAcc.slice(0, 4)}...${e.attributes.tweeterAcc.slice(38)}
                      ${e.attributes.createdAt.toLocaleString('en-us', { month: 'short' })}
                      ${e.attributes.createdAt.toLocaleString('en-us', { day: 'numeric' })}
                    `
                  }
                  </div>
                </div>
                <div className="tweetContent">
                  {e.attributes.tweetTxt}
                  {e.attributes.tweetImg && (
                    <img
                      src={e.attributes.tweetImg}
                      className="tweetImg"
                    ></img>
                  )}
                </div>
                <div className="interactions">
                  <div className="interactionNums">
                    <Icon fill="#3f3f3f" size={20} svg="messageCircle"></Icon>
                  </div>
                </div>
                <div className="interactions">
                  <div className="interactionNums">
                    <Icon fill="#3f3f3f" size={20} svg="star"></Icon>
                    33
                  </div>
                </div>
                <div className="interactions">
                  <div className="interactionNums">
                    <Icon fill="#3f3f3f" size={20} svg="matic"></Icon>
                  </div>
                </div>
              </div>
            </div>

          </>
        )
      }).reverse()}

      {/*
      <div className="feedTweet">
        <img src={defaultImgs[0]} className="profilePic"></img>
        <div className="completeTweet">
          <div className="who">
            Shivgun
            <div className="accWhen">0xed...592 · 1h</div>
          </div>
          <div className="tweetContent">
            BUIDLing dApps and don't want to be at School
            <img src={shivbuild} className="tweetImg"></img>
          </div>
          <div className="interactions">
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="messageCircle"></Icon>
            </div>
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="star"></Icon>
              41
            </div>
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="matic"></Icon>
            </div>
          </div>
        </div>

      </div>
      <div className="feedTweet">
        <img src={defaultImgs[0]} className="profilePic"></img>
        <div className="completeTweet">
          <div className="who">
            Shivgun
            <div className="accWhen">0xed...592 · 1h</div>
          </div>
          <div className="tweetContent">
            Just finished my Web3 IMDb! Looks 🔥
            <img src={IMDb} className="tweetImg"></img>
          </div>
          <div className="interactions">
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="messageCircle"></Icon>
            </div>
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="star"></Icon>
              36
            </div>
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="matic"></Icon>
            </div>
          </div>
        </div>

      </div>
      <div className="feedTweet">
        <img src={defaultImgs[0]} className="profilePic"></img>
        <div className="completeTweet">
          <div className="who">
            Shivgun
            <div className="accWhen">0xed...592 · 1h</div>
          </div>
          <div className="tweetContent">
            GM!!!
          </div>
          <div className="interactions">
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="messageCircle"></Icon>
            </div>
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="star"></Icon>
              51
            </div>
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="matic"></Icon>
            </div>
          </div>
        </div>

      </div>
      <div className="feedTweet">
        <img src={defaultImgs[0]} className="profilePic"></img>
        <div className="completeTweet">
          <div className="who">
            Shivgun
            <div className="accWhen">0xed...592 · 1h</div>
          </div>
          <div className="tweetContent">
            What was the first dapp you built? I'm curious.😁
          </div>
          <div className="interactions">
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="messageCircle"></Icon>
              12
            </div>
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="star"></Icon>
              50
            </div>
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="matic"></Icon>
            </div>
          </div>
        </div>

      </div> */}

    </>
  );
};

export default TweetInFeed;

