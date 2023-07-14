import { RouteInfo } from "../menu.metadata";

//Sidebar menu Routes and data
export const VROUTES: RouteInfo[] = [
  // {
  //   path: '', title: 'Dashboard', icon: 'ft-home', class: 'has-sub', badge: '2', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: [
  //     { path: '/dashboard/dashboard1', title: 'Dashboard 1', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
  //     { path: '/dashboard/dashboard2', title: 'Dashboard 2', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
  //   ]
  // },
  {
    path: "/app/home",
    title: "HomePage",
    icon: "ft-home",
    class: "",
    badge: "",
    badgeClass: "",
    isExternalLink: false,
    submenu: [],
  },
  {
    path: "/app/about",
    title: "About",
    icon: "ft-box",
    class: "",
    badge: "",
    badgeClass: "",
    isExternalLink: false,
    submenu: [],
  },
  {
    path: "/app/services",
    title: "Buildings.OurServices",
    icon: "ft-layers",
    class: "",
    badge: "",
    badgeClass: "",
    isExternalLink: false,
    submenu: [],
  },
  {
    path: "/app/contact-us",
    title: "ContactUS.Messages",
    icon: "ft-message-circle",
    class: "",
    badge: "",
    badgeClass: "",
    isExternalLink: false,
    submenu: [],
  },
  {
    path: "/app/account-settings",
    title: "AccountSettings",
    icon: "ft-settings",
    class: "",
    badge: "",
    badgeClass: "",
    isExternalLink: false,
    submenu: [],
  },
];
