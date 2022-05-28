import React from "react";
import "./Home.css";
import { defaultImgs } from "../defaultimgs";
import { TextArea, Icon } from "web3uikit";
import { useState, useRef } from "react";
import TweetInFeed from "../components/TweetInFeed";
import { useMoralis } from "react-moralis";


const Home = () => {

  const { Moralis } = useMoralis();
  const user = Moralis.User.current();

  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState();
  const [theFile, setTheFile] = useState();
  const [tweet, setTweet] = useState();

  async function saveTweet() {
    
    if(!tweet) return;

    const Tweets = Moralis.Object.extend("Tweets");

    const newTweet = new Tweets();

    newTweet.set("tweetTxt", tweet);
    newTweet.set("tweeterPfp", user.attributes.pfp);
    newTweet.set("tweeterAcc", user.attributes.ethAddress)
    newTweet.set("tweeterUserName", user.attributes.username) 

    if (theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      newTweet.set("tweetImg", file.ipfs())
    }
    await newTweet.save();
    window.location.reload();
  }


  const onImageClick = () => {
    inputFile.current.click();
  };

  const changeHandler = (event) => {
    const img = event.target.files[0];
    setTheFile(img);
    setSelectedFile(URL.createObjectURL(img));
  };

  return (
    <>
    <div className="pageIdentify">Home</div>
      <div className="mainContent">
        <div className="profileTweet">
          <img
            src={user.attributes.pfp ? user.attributes.pfp : defaultImgs[0]}
            className="profilePic"
          ></img>
          <div className="tweetBox">
            <TextArea
              label=""
              name="tweetTxtArea"
              value="GM World"
              type="text"
              onChange={(e) => setTweet(e.target.value)}
              width="95%"
            >
            </TextArea>
            {selectedFile && (
              <img src={selectedFile} className="tweetImg"></img>
            )}
            <div className="imgOrTweet">
              <div className="imgDiv" onClick={onImageClick}>
                <input
                  type="file"
                  name="file"
                  ref={inputFile}
                  onChange={changeHandler}
                  style={{ display: "none" }}
                />
                <Icon fill="#1DA1F2" size={20} svg="image"></Icon>
              </div>
              <div className="tweetOptions">
                <div className="tweet" onClick= {saveTweet}>Tweet</div>
                <div className="tweet" style={{ backgroundColor: "#8247e5" }}>
                  <Icon fill="#ffffff" size={20} svg="matic"></Icon>
                </div>

              </div>

            </div>
          </div>
        </div>
        <TweetInFeed profile={false} />
      </div>
    </>
  );
};

export default Home;
