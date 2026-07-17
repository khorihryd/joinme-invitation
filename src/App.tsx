/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import AppRuntime from "../joinme/apps/runtime/src/App";
import AppLanding from "../joinme/apps/landing/src/App";
import AppAuth from "../joinme/apps/auth/src/App";
import AppDashboard from "../joinme/apps/dashboard/src/App";

export default function App() {
  const [page, setPage] = useState<string>("landing");

  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const invite = params.get("invite");
      const pageParam = params.get("page");

      if (invite) {
        setPage("runtime");
      } else if (pageParam === "login" || pageParam === "register") {
        setPage("auth");
      } else if (pageParam === "dashboard") {
        setPage("dashboard");
      } else {
        setPage("landing");
      }
    };

    // Initial check
    handleUrlChange();

    // Listen for pushstate / replacestate custom events or general navigation changes
    window.addEventListener("popstate", handleUrlChange);
    return () => {
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, []);

  switch (page) {
    case "runtime":
      return <AppRuntime />;
    case "auth":
      return <AppAuth />;
    case "dashboard":
      return <AppDashboard />;
    case "landing":
    default:
      return <AppLanding />;
  }
}
