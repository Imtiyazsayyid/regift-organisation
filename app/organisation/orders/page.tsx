"use client";

import SearchBar from "@/app/components/SearchBar";
import { Flex, Grid, Switch, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import * as OrganisationServices from "../../Services/OrganisationServices";
import toast from "react-hot-toast";
import Seperator from "@/app/components/Seperator";
import CategoryFilter from "@/app/components/CategoryFilter";
import { getEmptyOrValue } from "../../helpers/selectHelpers";
import ConditionFilter from "@/app/components/ConditionFilter";
import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons";
import Loader from "@/app/components/Loader";
import { Order } from "@/app/interfaces/OrderInterface";
import OrderStatusFilter from "@/app/components/OrderStatusFilter";

const OrderPage = () => {
  const [orders, setOrders] = useState<Order[]>();

  const [showFilters, setShowFilters] = useState(true);

  // filters
  const [searchText, setSearchText] = useState("");
  const [orderStatus, setOrderStatus] = useState("all");
  const [showCancelled, setShowCancelled] = useState(false);

  // loader
  const [isLoading, setLoading] = useState(true);

  const getAllOrders = async () => {
    setLoading(true);
    const res = await OrganisationServices.getAllOrders({
      searchText,
      orderStatus: getEmptyOrValue(orderStatus),
      showCancelled,
    });

    if (!res.status) {
      toast.error("Could Not Fetch Items.");
    }

    setOrders(res.data.data);
    setLoading(false);
  };

  const cancelOrder = async (id: number) => {
    const res = await OrganisationServices.deleteOrder(id);
    if (!res.status) {
      toast.error("Order Could Not Be Cancelled");
      return;
    }

    toast.success("Order Cancelled.");
    getAllOrders();
  };

  useEffect(() => {
    getAllOrders();
  }, [searchText, orderStatus, showCancelled]);

  return (
    <Flex className="p-4 pt-10 md:p-16 h-full" direction={"column"} gap={"2"}>
      <Grid gap={"2"} align={"end"} columns={{ sm: "1", md: "3" }}>
        <Flex className="w-full h-fit" direction={"column"} gap={"4"}>
          <SearchBar searchText={searchText} setSearchText={setSearchText} placeholder="Find Your Order" />
          <div
            className="md:hidden flex gap-1 items-center w-fit font-bold"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Text>{showFilters ? "Hide" : "Show"} Filters</Text>
            {showFilters ? <CaretUpIcon height={"20"} width={"20"} /> : <CaretDownIcon height={"20"} width={"20"} />}
          </div>
        </Flex>
        {showFilters && (
          <>
            <Flex className="w-full h-fit mt-1 md:mt-0">
              <OrderStatusFilter setOrderStatus={setOrderStatus} orderStatus={orderStatus} />
            </Flex>
            <Flex className="w-full h-fit mt-3 md:mt-0" justify={{ initial: "start", md: "end" }} gap={"2"}>
              <Switch checked={showCancelled} onCheckedChange={(val) => setShowCancelled(val)} /> Show Cancelled
            </Flex>
          </>
        )}
      </Grid>
      <Flex my={"1"}>
        <Seperator />
      </Flex>

      <Grid
        columns={{ sm: "1", md: "3", xl: "5" }}
        className="h-full overflow-hidden overflow-y-auto bg-slate-50 dark:bg-[var(--gray-a2)]"
        gap={"2"}
        p={{ initial: "5" }}
      >
        {isLoading && (
          <Flex className="col-span-full">
            <Loader isLoading={isLoading} />
          </Flex>
        )}
        {!isLoading && orders && orders?.length == 0 && (
          <Flex className="col-span-full" justify={"center"} p={"9"}>
            <Text>Sorry, No Items Found.</Text>
          </Flex>
        )}
        {!isLoading && orders?.map((order) => <OrderCard order={order} cancelOrder={cancelOrder} />)}
      </Grid>
    </Flex>
  );
};

export default OrderPage;
