"use client";

import { ArrowRightIcon, EnvelopeClosedIcon, GlobeIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { Button, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as OrganisationServices from "../../Services/OrganisationServices";
import { TokenService } from "../../Services/StorageService";
import { loginSchema } from "@/app/validationSchemas";

const LoginPage = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    user_role: "organisation",
  });

  const [errors, setErrors] = useState({
    invalidCredentials: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const resetErrors = () => {
    setErrors({ email: "", password: "", invalidCredentials: "" });
  };

  const handleSubmit = async () => {
    resetErrors();
    const validation = loginSchema.safeParse(userDetails);

    if (!validation.success) {
      const errorArray = validation.error.errors;

      for (let error of errorArray) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [error.path[0]]: error.message,
        }));
      }
      return;
    }

    const res = await OrganisationServices.login(userDetails);

    if (res.data.status) {
      const refreshToken = res.data.data;

      const accessTokenResponse = await OrganisationServices.getAccessToken(refreshToken);

      console.log({ accessTokenResponse });

      if (!accessTokenResponse.data.status) {
        throw new Error("status false in getting Access Token");
      }

      TokenService.saveAccessToken(accessTokenResponse.data.data);
      router.push("/organisation");
    } else {
      setErrors({
        email: "",
        password: "",
        invalidCredentials: "Invalid Credentials.",
      });
    }
  };

  return (
    <Flex className="h-full w-full bg-[#111111] lg:bg-white">
      <div className="hidden lg:flex w-2/5 h-full bg-[#111111] items-center justify-center">
        <GlobeIcon className="h-1/2 w-1/2 text-white" />
      </div>
      <Flex
        direction={"column"}
        p={"5"}
        justify={"center"}
        align={"center"}
        className="h-5/6 lg:h-full w-full lg:w-3/5"
      >
        <div className="h-1/3 lg:hidden mb-10 w-full text-white py-10">
          <GlobeIcon className="h-full w-full" />
        </div>
        <Flex
          gap={"1"}
          direction={"column"}
          className="w-full px-10 py-10 bg-white rounded-xl"
          justify={"center"}
          align={"center"}
        >
          <Heading size={{ initial: "3", md: "8" }} mb={"4"} align={"center"}>
            Welcome To Regift <Text color="crimson">Organisation</Text>.
          </Heading>

          <Text className="text-xs" my={"2"} color="crimson">
            {errors.invalidCredentials}
          </Text>

          <Flex direction={"column"} gap={"1"} className="w-full lg:w-2/3">
            {errors.email && (
              <Text className="text-xs" color="crimson">
                {errors.email}
              </Text>
            )}
            <TextField.Root className="w-full" size={"3"}>
              <TextField.Slot>
                <EnvelopeClosedIcon height="20" width="20" />
              </TextField.Slot>
              <TextField.Input
                placeholder="Email"
                value={userDetails.email}
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    email: e.target.value,
                  })
                }
              />
            </TextField.Root>
          </Flex>

          <Flex direction={"column"} gap={"1"} mb={"4"} className="w-full lg:w-2/3">
            {errors.password && (
              <Text className="text-xs" color="crimson" mt={"2"}>
                {errors.password}
              </Text>
            )}
            <TextField.Root className="w-full" size={"3"}>
              <TextField.Slot>
                <LockClosedIcon height="20" width="20" />
              </TextField.Slot>
              <TextField.Input
                placeholder="Password"
                type="password"
                value={userDetails.password}
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    password: e.target.value,
                  })
                }
              />
            </TextField.Root>
          </Flex>
          <Flex className="w-full lg:w-2/3 mb-2" justify={"end"}>
            <Text
              color="pink"
              className="font-semibold cursor-pointer"
              onClick={() => router.push("/auth/forgot-password")}
            >
              Forgot Password?
            </Text>
          </Flex>
          <Flex className="w-full lg:w-2/3" justify={"end"}>
            <Button size={"3"} onClick={handleSubmit} className="w-full">
              Login
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
