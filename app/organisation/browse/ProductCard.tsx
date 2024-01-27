"use client";

import { Flex, Heading, Text, Button } from "@radix-ui/themes";
import ConditionBadge from "../../components/ConditionBadge";
import React from "react";
import { ArrowRightIcon, EyeOpenIcon, PlusIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

interface Props {
  id: number;
  title: string;
  description: string;
  img: string;
  condition: "new" | "like_new" | "used_good" | "used_fair" | "used_poor";
  category: string;
}

const ProductCard = ({ id, title, description, img, category, condition }: Props) => {
  const router = useRouter();

  return (
    <Flex
      className="h-[450px] w-full overflow-hidden shadow-md border dark:border-none bg-white dark:bg-[var(--gray-a2)] rounded-md cursor-pointer"
      direction={"column"}
      onClick={() => router.push("/organisation/browse/" + id)}
    >
      <Flex className="h-2/3 w-full">
        <img src={img} className="w-full h-full object-cover" />
      </Flex>
      <Flex p={"5"} direction={"column"} className="h-1/3">
        <Text className="text-xs text-slate-400" align={"center"}>
          {category}
        </Text>

        <Heading size={"5"} align={"center"} my={"4"}>
          {title}
        </Heading>

        <Flex justify={"center"}>
          <ConditionBadge condition={condition} />
        </Flex>

        {/* <Flex justify={"center"} gap={"1"}>
          <Button color="blue" className="w-1/2">
            <PlusIcon /> Add to Cart
          </Button>
        </Flex> */}
      </Flex>
    </Flex>
  );
};

export default ProductCard;
