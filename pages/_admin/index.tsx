import React, { useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import withAdminLayout from "@/libs/components/layout/LayoutAdmin";

const AdminHome: NextPage = (props: any) => {
  const router = useRouter();

  /** LIFECYCLES **/
  useEffect(() => {
    router.push("/_admin/users");
  }, []);
  return <></>;
};

export default withAdminLayout(AdminHome);
