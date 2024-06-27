import HeaderAdmin from "@/components/admin/header/header-admin";
import SidebarAdmin from "@/components/admin/sidebar/sidebar";
import React from "react";

const RootAdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HeaderAdmin />
      <div className="flex">
        <SidebarAdmin className="border-r" />
        <div className="p-8">{children}</div>
      </div>
    </>
  );
};

export default RootAdminLayout;
