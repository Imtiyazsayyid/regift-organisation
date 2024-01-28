"use client";

import { DonatedItem } from "@/app/interfaces/DonatedItemInterface";
import { Button, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

import * as OrganisationServices from "../../../Services/OrganisationServices";
import toast from "react-hot-toast";

import ConditionBadge from "../../../components/ConditionBadge";
import Loader from "@/app/components/Loader";
import { ArrowLeftIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { CartItem } from "@/app/interfaces/CartItemInterface";
import ButtonLoader from "../../../components/ButtonLoader";
import { FaRegEye } from "react-icons/fa";

interface Props {
  params: {
    id: string;
  };
}

const ProductDetailPage = ({ params }: Props) => {
  const [product, setProduct] = useState<DonatedItem>();
  const [isLoading, setLoading] = useState(true);
  // const [isInCart, setIsInCart] = useState(false);
  const [currentCartItem, setCartItem] = useState<CartItem>();
  const [buttonLoading, setButtonLoading] = useState(false);

  const router = useRouter();

  const checkProductInCart = async () => {
    const res = await OrganisationServices.getAllCartItems();
    if (!res.status) return;

    const cart: CartItem[] = res.data.data;

    let currentProduct = cart.find((item) => item.donatedItemId === parseInt(params.id));

    setCartItem(currentProduct);
  };

  const getProductDetails = async () => {
    setLoading(true);
    const res = await OrganisationServices.getSingleDonatedItem(params.id);
    if (!res.status) {
      toast.error("Error In Getting Item.");
    }
    setProduct(res.data.data);
    setLoading(false);
  };

  const removeFromCart = async () => {
    setButtonLoading(true);
    if (currentCartItem) {
      const loadingToastId = toast.loading("Removing item from cart...");

      const res = await OrganisationServices.deleteCartItem(currentCartItem?.id);

      toast.dismiss(loadingToastId);

      if (!res.status) {
        toast.error("Item could not be removed from cart.");
        return;
      }
      setCartItem(undefined);
      toast.success("Item Removed From Cart.");
    }
    setButtonLoading(false);
  };

  const addProductToCart = async () => {
    setButtonLoading(true);
    const loadingToastId = toast.loading("Adding item to cart...");
    const res = await OrganisationServices.saveCartItem({ donatedItemId: product?.id });
    toast.dismiss(loadingToastId);
    if (!res.status) {
      toast.error("Item was not added to Cart.");
    }
    checkProductInCart();
    toast.success("Added to Cart.");
    toast.custom(
      <Flex
        gap="2"
        className="bg-white text-black shadow-md px-3 py-3 rounded-md cursor-pointer"
        align={"center"}
        onClick={() => router.push("/organisation/cart")}
      >
        <FaRegEye className="h-6 w-6" color="pink" /> Click To View Cart
      </Flex>
    );
    setButtonLoading(false);
  };

  useEffect(() => {
    getProductDetails();
    checkProductInCart();
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
      <div
        className="hidden lg:block fixed top-28 left-19 p-2 rounded-full bg-[var(--crimson-a3)] text-[var(--crimson-a11)] z-50 cursor-pointer"
        onClick={() => router.back()}
      >
        <ArrowLeftIcon />
      </div>
      <Grid
        className="border dark:border-stone-800 w-full rounded-xl overflow-hidden shadow-md relative"
        columns={{ initial: "1", lg: "2" }}
        rows={{ initial: "2", lg: "1" }}
      >
        <Flex className="h-full w-full relative">
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
            <Button
              className="w-2/3"
              disabled={buttonLoading}
              onClick={() => {
                currentCartItem ? removeFromCart() : addProductToCart();
              }}
            >
              {currentCartItem ? "Remove From Cart" : "Add To Cart"}
            </Button>
          </Flex>
        </Flex>
      </Grid>
    </Flex>
  );
};

export default ProductDetailPage;
