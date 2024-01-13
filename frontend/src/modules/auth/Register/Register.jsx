import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { PATH } from "../../../utils/paths"
import { useForm } from "react-hook-form";
import { registerApi } from "../../../api/userApis";
import { useMutation } from "@tanstack/react-query";

const Register = () => {
    const navigate = useNavigate();

    const { register, watch, handleSubmit, formState: { errors, isValid }} = useForm({
        defaultValues: {
            "full_name": "",
            "age": null,
            "email": "",
            "user_password": "",
            "confirm_password": "",
        },
        mode: "all",
    })

    const { mutate: handleRegister, isPending } = useMutation({
        mutationFn: (payload) => registerApi(payload),
        onSuccess: (response) => {
            //TODO: If register successfully -> navigate to login with an alert
            alert(response);
            navigate(PATH.LOGIN);
        },
        onError: (error) => {
            alert(error)
        }
    })

    const onSubmit = async (values) => {
        // console.log("Before value:", values)

        //* Remove confirm password from payload values
        const {confirm_password, ...rest} = values
        const registerValue = rest;

        console.log("After value: ", registerValue)

        //TODO: call register api
        handleRegister(registerValue)
    }

    return (
        <section className="bg-slate-100 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="name" value="Full Name" />
                                </div>
                                <TextInput
                                    color={"blue"}
                                    className="border-white"
                                    id="name"
                                    type="text"
                                    placeholder="Example Name"
                                    required
                                    shadow
                                    {...register('full_name', {
                                        required: "Please enter your name!"
                                    })}
                                />
                                <p className="text-red-600 font-medium text-xs mt-1">{errors.full_name?.message}</p>
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="email" value="Email" />
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
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters long!"
                                        },
                                        maxLength: {
                                            value: 32,
                                            message: "Password must be no more than 32 characters long!"
                                        },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&-]/,
                                            message: "Password must contain at least 1 undercase, 1 uppercase, 1 digit and 1 special character!"
                                        }
                                    })}
                                />
                                <p className="text-red-600 font-medium text-xs mt-1">{errors.user_password?.message}</p>
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="confirmPassword"
                                        value="Confirm Password"
                                    />
                                </div>
                                <TextInput
                                    color={"blue"}
                                    id="confirmPassword"
                                    type="password"
                                    name="password"
                                    placeholder="•••••••••"
                                    required
                                    shadow
                                    {...register('confirm_password', {
                                        required: "Please enter your password again!",
                                        validate: (value) => {
                                            const password = watch("user_password");
                                            return password == value || "Password entered is not the same"
                                        }
                                    })}
                                />
                                <p className="text-red-600 font-medium text-xs mt-1">{errors.confirm_password?.message}</p>
                            </div>
                            <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <Checkbox color={"blue"} id="agree" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label
                                            htmlFor="agree"
                                            className="text-gray-500 dark:text-gray-300"
                                        >
                                            I accepted the <span className="text-blue-600 font-semibold hover:underline">terms and conditions</span>
                                        </label>
                                    </div>
                                </div>
                            <Button
                                color="blue"
                                type="submit"
                                className="w-full text-white"
                            >
                                Register
                            </Button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account?{" "}
                                <Link
                                    to={PATH.LOGIN}
                                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                >
                                    Login here
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register
