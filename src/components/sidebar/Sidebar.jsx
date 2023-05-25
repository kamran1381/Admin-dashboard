

import { Link } from "react-router-dom";

import "./Sidebar.css";
import { menus } from "./sideData";
export default function Sidebar() {
  return (
    <div className="sidebar">
    <div className="sidebarWrapper">
      {menus.map((menu, index) => (
        <div key={index} className="sidebarMenu">
          <h3 className="sidebarTitle">{menu.title}</h3>
          <ul className="sidebarList">
            {menu.items.map((item, index) => (
              <Link
                key={index}
                to={item.linkUrl}
                className="link"
                onClick={() => {
                  // Do something when the Link is clicked
                }}
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
