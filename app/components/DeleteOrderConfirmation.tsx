import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Badge, Button, Flex } from "@radix-ui/themes";
import React from "react";

interface Props {
  confirmDelete: () => void;
  removedItem: string;
}

const DeleteConfirmation = ({ confirmDelete, removedItem }: Props) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Badge
          color="red"
          className="w-fit h-fit cursor-pointer"
          radius="full"
          variant="surface"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Cancel Order
        </Badge>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>Confirm Order Cancellation.</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure you want to cancel order for {removedItem}? <br />
        </AlertDialog.Description>

        <Flex gap="3" mt="8" justify="end">
          <AlertDialog.Cancel>
            <Flex
              className="py-2 px-3 rounded-md text-md bg-[var(--gray-a6)] cursor-pointer"
              justify={"center"}
              align={"center"}
            >
              No
            </Flex>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Flex
              onClick={confirmDelete}
              className="py-2 px-3 rounded-md text-md bg-[var(--red-a11)] text-white dark:bg-[var(--red-a6)] cursor-pointer"
              justify={"center"}
              align={"center"}
            >
              Yes
            </Flex>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteConfirmation;
