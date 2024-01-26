import { Flex, Heading, Text, Button } from "@radix-ui/themes";
import ConditionBadge from "../../components/ConditionBadge";
import React from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";

interface Props {
  id: number;
  title: string;
  description: string;
  img: string;
  condition: "new" | "like_new" | "used_good" | "used_fair" | "used_poor";
  category: string;
}

const ProductCard = ({
  id,
  title,
  description,
  img,
  category,
  condition,
}: Props) => {
  return (
    <Flex
      className="h-[450px] w-full rounded-xl overflow-hidden shadow-md border bg-white"
      direction={"column"}
    >
      <Flex className="h-3/5 w-full">
        <img src={img} className="w-full h-full object-cover" />
      </Flex>
      <Flex p={"5"} direction={"column"} className="h-2/5">
        <Heading size={"5"} align={"center"}>
          {title}
        </Heading>

        <Text className="text-xs text-slate-400 px-5" align={"center"}>
          {category}
        </Text>

        <Flex justify={"center"} my={"4"}>
          <ConditionBadge condition={condition} />
        </Flex>

        <Flex justify={"center"} gap={"1"}>
          <Button color="blue" variant="soft" className="w-1/2">
            Add to Cart
          </Button>
          <Button variant="soft" color="violet">
            <ArrowRightIcon />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProductCard;
