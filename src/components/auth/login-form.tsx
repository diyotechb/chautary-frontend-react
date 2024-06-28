import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const LoginForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2"></CardContent>
      <CardFooter>
        <Button className="w-full">Login Now</Button>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
