import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import EmployeesList from "./components/EmployeesList.tsx";
import EmployeesCard from "./components/EmployeesCard.tsx";

// Функция для запуска MSW
async function enableMocking() {
  if (process.env.NODE_ENV === "development") {
    const { worker } = await import ("./mocks/browser.ts");
    return worker.start();
  }
}

// Роутинг
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/list",
        element: <EmployeesList />,
      },
      {
        path: "/card",
        element: <EmployeesCard />,
      },
    ],
  }
]);

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
});

