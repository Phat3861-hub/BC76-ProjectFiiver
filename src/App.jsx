import { useRoutes } from "react-router-dom";
import { pathDefault } from "./common/path";
import SignIn from "./pages/SignIn/SignIn";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { createContext, Suspense } from "react";
import AdminTemplate from "./templates/AminTemplate/AdminTemplate";

export const NotificationContext = createContext();

const HomeTemplate = React.lazy(() =>
  import("./templates/HomeTemplate/HomeTemplate")
);
const ManageJob = React.lazy(() => import("./pages/ManageJob/ManageJob"));
const ManageComment = React.lazy(() =>
  import("./pages/ManageComment/ManageComment")
);
const ManageUser = React.lazy(() => import("./pages/ManageUser/ManageUser"));

const arrRoutes = [
  {
    path: pathDefault.homePage,
    element: (
      <Suspense fallback={<div>huhu</div>}>
        <HomeTemplate />
      </Suspense>
    ),
  },
  {
    path: pathDefault.signIn,
    element: <SignIn />,
  },
  {
    path: pathDefault.admin,
    element: <AdminTemplate />,
    children: [
      {
        index: true,
        path: "manage-user",
        element: (
          <Suspense fallback={<div>huhu</div>}>
            <ManageUser />
          </Suspense>
        ),
      },
      {
        path: "manage-job",
        element: (
          <Suspense fallback={<div>huhu</div>}>
            <ManageJob />
          </Suspense>
        ),
      },
      {
        path: "manage-comment",
        element: (
          <Suspense fallback={<div>huhu</div>}>
            <ManageComment />
          </Suspense>
        ),
      },
    ],
  },
];

function App() {
  const routes = useRoutes(arrRoutes);

  const handleNotification = (type, content, timeClose = 3000) => {
    toast[type](content, {
      position: "top-right",
      autoClose: timeClose,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <>
      <NotificationContext.Provider value={handleNotification}>
        {routes}
        <ToastContainer />
      </NotificationContext.Provider>
    </>
  );
}

export default App;
