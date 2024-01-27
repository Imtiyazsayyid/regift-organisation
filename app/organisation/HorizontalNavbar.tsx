"use client";
import { Avatar, Box, DropdownMenu, Flex, Heading, Switch, Text } from "@radix-ui/themes";
import { usePathname, useRouter } from "next/navigation";

import { FaRegBell } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
// import { TbSettings } from "react-icons/tb";
import { IoMenu } from "react-icons/io5";
import { FaBoxOpen } from "react-icons/fa";
import { GearIcon, GlobeIcon, MoonIcon, PersonIcon, SunIcon } from "@radix-ui/react-icons";
import { IoLogOutOutline } from "react-icons/io5";

import { AiFillHome } from "react-icons/ai";
import { TbDeviceDesktopSearch } from "react-icons/tb";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import * as OrganisationServices from "../Services/OrganisationServices";
import { TokenService } from "../Services/StorageService";

interface Props {
  isDarkMode: boolean;
  setDarkMode: (isDarkMode: boolean) => void;
}

const HorizontalNavBar = ({ isDarkMode, setDarkMode }: Props) => {
  useEffect(() => {
    OrganisationServices.getOrganisationDetails();
  }, []);

  const ListItems = [
    {
      link: "/organisation",
      label: "Home",
      icon: <AiFillHome className="text-2xl" />,
    },
    {
      link: "/organisation/browse",
      label: "Browse",
      icon: <TbDeviceDesktopSearch className="text-2xl" />,
    },
    {
      link: "/organisation/orders",
      label: "Orders",
      icon: <FaBoxOpen className="text-2xl" />,
    },
  ];

  const router = useRouter();
  const currentPath = usePathname();
  const [isDropdownActive, setDropdownActive] = useState(false);

  const isCurrentPath = (itemLink: string) => {
    if (itemLink === "/organisation" && currentPath === "/organisation") {
      return true; // Exact match for home
    } else if (itemLink !== "/organisation" && currentPath.substring(13).startsWith(itemLink.substring(13))) {
      return true; // Starts with for other links
    } else {
      return false;
    }
  };

  const signOut = () => {
    TokenService.removeAccessToken();
    router.push("/auth/login");
  };

  return (
    <Flex className="fixed w-full z-50" direction={"column"}>
      <Flex
        className="min-h-20 h-20 max-h-20 w-full shadow-sm px-3 md:px-16 border-b dark:border-b-[var(--gray-a2)] border-slate-50"
        justify={"between"}
      >
        <Flex gap={"3"}>
          <div
            className="flex flex-col justify-center md:hidden cursor-piinter"
            onClick={() => setDropdownActive(!isDropdownActive)}
          >
            <IoMenu className="text-4xl" />
          </div>
          <Flex className="h-full w-full cursor-pointer" align={"center"} justify={"start"} gap={"5"}>
            <Flex gap={"2"} align={"center"} onClick={() => router.push("/organisation")}>
              <GlobeIcon className="h-8 w-8 md:h-10 md:w-10" />
              <Heading size={{ initial: "3", sm: "5" }}>Regift</Heading>
            </Flex>
            <div className="hidden md:flex items-center">
              {ListItems.map((item) => (
                <Flex
                  className={`py-2 px-5 rounded-lg cursor-pointer ${
                    isCurrentPath(item.link) && "bg-slate-100 dark:bg-[var(--gray-a2)]"
                  }`}
                  key={item.link}
                  onClick={() => router.push(item.link)}
                >
                  <Text>{item.label}</Text>
                </Flex>
              ))}
            </div>
          </Flex>
        </Flex>
        <Flex gap={"6"}></Flex>
        <Flex align={"center"} gap={"4"}>
          <Flex gap={"3"} mr={{ initial: "1", md: "5" }}>
            {isDarkMode ? (
              <MoonIcon color="gray" height={"20"} width={"20"} />
            ) : (
              <SunIcon color="gray" height={"20"} width={"20"} />
            )}
            <Switch checked={isDarkMode} onCheckedChange={(val) => setDarkMode(val)} />
          </Flex>

          <FaRegBell className="text-2xl text-slate-400 cursor-pointer" />
          <FaCartShopping
            className="text-2xl cursor-pointer font-bold"
            onClick={() => router.push("/organisation/cart")}
          />
          <Flex>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Flex>
                  <Avatar fallback={"?"} radius="full" className="cursor-pointer" />
                </Flex>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item>
                  <Flex gap={"2"} align={"center"}>
                    <GearIcon /> Settings
                  </Flex>
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                  <Flex gap={"2"} align={"center"}>
                    <PersonIcon /> Profile
                  </Flex>
                </DropdownMenu.Item>
                <DropdownMenu.Item onClick={() => signOut()}>
                  <Flex gap={"2"} align={"center"}>
                    <IoLogOutOutline /> Logout
                  </Flex>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </Flex>
        </Flex>
      </Flex>

      <motion.div
        className="md:hidden sm:block overflow-hidden shadow-sm border-b dark:border-b-[var(--gray-a2)] h-0"
        animate={isDropdownActive ? { height: "fit-content" } : { height: "0px" }}
      >
        <Flex className="h-full w-full top-20 bg-white dark:bg-[#111111] bg-s z-50" direction={"column"}>
          {ListItems.map((item) => (
            <Flex
              className="border-slate-100"
              key={item.link}
              onClick={() => {
                router.push(item.link);
                setDropdownActive(false);
              }}
            >
              {isCurrentPath(item.link) && <div className="w-1 bg-[var(--crimson-a9)]"></div>}
              <Flex
                gap={"3"}
                className={`px-5 py-4 w-full ${
                  isCurrentPath(item.link) && "bg-[var(--crimson-a3)] text-[var(--crimson-a9)]"
                }`}
              >
                {item.icon}
                <Text>{item.label}</Text>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </motion.div>
    </Flex>
  );
};

export default HorizontalNavBar;
