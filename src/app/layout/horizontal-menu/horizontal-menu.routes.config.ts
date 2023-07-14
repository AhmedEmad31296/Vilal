import { HomeComponent } from "@app/home/home.component";
import { RouteInfo } from "../menu.metadata";

export const HROUTES: RouteInfo[] = [
  // {
  //   path: '', title: 'Dashboard', icon: 'ft-home', class: 'dropdown nav-item has-sub', isExternalLink: false,
  //   submenu: [
  //     { path: '/dashboard/dashboard1', title: 'Dashboard 1', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //     { path: '/dashboard/dashboard2', title: 'Dashboard 2', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] }
  //   ]
  // },
  {
    path: "/app/home",
    title: "HomePage",
    icon: "ft-box",
    class: "dropdown nav-item has-sub",
    isExternalLink: false,
    submenu: [],
  },
  {
    path: "/app/about",
    title: "About",
    icon: "ft-aperture",
    class: "dropdown nav-item has-sub",
    isExternalLink: false,
    submenu: [],
  },
  {
    path: "/app/services",
    title: "Buildings.OurServices",
    icon: "ft-briefcase",
    class: "dropdown nav-item has-sub",
    isExternalLink: false,
    submenu: [],
  },
  {
    path: "/app/contact-us",
    title: "ContactUS.Messages",
    icon: "ft-message-circle",
    class: "dropdown nav-item has-sub",
    isExternalLink: false,
    submenu: [],
  },
  {
    path: "/app/account-settings",
    title: "AccountSettings",
    icon: "ft-settings",
    class: "dropdown nav-item has-sub",
    isExternalLink: false,
    submenu: [],
  },
];
