import { authService } from "@/services";
import {
  RegistrationSchema,
  type TRegistrationSchema,
} from "@/validations/register.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const RegisterForm = () => {
  const form = useForm<TRegistrationSchema>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
    resolver: zodResolver(RegistrationSchema),
  });

  const { mutate: registerUser, isPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: authService.RegisterUser,
    onSuccess: (res) => {
      toast.success(res?.data?.message);
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });

  const submitHandler = (data: TRegistrationSchema) => {
    registerUser({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      middleName: "",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)}>
          <CardContent className="space-y-4">
            <FormField
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="username">First Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="enter your first name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="username">Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="enter your last name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="username">Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="enter your email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="username">Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="enter your password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="username">Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="enter your password again"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending && (
                <Loader className="ml-2 animate-spin text-inherit" />
              )}
              Register Now
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default RegisterForm;
