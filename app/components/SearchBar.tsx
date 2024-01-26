import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Flex, TextField, Text } from "@radix-ui/themes";
import React from "react";

interface Props {
  placeholder: string;
  searchText: string;
  setSearchText: (text: string) => void;
}

const SearchBar = ({ placeholder, setSearchText, searchText }: Props) => {
  return (
    <Flex direction={"column"} className="w-full" gap={"1"}>
      <TextField.Root className="h-fit" size={"3"}>
        <TextField.Slot>
          <MagnifyingGlassIcon height="20" width="20" />
        </TextField.Slot>
        <TextField.Input
          placeholder={placeholder}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          value={searchText}
        />
      </TextField.Root>
    </Flex>
  );
};

export default SearchBar;
