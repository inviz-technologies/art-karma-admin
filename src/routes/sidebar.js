/** Icons are imported separatly to reduce build time */

import {
  ShoppingCartIcon,
  InboxArrowDownIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const routes = [
  {
    path: "/app/dashboard",
    icon: <Squares2X2Icon className={iconClasses} />,
    name: "Dashboard",
  },
  {
    path: "/app/users", // url
    icon: <InboxArrowDownIcon className={iconClasses} />, // icon component
    name: "Users", // name that appear in Sidebar
  },
  // {
  // path: "/app/categories", // url
  // icon: <InboxArrowDownIcon className={iconClasses} />, // icon component
  // name: "Categories", // name that appear in Sidebar
  // },
  // {
  // path: "/app/products", // url
  // icon: <InboxArrowDownIcon className={iconClasses} />, // icon component
  // name: "Products", // name that appear in Sidebar
  // },
  {
    path: "/app/orders", // url
    icon: <ShoppingCartIcon className={iconClasses} />, // icon component
    name: "Orders", // name that appear in Sidebar
  },
];

export default routes;
