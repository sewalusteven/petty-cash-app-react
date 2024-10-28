import {
    createBrowserRouter,
} from "react-router-dom";
import TransactionForm from "./pages/TransactionForm.tsx";
import Statement from "./pages/Statement.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <TransactionForm />,
    },
    {
        path: "/statement",
        element: <Statement />,
    }
]);
