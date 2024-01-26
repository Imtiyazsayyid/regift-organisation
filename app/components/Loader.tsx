import { Flex } from "@radix-ui/themes";
import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

const Loader = ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) return null;
  return (
    <Flex className="h-full w-full" justify={"center"} align={"center"}>
      <ScaleLoader
        color={"var(--blue-a11)"}
        loading={isLoading}
        aria-label="Loading Spinner"
        data-testid="loader"
        height={20}
      />
    </Flex>
  );
};

export default Loader;
