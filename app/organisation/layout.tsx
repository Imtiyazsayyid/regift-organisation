import { Flex } from "@radix-ui/themes";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex align={"center"} justify={"center"} className="h-full">
      {children}
    </Flex>
  );
}
