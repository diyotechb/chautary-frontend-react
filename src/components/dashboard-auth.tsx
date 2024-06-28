"use client";

import { ChevronRight } from "lucide-react";
import { useState } from "react";
import LoginForm from "./auth/login-form";
import RegisterForm from "./auth/register-form";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const DashboardAuth = () => {
  const [activeTab, setActiveTab] = useState<string>("login");
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="rounded-full border border-primary px-8 py-6 text-primary !ring-0 duration-500 hover:bg-primary hover:text-white"
          >
            Dashboard <ChevronRight />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="mt-8 w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
              <span className="mt-2 flex items-center justify-center text-center text-sm">
                Don&apos;t have an account?
                <Button
                  className="pl-1"
                  variant="link"
                  onClick={() => {
                    setActiveTab("register");
                  }}
                >
                  Register now
                </Button>
              </span>
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm />
              <span className="mt-2 flex items-center justify-center text-center text-sm">
                Already have an account?
                <Button
                  className="pl-1"
                  variant="link"
                  onClick={() => {
                    setActiveTab("login");
                  }}
                >
                  Login now
                </Button>
              </span>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardAuth;
