import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import React from "react";

interface Props {
  confirmDelete: () => void;
  removedItem: string;
}

const DeleteConfirmation = ({ confirmDelete, removedItem }: Props) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button
          color="crimson"
          variant="soft"
          radius="full"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <TrashIcon />
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>Confirm Delete.</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure you want to remove {removedItem}? <br />
          This action cannot be reversed.
        </AlertDialog.Description>

        <Flex gap="3" mt="8" justify="end">
          <AlertDialog.Cancel>
            <Flex
              className="py-2 px-3 rounded-md text-md bg-[var(--gray-a6)] cursor-pointer"
              justify={"center"}
              align={"center"}
            >
              Cancel
            </Flex>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Flex
              onClick={confirmDelete}
              className="py-2 px-3 rounded-md text-md bg-[var(--red-a6)] cursor-pointer"
              justify={"center"}
              align={"center"}
            >
              Delete
            </Flex>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteConfirmation;
