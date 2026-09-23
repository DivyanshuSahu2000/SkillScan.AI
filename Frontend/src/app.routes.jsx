import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login.jsx";
import Register from "./features/auth/pages/Register.jsx";
import Protected from "./features/auth/components/Protected.jsx";

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <Protected>
//         <h1>Home Page</h1>
//       </Protected>
//     ),
//     // element: <Login />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//     // element: <Login />,
//   },
//   {
//     path: "/register",
//     element: <Register />,
//   },
// ]);

// import Home from "./features/interview/pages/Home";
// import Interview from "./features/interview/pages/Interview";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <Protected>
        <h1>Home Page</h1>
        {/* <Home /> */}
      </Protected>
    ),
  },
  // {
  //     path:"/interview/:interviewId",
  //     element: <Protected><Interview /></Protected>
  // }
]);
