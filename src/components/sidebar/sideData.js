import LineStyleIcon from "@mui/icons-material/LineStyle";
import TimelineIcon from "@mui/icons-material/Timeline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BarChartIcon from "@mui/icons-material/BarChart";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

let menus=[
    {
      title: "Dashboard",
      items: [
        {
          label: "Home",
          icon: <LineStyleIcon className="sidebarIcon" />,
          linkUrl: "/",
          isActive: true
        },
        {
          label: "Analytics",
          icon: <TimelineIcon className="sidebarIcon" />,
          linkUrl: "/analytics",
          isActive: false
        },
      ]
    },
    {
      title: "Quick Menu",
      items: [
        {
          label: "Users",
          icon: <PermIdentityIcon className="sidebarIcon" />,
          linkUrl: "/users",
          isActive: false
        },
        {
          label: "New User",
          icon: <PermIdentityIcon className="sidebarIcon" />,
          linkUrl: "/newUser",
          isActive: false
        },
        {
          label: "Products",
          icon: <StorefrontIcon className="sidebarIcon" />,
          linkUrl: "/products",
          isActive: false
        },
        {
          label: "Transactions",
          icon: <AttachMoneyIcon className="sidebarIcon" />,
          linkUrl: "/transactions",
          isActive: false
        },
        {
          label: "Reports",
          icon: <BarChartIcon className="sidebarIcon" />,
          linkUrl: "/reports",
          isActive: false
        }
      ]
    },
    {
      title: "Notifications",
      items: [
        {
          label: "Mail",
          icon: <MailOutlineIcon className="sidebarIcon" />,
          linkUrl: "/mail",
          isActive: false
        },
        {
          label: "Feedback",
          icon: <DynamicFeedIcon className="sidebarIcon" />,
          linkUrl: "/feedback",
          isActive: false
        },
        {
          label: "Messages",
          icon: <ChatBubbleOutlineIcon className="sidebarIcon" />,
          linkUrl: "/messages",
          isActive: false
        }
      ]
    },
    {
      title: "Staff",
      items: [
        {
          label: "Manage",
          icon: <WorkOutlineIcon className="sidebarIcon" />,
          linkUrl: "/manage",
          isActive: false
        },
        {
          label: "Analytics",
          icon: <TimelineIcon className="sidebarIcon" />,
          linkUrl: "/staff-analytics",
          isActive: false
        },
        {
          label: "Reports",
          icon: <BarChartIcon className="sidebarIcon" />,
          linkUrl: "/staff-reports",
          isActive: false
        }
      ]
    }
  ];

export {menus};
