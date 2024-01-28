import { ArrowRightIcon, TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import React from "react";

interface Props {
  confirmOrder: () => void;
}

const DeleteConfirmation = ({ confirmOrder }: Props) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button
          color="grass"
          variant="soft"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Place Order <ArrowRightIcon />
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>Confirm Order</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure you want to place order? <br />
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
              onClick={confirmOrder}
              className="py-2 px-3 rounded-md text-md bg-[var(--grass-a11)] dark:bg-[var(--grass-a4)] text-white cursor-pointer"
              justify={"center"}
              align={"center"}
            >
              Confirm
            </Flex>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteConfirmation;
