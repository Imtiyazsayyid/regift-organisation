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
      <main className="bg-slate-1000 h-full w-full pt-20">{children}</main>
    </Flex>
  );
}
