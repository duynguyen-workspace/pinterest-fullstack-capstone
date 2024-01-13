import { Link, Navigate } from "react-router-dom";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { PATH } from "../../../utils/paths"
import { useAuth } from "../../../contexts/UserContext";
import { useForm } from "react-hook-form";
import logo from "../../../assets/images/logo.png";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../../../api/userApis";

const Login = () => {
    const { currentUser, handleSignin: handleSigninContext } = useAuth();

    const { register, handleSubmit, formState: { errors, isValid }} = useForm({
        defaultValues: {
            "email": "",
            "user_password": "",
        },
        mode: "all",
    })

    const { mutate: handleSignin, isPending } = useMutation({
        mutationFn: (payload) => loginApi(payload),
        onSuccess: (values) => {
            //TODO: If login successfully -> save user's information (values) to local storage
            handleSigninContext(values)
        },
        onError: (error) => {
            alert(error)
        }
    })

    const onSubmit = async (values) => {
        console.log("values", values)

        // call api
        handleSignin(values)

    }

    if (currentUser) {
        return <Navigate to={PATH.HOME} />
    }

    return (
        <section className="bg-slate-100 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <Link to="#" className="flex justify-center pt-8">
                        <img
                            className="w-12 h-12 rounded-full"
                            src={logo}
                            alt="logo"
                        />
                    </Link>
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="email" value="Your email" />
                                </div>
                                <TextInput
                                    color={"blue"}
                                    className="border-white"
                                    id="email"
                                    type="email"
                                    placeholder="example@gmail.com"
                                    required
                                    shadow
                                    {...register('email', {
                                        required: "Please enter your email!",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                                            message: "Please enter a valid email!"
                                        }
                                    })}
                                />
                                <p className="text-red-600 font-medium text-xs mt-1">{errors.email?.message}</p>
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="password"
                                        value="Password"
                                    />
                                </div>
                                <TextInput
                                    color={"blue"}
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="•••••••••"
                                    required
                                    shadow
                                    {...register('user_password', {
                                        required: "Please enter your password!",
                                    })}
                                />
                                <p className="text-red-600 font-medium text-xs mt-1">{errors.user_password?.message}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <Checkbox color={"blue"} id="remember" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label
                                            htmlFor="remember"
                                            className="text-gray-500 dark:text-gray-300"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <Link
                                    to="#"
                                    className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <Button
                                color="blue"
                                type="submit"
                                className="w-full text-white"
                            >
                                Sign in
                            </Button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet?{" "}
                                <Link
                                    to={PATH.REGISTER}
                                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
