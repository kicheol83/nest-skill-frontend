import React, { useEffect, useState } from "react";
import { useRouter, withRouter } from "next/router";
import Link from "next/link";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import cookies from "js-cookie";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import RateReviewIcon from "@mui/icons-material/RateReview";
import GroupIcon from "@mui/icons-material/Group";
import ThreePIcon from "@mui/icons-material/ThreeP";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PostAddIcon from "@mui/icons-material/PostAdd";

const AdminMenuList = (props: any) => {
  const router = useRouter();
  const device = useDeviceDetect();
  const [mobileLayout, setMobileLayout] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState("Users");
  const [openMenu, setOpenMenu] = useState(
    typeof window === "object" ? cookies.get("admin_menu") === "true" : false
  );
  const [clickMenu, setClickMenu] = useState<any>([]);
  const [clickSubMenu, setClickSubMenu] = useState("");

  const {
    router: { pathname },
  } = props;

  const pathnames = pathname.split("/").filter((x: any) => x);

  /** LIFECYCLES **/
  useEffect(() => {
    if (device === "mobile") setMobileLayout(true);

    switch (pathnames[1]) {
      case "providerpost":
        setClickMenu(["Posts"]);
        break;
      case "community":
        setClickMenu(["Community"]);
        break;
      case "cs":
        setClickMenu(["Cs"]);
        break;
      case "order":
        setClickMenu(["Orders"]);
        break;
      case "review":
        setClickMenu(["Reviews"]);
        break;
      case "payment":
        setClickMenu(["Payment"]);
        break;
      default:
        setClickMenu(["Users"]);
        break;
    }

    switch (pathnames[2]) {
      case "logs":
        setClickSubMenu("Logs");
        break;
      case "inquiry":
        setClickSubMenu("1:1 Inquiry");
        break;
      case "notice":
        setClickSubMenu("Notice");
        break;
      case "faq":
        setClickSubMenu("FAQ");
        break;
      case "board_create":
        setClickSubMenu("Board Create");
        break;
      default:
        setClickSubMenu("List");
        break;
    }
  }, []);

  /** HANDLERS **/
  const subMenuChangeHandler = (target: string) => {
    if (clickMenu.find((item: string) => item === target)) {
      // setOpenSubMenu('');
      setClickMenu(clickMenu.filter((menu: string) => target !== menu));
    } else {
      // setOpenSubMenu(target);
      setClickMenu([...clickMenu, target]);
    }
  };

  const menu_set = [
    {
      title: "Users",
      icon: <GroupIcon />,
      on_click: () => subMenuChangeHandler("Users"),
    },
    {
      title: "Posts",
      icon: <PostAddIcon />,
      on_click: () => subMenuChangeHandler("Posts"),
    },
    {
      title: "Community",
      icon: <ThreePIcon />,
      on_click: () => subMenuChangeHandler("Community"),
    },
    {
      title: "Cs",
      icon: <SupportAgentIcon />,
      on_click: () => subMenuChangeHandler("Cs"),
    },
    {
      title: "Orders",
      icon: <LocalShippingIcon />,
      on_click: () => subMenuChangeHandler("Orders"),
    },
    {
      title: "Review",
      icon: <RateReviewIcon />,
      on_click: () => subMenuChangeHandler("Review"),
    },
    {
      title: "Payment",
      icon: <AccountBalanceIcon />,
      on_click: () => subMenuChangeHandler("Payment"),
    },
  ];

  const sub_menu_set: any = {
    Users: [{ title: "List", url: "/_admin/users" }],
    Posts: [{ title: "List", url: "/_admin/providerpost" }],
    Community: [{ title: "List", url: "/_admin/community" }],
    Orders: [{ title: "List", url: "/_admin/order" }],
    Review: [{ title: "List", url: "/_admin/review" }],
    Payment: [{ title: "List", url: "/_admin/payment" }],
    Cs: [
      { title: "FAQ", url: "/_admin/cs/faq" },
      { title: "Notice", url: "/_admin/cs/notice" },
    ],
  };

  return (
    <>
      {menu_set.map((item, index) => (
        <List className={"menu_wrap"} key={index} disablePadding>
          <ListItemButton
            onClick={item.on_click}
            component={"li"}
            className={clickMenu[0] === item.title ? "menu on" : "menu"}
            sx={{
              minHeight: 48,
              justifyContent: openMenu ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: openMenu ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText>{item.title}</ListItemText>
            {clickMenu.find((menu: string) => item.title === menu) ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )}
          </ListItemButton>
          <Collapse
            in={!!clickMenu.find((menu: string) => menu === item.title)}
            className="menu"
            timeout="auto"
            component="li"
            unmountOnExit
          >
            <List className="menu-list" disablePadding>
              {sub_menu_set[item.title] &&
                sub_menu_set[item.title].map((sub: any, i: number) => (
                  <Link href={sub.url} shallow={true} replace={true} key={i}>
                    <ListItemButton
                      component="li"
                      className={
                        clickMenu[0] === item.title &&
                        clickSubMenu === sub.title
                          ? "li on"
                          : "li"
                      }
                    >
                      <Typography variant={sub.title} component={"span"}>
                        {sub.title}
                      </Typography>
                    </ListItemButton>
                  </Link>
                ))}
            </List>
          </Collapse>
        </List>
      ))}
    </>
  );
};

export default withRouter(AdminMenuList);
