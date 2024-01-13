import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { PATH } from "../utils/paths";
import { lazy } from "react";
import MainLayout from "../layouts/MainLayout"
import Detail from "../modules/detail/Detail";
import NotFound from "../modules/error/NotFound";

//* LAZY LOADING PAGES
const HomePage = lazy(() => import("../modules/home"));
const NotFoundPage = lazy(() => import("../modules/error/NotFound"))
const LoginPage = lazy(() => import("../modules/auth/Login"))
const RegisterPage = lazy(() => import("../modules/auth/Register"))

const AuthenticateRouter = () => {
    const isAuthenticated = false;
    return isAuthenticated ? <Navigate to={PATH.HOME} /> : <Outlet />
}

const PostDetailRouter = () => {
    const isAuthenticated = true;
    return isAuthenticated ? <Outlet /> : (<Navigate to={PATH.LOGIN} />)

}

const useRouteElements = () => {
    let element = useRoutes([
        {
            path: "",
            element: <AuthenticateRouter />,
            children: [
                {
                    path: PATH.LOGIN,
                    element: <LoginPage />,
                },
                {
                    path: PATH.REGISTER,
                    element: <RegisterPage />,
                },
            ]
        },
        {
            path: PATH.HOME,
            element: <MainLayout />,
            children: [
                {
                    index: true,
                    element: <HomePage />,
                },
                {
                    path: PATH.LOGIN,
                    element: <LoginPage />,
                },
                {
                    path: PATH.REGISTER,
                    element: <RegisterPage />,
                },
                {
                    path: "",
                    element: <PostDetailRouter />,
                    children: [
                        {
                            path: PATH.LOGIN,
                            element: <LoginPage />,
                        },
                        {
                            path: `${PATH.IMAGE}/:imageId`,
                            element: <Detail />,
                        },
                    ]
                },
            ],
        },
        { path: "*", element: <NotFound />},
    ]);

    return element;
}

export default useRouteElements