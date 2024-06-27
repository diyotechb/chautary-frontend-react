import { Home, Layers, PlusCircle, UserCircle } from "lucide-react";

export const AdminSideBarLinks = [
  {
    title: "home",
    navs: [
      {
        title: "Dashboard",
        key: "dashboard",
        href: "/admin/dashboard",
        icon: <Home className="size-4" />,
        subNavs: [],
      },
    ],
  },
  {
    title: "listings",
    navs: [
      {
        title: "My Listings",
        href: "",
        icon: <Layers className="size-4" />,
        subNavs: [
          {
            title: "All Listings",
            key: "listings",
            href: "/admin/listings",
          },
        ],
      },
      {
        title: "Add Listings",
        key: "add-listings",
        href: "/admin/add-listing",
        icon: <PlusCircle className="size-4" />,
        subNavs: [],
      },
    ],
  },
  {
    title: "account",
    navs: [
      {
        title: "Profile",
        href: "/admin/profile",
        key: "profile",
        icon: <UserCircle className="size-4" />,
        subNavs: [],
      },
    ],
  },
];
