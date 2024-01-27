"use client";

import { DonatedItem } from "@/app/interfaces/DonatedItemInterface";
import { Button, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

import * as OrganisationServices from "../../../Services/OrganisationServices";
import toast from "react-hot-toast";

import ConditionBadge from "../../../components/ConditionBadge";
import Loader from "@/app/components/Loader";

interface Props {
  params: {
    id: string;
  };
}

const ProductDetailPage = ({ params }: Props) => {
  const [product, setProduct] = useState<DonatedItem>();
  const [isLoading, setLoading] = useState(true);

  const getProductDetails = async () => {
    const res = await OrganisationServices.getSingleDonatedItem(params.id);
    if (!res.status) {
      toast.error("Error In Getting Item.");
    }
    setProduct(res.data.data);
    setLoading(false);
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  if (!product || isLoading) {
    return (
      <Flex className="h-full" justify={"center"} align={"center"}>
        <Loader isLoading={isLoading} />
      </Flex>
    );
  }

  return (
    <Flex p={{ initial: "4", md: "9" }} className="h-full">
      <Grid
        className="border w-full rounded-xl overflow-hidden shadow-md"
        columns={{ sm: "1", md: "2" }}
        rows={{ initial: "2", md: "1" }}
      >
        <Flex className="h-full w-full">
          <img src={product?.image} className="h-full w-full object-cover" />
        </Flex>
        <Flex
          direction={"column"}
          p={{ initial: "6", md: "9" }}
          gap={"4"}
          justify={{ sm: "start", md: "center" }}
          className="overflow-hidden overflow-y-auto"
        >
          <Heading align={"center"}>{product?.title}</Heading>
          <Text className="text-xs text-slate-500" align={"center"}>
            {product?.category.name}
          </Text>

          <Flex justify={"center"} my={"5"}>
            <ConditionBadge condition={product?.condition} />
          </Flex>
          {product?.description && (
            <Text align={"center"} mx={{ lg: "9" }}>
              &quot;{product?.description}&quot;
            </Text>
          )}
          <Flex justify={"center"} mt={"9"}>
            <Button className="w-2/3">Add To Cart</Button>
          </Flex>
        </Flex>
      </Grid>
    </Flex>
  );
};

export default ProductDetailPage;
