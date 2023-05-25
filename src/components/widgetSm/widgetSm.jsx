import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { newMembers } from "./../../datas";
import "./widgetSm.css";

const getRandomName = () => {
  const names = ["John", "Jane", "Bob", "Alice", "Mike", "Emily"];
  return names[Math.floor(Math.random() * names.length)];
};

const getRandomTitle = () => {
  const titles = ["Developer", "Designer", "Manager", "Consultant", "Engineer"];
  return titles[Math.floor(Math.random() * titles.length)];
};

const getRandomImage = () => {
  const images = [
    "https://picsum.photos/id/1005/50/50",
    "https://picsum.photos/id/1011/50/50",
    "https://picsum.photos/id/102/50/50",
    "https://picsum.photos/id/1035/50/50",
    "https://picsum.photos/id/1048/50/50",
  ];
  return images[Math.floor(Math.random() * images.length)];
};

export default function WidgetSm() {
  const [showIcon, setShowIcon] = useState(true);

  const handleIconClick = () => {
    setShowIcon(!showIcon);
  };

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Current Active Members</span>
      <ul className="widgetSmList">
        {newMembers.map((user) => (
          <li key={user.id} className="widgetSmListItem">
            <img src={getRandomImage()} className="widgetSmImg" />
            <div className="widgetSmUser">
              <span className="widgetSmUserName">{getRandomName()}</span>
              <span className="widgetSmUserTitle">{getRandomTitle()}</span>
            </div>
            <button className="widgetSmButton" onClick={handleIconClick}>
              {showIcon && (
                <VisibilityIcon className="widgetSmIcon" />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
