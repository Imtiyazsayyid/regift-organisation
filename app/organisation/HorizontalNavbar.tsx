"use client";
import { Avatar, DropdownMenu, Flex, Heading, Text } from "@radix-ui/themes";
import { usePathname, useRouter } from "next/navigation";

import { FaRegBell } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
// import { TbSettings } from "react-icons/tb";
import { IoMenu } from "react-icons/io5";
import { FaBoxOpen } from "react-icons/fa";
import { GearIcon, PersonIcon } from "@radix-ui/react-icons";
import { IoLogOutOutline } from "react-icons/io5";

import { AiFillHome } from "react-icons/ai";
import { TbDeviceDesktopSearch } from "react-icons/tb";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import * as OrganisationServices from "../Services/OrganisationServices";
import { TokenService } from "../Services/StorageService";

const HorizontalNavBar = () => {
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
    } else if (
      itemLink !== "/organisation" &&
      currentPath.substring(13).startsWith(itemLink.substring(13))
    ) {
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
        className="min-h-20 h-20 max-h-20 w-full bg-white shadow-sm px-3 md:px-16 border"
        justify={"between"}
      >
        <div
          className="flex flex-col justify-center md:hidden cursor-piinter"
          onClick={() => setDropdownActive(!isDropdownActive)}
        >
          <IoMenu className="text-4xl" />
        </div>
        <Flex gap={"6"}>
          <Flex
            className="h-full w-full pl-10"
            align={"center"}
            justify={"end"}
            gap={"2"}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Avicii_-_Logo.png"
              className="h-1/3 md:h-1/2 w-fit object-cover"
            />
            <Heading size={{ initial: "3", sm: "5" }}>Regift</Heading>
          </Flex>
          <div className="hidden md:flex items-center">
            {ListItems.map((item) => (
              <Flex
                className={`py-2 px-5 rounded-lg cursor-pointer ${
                  isCurrentPath(item.link) && "bg-slate-100"
                }`}
                key={item.link}
                onClick={() => router.push(item.link)}
              >
                <Text>{item.label}</Text>
              </Flex>
            ))}
          </div>
        </Flex>
        <Flex align={"center"} gap={"4"}>
          <FaRegBell className="text-2xl text-slate-400 cursor-pointer" />
          <FaCartShopping className="text-2xl cursor-pointer font-bold" />
          <Flex>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Flex>
                  <Avatar
                    fallback={"?"}
                    radius="full"
                    className="cursor-pointer"
                  />
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
        className="md:hidden sm:block overflow-hidden shadow-sm border-b"
        animate={
          isDropdownActive ? { height: "fit-content" } : { height: "0px" }
        }
      >
        <Flex className="h-full w-full bg-white top-20" direction={"column"}>
          {ListItems.map((item) => (
            <Flex
              className="border-slate-100"
              key={item.link}
              onClick={() => {
                router.push(item.link);
                setDropdownActive(false);
              }}
            >
              <Flex
                gap={"3"}
                className={`px-5 py-4 w-full ${
                  isCurrentPath(item.link) && "bg-blue-600 text-white"
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
