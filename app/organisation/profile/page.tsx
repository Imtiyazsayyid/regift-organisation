'use client';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { Flex, Heading } from "@radix-ui/themes";
import Form from '../Form';
import Seperator from "@/app/components/Seperator";
import { Organisation } from "../../../app/interfaces/OrganisationInterface";
import * as OrganisationServices from "../../Services/OrganisationServices";
import toast from 'react-hot-toast';


const page = () => {
  const [organisation, setOrganisation] = useState<Organisation>();
  const router = useRouter();

  const getOrganisationDetail = async () => {
    const res = await OrganisationServices.getOrganisationDetails();
    if (!res.status) {
      toast.error("Could Not Get Organisation.");
      router.back();
    }
    setOrganisation(res.data.data);
  };

  useEffect(() => {
    getOrganisationDetail();
  }, []);

  return (
    <Flex
      className="w-full p-10 overflow-hidden overflow-y-auto"
      direction={"column"}
      gap={"5"}
      align={"center"}
    >
      <Heading align={"center"}>Update Details</Heading>
      <Seperator />
      <Form
        id={organisation?.id}
        name={organisation?.name}
        acronym={organisation?.acronym || ""}
        email={organisation?.email}
        password={organisation?.password}
        websiteUrl={organisation?.websiteUrl || ""}
        logo={organisation?.logo || ""}
        address={organisation?.address || ""}
      />
    </Flex>
  );
}

export default page;