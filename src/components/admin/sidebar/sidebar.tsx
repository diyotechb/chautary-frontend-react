import { Button } from "@/components/ui/button";
import { AdminSideBarLinks } from "@/lib/admin-sidebar-nav";
import { cn } from "@/lib/utils";
import { ChevronDown, LogOut } from "lucide-react";
import Link from "next/link";

interface SidebarAdminProps {
  className?: string;
}

const SidebarAdmin: React.FC<SidebarAdminProps> = ({ className = "" }) => {
  return (
    <aside
      className={cn(
        "flex h-[91.8vh] w-full max-w-[250px] flex-col items-start justify-between pb-12 pt-4",
        className,
      )}
    >
      <div className="w-full space-y-4">
        {AdminSideBarLinks.map((item) => (
          <div key={item.title} className="space-y-1">
            <p className="pl-4 text-xs uppercase text-muted-foreground">
              {item.title}
            </p>
            <div className="">
              {item.navs.map((nav) => (
                <div key={nav.title}>
                  {nav.href ? (
                    <Link
                      href={nav.href}
                      className="flex items-center justify-between border-l-4 border-primary py-4 pl-4 font-medium duration-300 hover:bg-gray-50 hover:text-primary"
                    >
                      <div className="flex h-full items-center space-x-2">
                        {nav.icon}
                        <span className="text-sm">{nav.title}</span>
                      </div>
                      <ChevronDown
                        className={cn(
                          "size-4 stroke-muted-foreground",
                          nav.subNavs.length === 0 && "invisible",
                        )}
                      />
                    </Link>
                  ) : (
                    <div className="flex items-center justify-between py-4 font-medium duration-300 hover:bg-gray-50 hover:text-primary">
                      <div className="flex items-center space-x-2 pl-4">
                        {nav.icon}
                        <span className="text-sm">{nav.title}</span>
                      </div>
                      <ChevronDown
                        className={cn(
                          "size-4 stroke-muted-foreground",
                          nav.subNavs.length === 0 && "invisible",
                        )}
                      />
                    </div>
                  )}

                  <div>
                    {nav.subNavs.map((subNav) => (
                      <Link
                        href={subNav.href}
                        key={subNav.title}
                        className="flex items-center space-x-2 border-l-4 border-primary py-3 pl-6 duration-300 hover:bg-gray-50 hover:text-primary"
                      >
                        <span className="text-sm">{subNav.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full px-4">
        <Button
          variant="outline"
          className="mx-auto w-full space-x-2 !border-destructive text-destructive duration-300 hover:bg-destructive hover:text-white"
        >
          <LogOut className="size-4" />
          <span className="text-xs">Logout</span>
        </Button>
      </div>
    </aside>
  );
};

export default SidebarAdmin;
