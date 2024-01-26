"use client";

import SearchBar from "@/app/components/SearchBar";
import { Flex, Grid } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { DonatedItem } from "@/app/interfaces/DonatedItemInterface";
import * as OrganisationServices from "../../Services/OrganisationServices";
import toast from "react-hot-toast";

const BrowsePage = () => {
  const [searchText, setSearchText] = useState("");
  const [donatedItems, setDonatedItems] = useState<DonatedItem[]>();

  const getAllDonatedItems = async () => {
    const res = await OrganisationServices.getAllDonatedItems({ searchText });
    if (!res.status) {
      toast.error("Could Not Fetch Items.");
    }

    setDonatedItems(res.data.data);
  };

  useEffect(() => {
    getAllDonatedItems();
  }, [searchText]);

  return (
    <Flex className="p-4 pt-10 md:p-16 h-full" direction={"column"} gap={"2"}>
      <Flex className="w-full md:w-1/3 h-fit">
        <SearchBar
          searchText={searchText}
          setSearchText={setSearchText}
          placeholder="Find The Donation You Need"
        />
      </Flex>
      <Grid
        columns={{ sm: "1", md: "3", xl: "5" }}
        className="border rounded-xl bg-gray-200 shadow-xl h-full overflow-hidden overflow-y-auto"
        p={"4"}
        gap={"2"}
      >
        {donatedItems?.map((item) => (
          <ProductCard
            id={item.id}
            condition={item.condition}
            category={item.category.name}
            title={item.title}
            description={item.description || "No Description Available."}
            img={item.image}
            key={item.id}
          />
        ))}
      </Grid>
    </Flex>
  );
};

export default BrowsePage;
