import { Link, Navigate, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { Button } from "flowbite-react";
import { PATH } from "../../utils/paths"

const Header = () => {
    const navigate = useNavigate()

    return (
        <header>
            <nav className="bg-white border-gray-200 dark:bg-gray-900 w-full border-b dark:border-gray-600">
                <div className="max-w-screen-xl flex flex-wrap items-center md:justify-between justify-evenly mx-auto px-2 py-4">
                    {/* LOGO */}
                    <Link
                        to="#"
                        className="flex items-center space-x-3 rtl:space-x-reverse"
                    >
                        <img
                            src={logo}
                            className="h-8 rounded-full"
                            alt="Flowbite Logo"
                        />
                        <span className="self-center text-2xl text-red-600 font-semibold whitespace-nowrap dark:text-white">
                            Pinterest
                        </span>
                    </Link>
                    {/* SEARCH BAR */}
                    <div className="grow px-12">
                        <div className="relative hidden md:block">
                            <form className="flex items-center">
                                <label
                                    htmlFor="simple-search"
                                    className="sr-only"
                                >
                                    Search
                                </label>
                                <div className="relative w-full">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg
                                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        id="simple-search"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Explore new images..."
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                        />
                                    </svg>
                                    <span className="sr-only">Search</span>
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 order-2">
                        <Button color="light" onClick={() => navigate(PATH.LOGIN)}>Login</Button>
                        <Button color="blue" onClick={() => navigate(PATH.REGISTER)}>Register</Button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
