import { RouteInfo } from '../menu.metadata';

export const HROUTES: RouteInfo[] = [

  // {
  //   path: '', title: 'Dashboard', icon: 'ft-home', class: 'dropdown nav-item has-sub', isExternalLink: false,
  //   submenu: [
  //     { path: '/dashboard/dashboard1', title: 'Dashboard 1', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //     { path: '/dashboard/dashboard2', title: 'Dashboard 2', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] }
  //   ]
  // },
  {
    path: '/home', title: 'Dashboard', icon: 'ft-box', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: []
  },
  {
    path: '/about', title: 'About', icon: 'ft-aperture', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: []
  },
  {
    path: '/service', title: 'Services', icon: 'ft-briefcase', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: []
  },
  {
    path: '/contactUS', title: 'Contact US', icon: 'ft-edit', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: []
  },
  {
    path: '/socialMedia', title: 'Social Media', icon: 'ft-file-text', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: []
  }
];
