"use client";

import { Flex, Theme } from "@radix-ui/themes";
import HorizontalNavbar from "./HorizontalNavbar";
import { useEffect, useState } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      // Check if localStorage is available
      const savedDarkMode = localStorage.getItem("isDarkMode");
      return savedDarkMode ? JSON.parse(savedDarkMode) : false;
    } else {
      // Default to false if localStorage is not available
      return false;
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if localStorage is available before saving
      localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
      console.log("here");
    }
  }, [isDarkMode, window]);

  return (
    <Theme appearance={isDarkMode ? "dark" : "light"} className="h-full">
      <Flex className="h-full w-full" direction={"column"}>
        <HorizontalNavbar isDarkMode={isDarkMode} setDarkMode={setDarkMode} />
        <main className="h-full w-full pt-20">{children}</main>
      </Flex>
    </Theme>
  );
}
