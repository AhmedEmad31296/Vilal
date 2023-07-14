// Sidebar route metadata
export interface RouteInfo {
    path: string;
    title: any;
    icon: string;
    class: string;
    badge?: string;
    badgeClass?: string;
    isExternalLink: boolean;
    submenu : RouteInfo[];
}
