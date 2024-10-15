import { Outlet, useActionData, useSubmit } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";
import { useEffect } from "react";

function RootLayout() {
  const token = useActionData();
  const submit = useSubmit();
  useEffect(() => {
    if (!token) {
      return;
    }

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, 1 * 60 * 60 * 1000);
  }, [token, submit]);
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
