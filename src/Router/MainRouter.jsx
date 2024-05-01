import React, { Suspense } from "react";
import DashboadData from "./../Componente/DashboadData.jsx";
import { createBrowserRouter } from "react-router-dom";

const MainRouter = createBrowserRouter([
    {
        path: '/',
        element: (
            <>
                <DashboadData />
            </>
        )
    }
])


export default MainRouter;