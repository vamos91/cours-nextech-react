import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Alert
} from "@material-tailwind/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query";
import {signup} from '../services/api/user'

const Signup = () => {
    const [isLogged, setIsLogged] = useState(false)
    const navigate = useNavigate()

    const {handleSubmit, register, formState: { errors }, watch} = useForm()

    const addUser = useMutation({
        mutationFn: (body) => signup(body.email, body.password),
        onSuccess: (responseFromServer) => {
            console.log(responseFromServer)
            navigate('/signin') 
        },
        onError: (error) => {
            alert(error)
        }
   })

    const sendDataToBack = async (data) => {
        addUser.mutate(data) 
    }

    return (
        <div className="flex items-center justify-center h-screen">
           <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
                Sign Up
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Nice to meet you! Enter your details to register.
            </Typography>
            <form onSubmit={handleSubmit(sendDataToBack)} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-1 flex flex-col gap-6">
                        {
                            isLogged &&  <Alert color="red">An error alert for showing message.</Alert>
                        }
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Your Email
                </Typography>
                <Input
                            size="lg"
                            {...register("email", {required: true})}
                            type="email"
                            placeholder="name@mail.com"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                            className: "before:content-none after:content-none",
                            }}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Password
                </Typography>
                        <Input
                            {...register("password", {required: true, minLength: 8})}
                            type="password"
                            size="lg"
                            placeholder="********"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                            className: "before:content-none after:content-none",
                            }}
                        />
                        {errors.password && <span>This field is required</span>}
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Confirm Password
                </Typography>
                    <Input
                            {...register("confirm-password")}
                            type="password"
                            size="lg"
                            placeholder="********"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                            className: "before:content-none after:content-none",
                            }}
                />
                </div>
                <Checkbox
                label={
                    <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center font-normal"
                    >
                    I agree the
                    <a
                        href="#"
                        className="font-medium transition-colors hover:text-gray-900"
                    >
                        &nbsp;Terms and Conditions
                    </a>
                    </Typography>
                }
                containerProps={{ className: "-ml-2.5" }}
                />
                <Button type="submit" className="mt-6" fullWidth>
                sign up
                </Button>
                <Typography color="gray" className="mt-4 text-center font-normal">
                Already have an account?{" "}
                <Link to='/signin'>Signin</Link>
                </Typography>
            </form>
            </Card>
        </div>
    );
};

export default Signup;