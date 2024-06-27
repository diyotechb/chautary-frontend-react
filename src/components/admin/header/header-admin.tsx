import { Menu, Plus } from "lucide-react";
import Logo from "../../logo";
import UserMenuAdmin from "./user-menu-admin";
import { Button } from "@/components/ui/button";

const HeaderAdmin = () => {
  return (
    <header className="flex items-center justify-between px-3 py-4 shadow lg:px-24">
      <div className="flex items-center gap-2">
        <Menu className="sm:hidden" />
        <Logo />
      </div>
      <div className="flex items-center gap-8">
        <UserMenuAdmin />
        <Button
          variant="outline"
          className="rounded-full !border-primary p-5 text-primary duration-300 hover:bg-primary hover:text-white"
        >
          <Plus />
          <span>Add Listings</span>
        </Button>
      </div>
    </header>
  );
};

export default HeaderAdmin;
