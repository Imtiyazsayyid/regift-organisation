"use client";

import { ArrowLeftIcon, ArrowRightIcon, EnvelopeClosedIcon, KeyboardIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { Flex, TextField, Text, Heading, Button } from "@radix-ui/themes";
import React, { useState } from "react";
import * as OrganisationServices from "../../Services/OrganisationServices";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [errors, setErrors] = useState({
    email: "",
    otp: "",
    password: "",
  });

  const [verified, setVerified] = useState({
    email: false,
    otp: false,
    password: false,
  });

  const resetErrors = () => {
    setErrors({
      email: "",
      otp: "",
      password: "",
    });
  };

  const getOTP = async () => {
    resetErrors();
    const res = await OrganisationServices.sendOTP({ email });

    if (!res.data.status) {
      setErrors({ ...errors, email: "Email Not Found." });
      return;
    }

    toast.success("OTP Sent On Mail.");
    setVerified({ ...verified, email: true });
  };

  const verifyOTP = async () => {
    resetErrors();
    const res = await OrganisationServices.verifyOTP({ email, otp });

    if (!res.data.status) {
      setErrors({ ...errors, otp: "OTP not valid" });
      return;
    }

    toast.success("OTP Verified.");
    setVerified({ ...verified, otp: true });
  };

  const resetPassword = async () => {
    resetErrors();
    const res = await OrganisationServices.resetPassword({ email, otp, newPassword: password });

    if (!res.data.status) {
      setErrors({ ...errors, password: "A problem has occured." });
      return;
    }

    toast.success("Password Updated.");
    router.push("/auth/login");
  };

  return (
    <Flex
      className="w-full h-full"
      align={"center"}
      justify={"center"}
      direction={"column"}
      gap={{ initial: "6", md: "9" }}
    >
      <Heading size={{ initial: "6", md: "9" }}>Forgot Password?</Heading>
      {!verified.email && (
        <Flex direction={"column"} gap={"1"} className="w-full md:w-1/2" p={"2"}>
          <Text className="text-xs text-gray-500">Email ID</Text>
          <Text className="text-xs text-red-400">{errors.email}</Text>
          <Flex gap={"2"}>
            <TextField.Root className="w-full" size={"3"} variant="soft">
              <TextField.Slot>
                <EnvelopeClosedIcon height="18" width="18" />
              </TextField.Slot>
              <TextField.Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </TextField.Root>
            <Button size={"3"} variant="solid" onClick={getOTP}>
              <ArrowRightIcon />
            </Button>
          </Flex>
        </Flex>
      )}
      {verified.email && !verified.otp && (
        <Flex direction={"column"} gap={"1"} className="w-full md:w-1/2" p={"2"}>
          <Text className="text-xs text-gray-500">OTP</Text>
          <Text className="text-xs text-red-400">{errors.otp}</Text>
          <Flex gap={"2"}>
            <TextField.Root className="w-full" size={"3"} variant="soft">
              <TextField.Slot>
                <LockClosedIcon height="18" width="18" />
              </TextField.Slot>
              <TextField.Input value={otp} onChange={(e) => setOtp(e.target.value)} type="password" />
            </TextField.Root>
            <Button size={"3"} variant="solid" onClick={verifyOTP}>
              <ArrowRightIcon />
            </Button>
          </Flex>
        </Flex>
      )}
      {verified.email && verified.otp && !verified.password && (
        <Flex direction={"column"} gap={"1"} className="w-full md:w-1/2" p={"2"}>
          <Text className="text-xs text-gray-500">New Password</Text>
          <Text className="text-xs text-red-400">{errors.password}</Text>
          <Flex gap={"2"}>
            <TextField.Root className="w-full" size={"3"} variant="soft">
              <TextField.Slot>
                <LockClosedIcon height="18" width="18" />
              </TextField.Slot>
              <TextField.Input value={password} onChange={(e) => setPassword(e.target.value)} />
            </TextField.Root>
            <Button size={"3"} variant="solid" onClick={resetPassword}>
              <ArrowRightIcon />
            </Button>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default ForgotPasswordPage;
