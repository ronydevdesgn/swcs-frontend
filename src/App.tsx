// All screen
import { Login } from "./pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={routers} />
    </>
  );
}

export default App;
