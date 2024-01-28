"use client";

import { Flex, Heading, Text, Button, Badge } from "@radix-ui/themes";
import ConditionBadge from "../../components/ConditionBadge";
import React from "react";
import { ArrowRightIcon, EyeOpenIcon, PlusIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { Order } from "@/app/interfaces/OrderInterface";
import DeliveryStatusBadge from "@/app/components/DeliveryStatusBadge";
import Seperator from "@/app/components/Seperator";
import moment from "moment";
import DeleteOrderConfirmation from "@/app/components/DeleteOrderConfirmation";

interface Props {
  order: Order;
  cancelOrder: (id: number) => void;
}

const ProductCard = ({ order, cancelOrder }: Props) => {
  const router = useRouter();

  return (
    <Flex
      className="h-[450px] w-full overflow-hidden shadow-md border dark:border-none bg-white dark:bg-[var(--gray-a2)] rounded-md"
      direction={"column"}
    >
      <Flex className="h-1/3 w-full">
        <img src={order.donatedItem.image} className="w-full h-full object-cover" />
      </Flex>
      <Flex p={"6"} direction={"column"} className="h-2/3">
        <Heading size={"5"} mb={"6"} align={"center"}>
          {order.donatedItem.title}
        </Heading>

        <Flex gap={"2"} justify={"between"} align={"center"}>
          <Text>Order Date</Text>
          <Text className="text-sm dark:text-slate-300">{moment(order.created_at).format("DD MMM, YYYY")}</Text>
        </Flex>

        <Seperator className="my-2" />
        <Flex gap={"2"} justify={"between"} align={"center"}>
          <Text>Status</Text>
          <DeliveryStatusBadge status={order.orderStatus} />
        </Flex>

        <Seperator className="my-2" />
        <Flex gap={"1"} direction={"column"}>
          <Text>Address</Text>
          <Text className="text-xs dark:text-slate-300 text-slate-600">{order.organisation.address}</Text>
        </Flex>

        <Flex justify={"center"} gap={"1"} className="h-full" align={"end"}>
          {order.orderStatus == "pending" && (
            <DeleteOrderConfirmation
              confirmDelete={() => cancelOrder(order.id)}
              removedItem={order.donatedItem.title}
            />
          )}
          <Badge
            color="blue"
            variant="surface"
            radius="full"
            onClick={() => router.push("/organisation/browse/" + order.donatedItemId)}
          >
            View
          </Badge>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProductCard;
