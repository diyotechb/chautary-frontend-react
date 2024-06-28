import { loginSchema, type TLoginSchema } from "@/validations/login.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

const LoginForm = () => {
  const form = useForm<TLoginSchema>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const submitHandler = (data: TLoginSchema) => {
    console.log(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)}>
          <CardContent className="space-y-4">
            <FormField
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="username">Email or Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="enter your email or username"
                    />
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
                    <Input {...field} placeholder="enter your password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Login Now
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default LoginForm;
