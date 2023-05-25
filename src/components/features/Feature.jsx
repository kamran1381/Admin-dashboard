import React from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import './features.css'
export default function Feature() {
  const getRandomNumber = () => {
    return Math.floor(Math.random() * 50) + 1;
  };

  const generateBox = (title) => {
    return (
      <div className="featureItem" id='FeatureItem'>
        <span className="featureTitle">{title}</span>
        <div className="featureContainer">
          <span className="featureMoney">${getRandomNumber()}</span>
          <span className="featureRate">
            {getRandomNumber() % 2 === 0 ? "+" : "-"}
            {getRandomNumber() / 10}%
            {getRandomNumber() % 2 === 0 ? (
              <ArrowUpwardIcon className="featureIcon" />
            ) : (
              <ArrowDownwardIcon className="featureIcon negative" />
            )}
          </span>
        </div>
        <span className="featureSub">Compared to last month</span>
      </div>
    );
  };

  return (
    <div className="features">
      {generateBox("Revenue")}
      {generateBox("Sales")}
      {generateBox("Cost")}
    </div>
  );
}

