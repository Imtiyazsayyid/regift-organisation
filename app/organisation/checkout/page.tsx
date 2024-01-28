"use client";

import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from "@radix-ui/react-icons";
import { Avatar, Button, Container, Flex, Heading, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import * as OrganisationServices from "../../Services/OrganisationServices";
import { CartItem } from "@/app/interfaces/CartItemInterface";
import toast from "react-hot-toast";
import DeleteConfirmation from "@/app/components/DeleteConfirmation";
import Separator from "../../components/Seperator";
import Loader from "@/app/components/Loader";
import { useRouter } from "next/navigation";
import { Organisation } from "@/app/interfaces/OrganisationInterface";
import OrderConfirmation from "@/app/components/OrderConfirmation";

const CheckoutPage = () => {
  const [cart, setCart] = useState<CartItem[]>();
  const [organisation, setOrganisation] = useState<Organisation>();
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);

  const getAllCartItems = async () => {
    setLoading(true);
    const res = await OrganisationServices.getAllCartItems();
    if (!res.status) {
      toast.error("Could Not Get Cart Items");
      return;
    }
    setCart(res.data.data);
    setLoading(false);
  };

  const getOrganisationDetails = async () => {
    setLoading(true);
    const res = await OrganisationServices.getOrganisationDetails();
    if (!res.status) {
      toast.error("Could Not Get Organisation Details");
      return;
    }
    setOrganisation(res.data.data);
    setLoading(false);
  };

  const deleteCartItem = async (id: number) => {
    setLoading(true);
    const res = await OrganisationServices.deleteCartItem(id);
    if (!res.status) {
      toast.error("Item Could Not Be Removed.");
      return;
    }
    getAllCartItems();
    toast.success("Item Removed From Cart.");
  };

  const placeOrder = async () => {
    const res = await OrganisationServices.saveOrder();
    if (!res.status) {
      toast.error("Order Not Placed");
      return;
    }
    toast.success("Order Placed.");
    router.push("/organisation/orders");
  };

  useEffect(() => {
    getAllCartItems();
    getOrganisationDetails();
  }, []);

  useEffect(() => {
    if (cart && cart.length === 0) {
      router.push("/organisation/cart");
    }
  }, [cart]);

  return (
    <Flex direction={"column"} p={{ initial: "6", md: "9" }} className="h-full" align={"center"}>
      <Flex direction={"column"} gap={"2"} className="h-full w-full md:w-2/3">
        <Heading size={{ initial: "6", md: "9" }}>Checkout</Heading>
        <Text className="text-md text-slate-500 md:w-2/3">
          Easy and hassle-free checkout: Complete your order in seconds, no payment required! Simply review your
          selections, confirm your details, and enjoy your free order.
        </Text>
        <Separator className="my-10" />
        <Flex className="mb-10" gap={"4"}>
          <Flex direction={"column"} className="w-1/2 md:w-1/3">
            <Text>Delivery Address</Text>
            <Flex className="text-sm text-slate-500" direction={"column"}>
              {organisation?.address.split("\n").map((line, index) => (
                <Text key={index} className="text-sm text-slate-500">
                  {line}
                </Text>
              ))}
            </Flex>
          </Flex>
          <Flex className="w-1/2 md:w-2/3" align={"end"} direction={"column"} justify={"center"}>
            <Flex direction={"column"} align={"center"} gap={"2"}>
              <Button className="w-full" variant="ghost" color="violet">
                Change Address <ArrowRightIcon />
              </Button>
            </Flex>
          </Flex>
        </Flex>
        {!isLoading && (
          <>
            {cart && cart.length > 0 && (
              <Text className="text-sm text-slate-400">
                Total Items: <Text className="text-lg font-bold text-black dark:text-slate-300">{cart.length}</Text>{" "}
              </Text>
            )}
            {cart && cart.length > 0 && (
              <Flex
                className="h-2/3 bg-slate-50 dark:bg-[var(--gray-a2)] overflow-hidden overflow-y-auto"
                px={"4"}
                py={"4"}
                direction={"column"}
                gap={"2"}
              >
                {cart.map((cartItem) => (
                  <Flex gap={"2"} key={cartItem.id}>
                    <Flex
                      className="h-20 w-full rounded-xl border border-[var(--gray-a4)] p-3 shadow-md bg-white dark:bg-[var(--gray-a2)] cursor-pointer"
                      align={"center"}
                      gap={"3"}
                      onClick={(e) => {
                        router.push("/organisation/browse/" + cartItem.donatedItemId);
                      }}
                    >
                      <Avatar fallback={"?"} size={"4"} src={cartItem.donatedItem.image} />
                      <Flex className="w-full md:w-1/2 h-full" direction={"column"} justify={"center"}>
                        <Heading size={{ initial: "2", md: "4" }}>{cartItem.donatedItem.title}</Heading>
                      </Flex>
                      <div className="w-1/2 hidden md:flex">
                        <Text className="text-xs text-slate-400">{cartItem.donatedItem.category.name}</Text>
                      </div>
                    </Flex>
                    <Flex
                      className="rounded-xl border border-[var(--gray-a4)] bg-white dark:bg-[var(--gray-a2)] px-4 shadow-md"
                      justify={"center"}
                      align={"center"}
                    >
                      <DeleteConfirmation
                        confirmDelete={() => {
                          deleteCartItem(cartItem.id);
                        }}
                        removedItem={`"${cartItem.donatedItem.title}"` + " from cart"}
                      />
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            )}
            {cart && cart.length > 0 && (
              <Flex justify={"end"} gap={"2"}>
                <Button
                  color="blue"
                  variant="soft"
                  onClick={() => {
                    router.push("/organisation/cart");
                  }}
                >
                  <ArrowLeftIcon /> Back To Cart
                </Button>
                <OrderConfirmation confirmOrder={placeOrder} />
              </Flex>
            )}
            {cart && cart.length == 0 && (
              <Flex className="h-full" direction={"column"} gap={"2"} justify={"start"} py={{ initial: "9", md: "0" }}>
                <Heading align={"center"} size={{ initial: "3", md: "6" }}>
                  Add An Item To Cart.
                </Heading>
                <Text className="text-xs text-slate-500" align={"center"}>
                  Items Added To Cart Will Appear Here
                </Text>
              </Flex>
            )}
          </>
        )}

        {isLoading && (
          <Flex className="h-1/2" direction={"column"} gap={"2"} justify={"center"}>
            <Loader isLoading={isLoading} />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default CheckoutPage;
