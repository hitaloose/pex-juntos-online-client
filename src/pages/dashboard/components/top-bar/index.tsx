import { Card, Flex, Heading } from "@radix-ui/themes";
import { ExitAlert } from "../exit-alert";
import { AccountDialog } from "../account-dialog";

export const TopBar = () => {
  return (
    <Card>
      <Flex gap="4" direction={"column"}>
        <Flex justify={"between"} align={"center"}>
          <Heading>Bem vindo</Heading>
          <Flex gap={"2"} justify={"center"} align={"center"}>
            <AccountDialog />
            <ExitAlert />
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};
