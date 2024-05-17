import { lazy } from "react";

const Dashboard = lazy(() => import("../pages/protected/Dashboard"));
const Welcome = lazy(() => import("../pages/protected/Welcome"));
const Page404 = lazy(() => import("../pages/protected/404"));
const Users = lazy(() => import("../pages/protected/Users/Users"));
const CustomerProfile = lazy(() =>
  import("../pages/protected/Users/CustomerProfile")
);

const Categories = lazy(() =>
  import("../pages/protected/Categoties/Categories")
);
const Products = lazy(() => import("../pages/protected/Products/Products"));

const routes = [
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },
  {
    path: "/welcome", // the url
    component: Welcome, // view rendered
  },
  {
    path: "/users",
    component: Users,
  },
  {
    path: "/users/:id",
    component: CustomerProfile,
  },
  {
    path: "/categories",
    component: Categories,
  },
  {
    path: "/products",
    component: Products,
  },
  // {
  //   path: "/settings-team",
  //   component: Team,
  // },
  // {
  //   path: "/calendar",
  //   component: Calendar,
  // },
  // {
  //   path: "/transactions",
  //   component: Transactions,
  // },
  // {
  //   path: "/settings-profile",
  //   component: ProfileSettings,
  // },
  // {
  //   path: "/settings-billing",
  //   component: Bills,
  // },
  // {
  //   path: "/getting-started",
  //   component: GettingStarted,
  // },
  // {
  //   path: "/features",
  //   component: DocFeatures,
  // },
  // {
  //   path: "/components",
  //   component: DocComponents,
  // },
  // {
  //   path: "/integration",
  //   component: Integration,
  // },
  // {
  //   path: '/charts',
  //   component: Charts,
  // },
  {
    path: "/404",
    component: Page404,
  },
  // {
  //   path: '/blank',
  //   component: Blank,
  // },
];

export default routes;
