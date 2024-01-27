import { Flex } from "@radix-ui/themes";
import React from "react";
import PuffLoader from "react-spinners/PuffLoader";

const Loader = ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) return null;
  return (
    <Flex className="h-full w-full" justify={"center"} align={"center"}>
      <PuffLoader color={"var(--crimson-a11)"} loading={isLoading} aria-label="Loading Spinner" data-testid="loader" />
    </Flex>
  );
};

export default Loader;
