"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDown, Home, LogOut, User } from "lucide-react";
import { useState } from "react";

const UserMenuAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild className="!outline-none">
        <button className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-xs">My Account</p>
          <ChevronDown
            className={cn(
              "transform text-primary duration-500",
              isOpen && "rotate-180",
            )}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <DropdownMenuGroup className="flex flex-col items-center justify-center gap-2 px-4 py-4">
          <Avatar className="size-16">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          </Avatar>
          <p className="text-sm">testuser123@gmail.com</p>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="h-0.5" />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer items-center gap-2 duration-300 hover:!text-primary">
            <Home className="size-4" />
            <span className="text-xs">Dashboard</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer items-center gap-2 duration-300 hover:!text-primary">
            <User className="size-4" />
            <span className="text-xs">Profile</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="h-0.5" />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer items-center gap-2 duration-300 hover:!text-destructive">
            <LogOut className="size-4" />
            <span className="text-xs">Logout</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenuAdmin;
