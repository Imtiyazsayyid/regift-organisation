"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as OrganisationServices from "../../Services/OrganisationServices";
import { donorSchema, loginSchema, organisationSchema } from "@/app/validationSchemas";
import { BsGlobe, BsGlobe2 } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { IoKey } from "react-icons/io5";
import toast from "react-hot-toast";
import { FaArrowRight, FaLock, FaUser } from "react-icons/fa";
import { Avatar, Button, Flex, Heading, Text, TextArea, TextField } from "@radix-ui/themes";
import { CldUploadWidget } from "next-cloudinary";
import { ArrowRightIcon, CameraIcon, LockClosedIcon } from "@radix-ui/react-icons";

export interface CloudinaryResult {
  url: string;
  public_id: string;
}

const RegisterPage = () => {
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

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    websiteUrl: "",
    address: "",
    userExists: "",
    otp: "",
  });

  const router = useRouter();

  const resetErrors = () => {
    setErrors({ name: "", email: "", password: "", websiteUrl: "", address: "", userExists: "", otp: "" });
  };

  const handleSubmit = async () => {
    resetErrors();
    const validation = organisationSchema.safeParse(organisationDetails);

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

    const otpToast = toast.loading("Sending OTP...");

    const res = await OrganisationServices.register(organisationDetails);

    toast.dismiss(otpToast);
    if (res.data.status) {
      toast.success("OTP Sent on Mail");
      setShowOtp(true);
    } else {
      toast.error("Failed To Send OTP");
      setErrors({
        name: "",
        email: "",
        password: "",
        websiteUrl: "",
        address: "",
        otp: "",
        userExists: "Email already in use",
      });
    }
  };

  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const verifyOTP = async () => {
    const otpToast = toast.loading("Verifying OTP...");
    resetErrors();
    const res = await OrganisationServices.verifyOTP({ email: organisationDetails.email, otp });

    toast.dismiss(otpToast);

    if (!res.data.status) {
      toast.error("Verification Failed.");
      setErrors({ ...errors, otp: "OTP is not valid" });
      return;
    }

    toast.success("OTP Verified.");
    router.push("/auth/login");
  };

  const handleGoBack = async () => {
    const res = await OrganisationServices.deleteOrganisation({ email: organisationDetails.email });

    if (!res.data.status) {
      toast.error("Server Error.");
      return;
    }

    setShowOtp(false);
  };

  return (
    <Flex className="h-full w-full px-4 sm:px-8 md:px-12 lg:px-16 py-20" direction={"column"} gap={"5"}>
      {/* row 1 */}
      <Flex className="w-full" justify={"center"} align={"center"} gap={"2"} mb={"2"}>
        <BsGlobe2 className="text-3xl md:text-7xl" />
        <Heading size={{ initial: "7", md: "9" }} align={"center"}>
          Regift Organisation.
        </Heading>
      </Flex>

      <Flex className="w-full" justify={"center"} align={"center"} gap={"2"}>
        <Heading align={"center"} size={"5"}>
          Register With Us.
        </Heading>
      </Flex>

      {!showOtp && (
        <Flex justify={"center"}>
          <Flex gap={"6"} direction={"column"} className="lg:w-2/3">
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
                      fallback={organisationDetails.acronym || <CameraIcon height={"50"} width={"50"} />}
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
            <div className="w-full grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
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
            <div className="w-full grid grid-cols-1 sm:grid-cols-1 gap-4">
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
            <Flex justify={"center"} mt={{ md: "6" }} mb={"9"}>
              <Flex className="w-full sm:w-full lg:w-1/3" gap={"2"} justify="center">
                <Button
                  onClick={() => {
                    handleSubmit();
                    // router.back();
                  }}
                  className="w-96"
                >
                  Create Account
                </Button>
              </Flex>
            </Flex>
            <Flex className="min-h-[50px]"></Flex>
          </Flex>
        </Flex>
      )}

      {showOtp && (
        <Flex justify={"center"} className="h-full" align={"center"} direction={"column"}>
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
          <Text>
            If you have entered an incorrect email or not recieved the password.{" "}
            <span className="font-semibold text-pink-500 cursor-pointer" onClick={handleGoBack}>
              Go Back
            </span>
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default RegisterPage;
