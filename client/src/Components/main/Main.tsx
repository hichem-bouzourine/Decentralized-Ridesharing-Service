import React from "react";
import { Button } from "@mui/material";
import ride from "../../images/ride.png";
import logo from "../../images/logo.png";
import { FaCarSide } from "react-icons/fa";
import { BiMoneyWithdraw } from "react-icons/bi";
import { BiTime } from "react-icons/bi";
import "./main.css";

interface IntroItemProps {
  iconImg: any;
  text: string;
}

const IntroItem = ({ iconImg, text }: IntroItemProps) => (
  <div className="df-fdr">
    <div className="justify-center">{iconImg}</div>
    <div className="intro-text-item">{text}</div>
  </div>
);

const Main = () => {
  return (
    <div className="mainWrapper">
      <div className="intro">
        <div className="intro-items">
          <div className="image-desc">
            <img src={ride} alt="ride picture" />
            <div className="intro-text-item app-name">
              <img src={logo} alt="ride picture" />
            </div>
          </div>
          <div className="intro-text">
            <div className="intro-text-item-wrapper">
              <IntroItem
                iconImg={<BiTime />}
                text="Experience the Decentralized Taxi"
              />
              <IntroItem iconImg={<FaCarSide />} text="Lesser Waiting time" />
              <IntroItem
                iconImg={<BiMoneyWithdraw />}
                text="No more Surge Fee"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="buttonWrapper">
        <div className="buttonSection">
          <div className="buttons">
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#083444",
                height: "68.5px",
                margin: "10px 0",
              }}
              //   onClick={() => navigateHook("/consulterAM")}
            >
              Connect Wallet
            </Button>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#083444",
                height: "68.5px",
                margin: "10px 0",
              }}
              //   onClick={() => navigateHook("/consulterAM")}
            >
              Lets' go
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
