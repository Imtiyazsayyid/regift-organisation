"use client";
import { Avatar, Button, Flex, Select, Text, TextArea, TextField, Grid } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import { organisationSchema } from "../../validationSchemas";
import * as AdminServices from "../../Services/OrganisationServices";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export interface CloudinaryResult {
  url: string;
  public_id: string;
}

interface Props {
  id?: number;
  name?: string;
  acronym?: string;
  email?: string;
  websiteUrl?: string;
  password?: string;
  logo?: string;
  address?: string;
}

const OrganisationForm = ({ id, name, acronym, email, websiteUrl, logo, address, password }: Props) => {
  const router = useRouter();

  const [organisationDetails, setOrganisationDetails] = useState({
    id: null as number | undefined | null,
    name: "",
    acronym: "",
    email: "",
    password: "",
    websiteUrl: "",
    logo: "",
    address: "",
  });

  useEffect(() => {
    setOrganisationDetails({
      id: id,
      name: name || "",
      acronym: acronym || "",
      email: email || "",
      password: password || "",
      websiteUrl: websiteUrl || "",
      logo: logo || "",
      address: address || "",
    });
  }, [id, name, acronym, email, websiteUrl, logo, address, password]);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    websiteUrl: "",
    address: "",
  });

  const handleSave = async () => {
    setErrors(() => ({
      name: "",
      email: "",
      password: "",
      websiteUrl: "",
      address: "",
      approvalStatus: "",
    }));

    const validation = organisationSchema.safeParse(organisationDetails);

    if (!validation.success) {
      console.log(validation.error.errors);
      const errorArray = validation.error.errors;

      for (let error of errorArray) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [error.path[0]]: error.message,
        }));
      }
      return;
    }

    const res = await AdminServices.saveOrganisation(organisationDetails);

    if (!res.data.status) {
      toast.error("Failed to Save");
      return;
    }

    toast.success("Saved Successfully");
  };

  return (
    <Flex className="h-full w-full px-4 sm:px-8 md:px-12 lg:px-16" direction={"column"} gap={"5"}>
      {/* row 1 */}
      <Flex className="w-full" gap={"4"} justify={"center"} mt={{ initial: "0", md: "9" }}>
        <CldUploadWidget
          options={{
            sources: ["local", "url"],
            multiple: false,
            cropping: true,
            styles: {
              palette: {
                window: "#ffffff",
                sourceBg: "#f4f4f5",
                windowBorder: "#90a0b3",
                tabIcon: "#000000",
                inactiveTabIcon: "#555a5f",
                menuIcons: "#555a5f",
                link: "#0433ff",
                action: "#339933",
                inProgress: "#0433ff",
                complete: "#339933",
                error: "#cc0000",
                textDark: "#000000",
                textLight: "#fcfffd",
              },
              fonts: {
                default: null,
                "sans-serif": {
                  url: null,
                  active: true,
                },
              },
            },
          }}
          uploadPreset="oekh1dfb"
          onUpload={(result) => {
            if (result.event !== "success") return;
            const info = result.info as CloudinaryResult;
            setOrganisationDetails({
              ...organisationDetails,
              logo: info.url,
            });
          }}
        >
          {({ open }) => (
            <button
              onClick={() => {
                open();
              }}
            >
              <Avatar
                fallback={organisationDetails.acronym}
                radius="full"
                size={"9"}
                mb={"9"}
                src={organisationDetails.logo}
                className="cursor-pointer"
              />
            </button>
          )}
        </CldUploadWidget>
      </Flex>

      {/* row 2 */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4 items-end">
        {/* Organisation name */}
        <Flex direction={"column"} className="w-full" gap={"1"}>
          <Text className="text-xs text-slate-400">Name</Text>
          <Text className="text-xs text-red-400">{errors.name}</Text>
          <TextField.Root>
            <TextField.Input
              value={organisationDetails.name}
              onChange={(e) =>
                setOrganisationDetails({
                  ...organisationDetails,
                  name: e.target.value,
                })
              }
            />
          </TextField.Root>
        </Flex>

        {/* Acronym */}
        <Flex direction={"column"} className="w-full" gap={"1"}>
          <Text className="text-xs text-slate-400">Acronym</Text>
          <TextField.Root>
            <TextField.Input
              value={organisationDetails.acronym}
              onChange={(e) =>
                setOrganisationDetails({
                  ...organisationDetails,
                  acronym: e.target.value,
                })
              }
            />
          </TextField.Root>
        </Flex>

        {/* Organisation email */}
        <Flex direction={"column"} className="w-full" gap={"1"}>
          <Text className="text-xs text-slate-400">Email</Text>
          <Text className="text-xs text-red-400">{errors.email}</Text>
          <TextField.Root>
            <TextField.Input
              value={organisationDetails.email}
              onChange={(e) =>
                setOrganisationDetails({
                  ...organisationDetails,
                  email: e.target.value,
                })
              }
            />
          </TextField.Root>
        </Flex>
      </div>

      {/* row 3 */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Password */}
        <Flex direction={"column"} className="w-full" gap={"1"}>
          <Text className="text-xs text-slate-400">Password</Text>
          <Text className="text-xs text-red-400">{errors.password}</Text>
          <TextField.Root>
            <TextField.Input
              value={organisationDetails.password}
              type="password"
              onChange={(e) =>
                setOrganisationDetails({
                  ...organisationDetails,
                  password: e.target.value,
                })
              }
            />
          </TextField.Root>
        </Flex>

        {/* Website Url */}
        <Flex direction={"column"} className="w-full" gap={"1"}>
          <Text className="text-xs text-slate-400">Website Url</Text>
          <Text className="text-xs text-red-400">{errors.websiteUrl}</Text>
          <TextField.Root>
            <TextField.Input
              type="url"
              value={organisationDetails.websiteUrl}
              onChange={(e) =>
                setOrganisationDetails({
                  ...organisationDetails,
                  websiteUrl: e.target.value,
                })
              }
            />
          </TextField.Root>
        </Flex>
      </div>

      {/* row 4 */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Address */}
        <Flex direction={"column"} className="w-full h-40" gap={"1"}>
          <Text className="text-xs text-slate-400">Address</Text>
          <Text className="text-xs text-red-400">{errors.address}</Text>
          <TextArea
            className="h-full w-full"
            value={organisationDetails.address}
            onChange={(e) =>
              setOrganisationDetails({
                ...organisationDetails,
                address: e.target.value,
              })
            }
          />
        </Flex>
        <Flex className="w-full"></Flex>
        <Flex className="w-full"></Flex>
      </div>

      <Flex justify={"center"} mt={{ md: "6" }}>
        <Flex className="w-full sm:w-full lg:w-1/3" gap={"2"} justify="center">
          <Button onClick={() => handleSave()} className="w-1/2">
            Save
          </Button>
          <Button onClick={() => router.back()} className="w-1/2" color="red">
            Cancel
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default OrganisationForm;
