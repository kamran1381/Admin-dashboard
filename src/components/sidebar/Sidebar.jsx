import { useState } from "react";
import { Link } from "react-router-dom";

import "./Sidebar.css";
import { menus } from "./sideData";

export default function Sidebar() {
  const [activeMenuIndex, setActiveMenuIndex] = useState(-1);

  const handleLinkClick = (menuIndex, itemIndex) => {
    setActiveMenuIndex(menuIndex);
    menus[menuIndex].items.forEach((item, index) => {
      item.isActive = index === itemIndex;
    });
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        {menus.map((menu, menuIndex) => (
          <div key={menuIndex} className="sidebarMenu">
            <h3 className="sidebarTitle">{menu.title}</h3>
            <ul className="sidebarList">
              {menu.items.map((item, itemIndex) => (
                <Link
                  key={itemIndex}
                  to={item.linkUrl}
                  className="link"
                  onClick={() => handleLinkClick(menuIndex, itemIndex)}
                >
                  <li
                    className={`sidebarListItem ${
                      item.isActive ? "active" : ""
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

