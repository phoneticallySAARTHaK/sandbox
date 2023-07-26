import {
  createBrowserRouter,
  redirect,
  RouterProvider,
  Outlet,
  useLoaderData,
  useLocation,
  Link,
  useRouteLoaderData,
} from "react-router-dom";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        path: "a",
        id: "a",
        loader() {
          return redirect("/b", {
            headers: [["Content-Language", "en-US"]],
          });
        },
        Component: () => <p>{useLocation().pathname}</p>,
      },
      {
        path: "b",
        id: "b",
        loader({ request }) {
          return [...request.headers.entries()];
        },
        Component: () => {
          const b = useRouteLoaderData("b");
          console.log(b);
          return (
            <p>
              {useLocation().pathname} <br /> headers:{" "}
              {JSON.stringify(useLoaderData())}
            </p>
          );
        },
      },
    ],
  },
]);

function Root() {
  return (
    <div>
      {" "}
      <Link to="/a">Go to a</Link> <Outlet />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
