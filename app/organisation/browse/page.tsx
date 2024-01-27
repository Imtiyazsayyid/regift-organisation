"use client";

import SearchBar from "@/app/components/SearchBar";
import { Flex, Grid, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { DonatedItem } from "@/app/interfaces/DonatedItemInterface";
import * as OrganisationServices from "../../Services/OrganisationServices";
import toast from "react-hot-toast";
import Seperator from "@/app/components/Seperator";
import CategoryFilter from "@/app/components/CategoryFilter";
import { getEmptyOrValue } from "../../helpers/selectHelpers";
import ConditionFilter from "@/app/components/ConditionFilter";
import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons";
import Loader from "@/app/components/Loader";

const BrowsePage = () => {
  const [donatedItems, setDonatedItems] = useState<DonatedItem[]>();

  const [showFilters, setShowFilters] = useState(true);

  // filters
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("all");
  const [condition, setCondition] = useState("all");

  // loader
  const [isLoading, setLoading] = useState(true);

  const getAllDonatedItems = async () => {
    const res = await OrganisationServices.getAllDonatedItems({
      searchText,
      categoryId: getEmptyOrValue(category),
      condition: getEmptyOrValue(condition),
    });

    if (!res.status) {
      toast.error("Could Not Fetch Items.");
    }

    setDonatedItems(res.data.data);
    setLoading(false);
  };

  useEffect(() => {
    getAllDonatedItems();
  }, [searchText, category, condition]);

  return (
    <Flex className="p-4 pt-10 md:p-16 h-full" direction={"column"} gap={"2"}>
      <Grid gap={"2"} align={"end"} columns={{ sm: "1", md: "3" }}>
        <Flex className="w-full h-fit" direction={"column"} gap={"4"}>
          <SearchBar searchText={searchText} setSearchText={setSearchText} placeholder="Find The Donation You Need" />
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
              <ConditionFilter condition={condition} setCondition={setCondition} />
            </Flex>
            <Flex className="w-full h-fit mt-1 md:mt-0">
              <CategoryFilter category={category} setCategory={setCategory} />
            </Flex>
          </>
        )}
      </Grid>
      <Flex my={"1"}>
        <Seperator />
      </Flex>

      <Grid
        columns={{ sm: "1", md: "3", xl: "5" }}
        className="h-full overflow-hidden overflow-y-auto"
        gap={"2"}
        p={{ initial: "5" }}
      >
        {isLoading && (
          <Flex className="col-span-full">
            <Loader isLoading={isLoading} />
          </Flex>
        )}
        {!isLoading && donatedItems && donatedItems?.length == 0 && (
          <Flex className="col-span-full" justify={"center"} p={"9"}>
            <Text>Sorry, No Items Found.</Text>
          </Flex>
        )}
        {!isLoading &&
          donatedItems?.map((item) => (
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
