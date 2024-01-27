"use client";

import { Flex, Theme } from "@radix-ui/themes";
import HorizontalNavbar from "./HorizontalNavbar";
import { useEffect, useState } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    // console.log(localStorage.getItem("theme"));

    if (theme == "") {
      let localStorageTheme = localStorage.getItem("theme");
      if (localStorageTheme) {
        setTheme(localStorageTheme);
      }
    } else {
      setTheme(theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return (
    <Theme appearance={theme as "light" | "dark"} className="h-full">
      <Flex className="h-full w-full" direction={"column"}>
        <HorizontalNavbar
          isDarkMode={theme === "dark" ? true : false}
          setDarkMode={(isDarkMode) => setTheme(isDarkMode ? "dark" : "light")}
        />
        <main className="h-full w-full pt-20">{children}</main>
      </Flex>
    </Theme>
  );
}
