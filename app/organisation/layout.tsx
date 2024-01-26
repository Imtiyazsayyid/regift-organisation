import { Flex } from "@radix-ui/themes";
import HorizontalNavbar from "./HorizontalNavbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex className="h-full w-full" direction={"column"}>
      <HorizontalNavbar />
      <main className="h-full w-full pt-20 bg-white">{children}</main>
    </Flex>
  );
}
