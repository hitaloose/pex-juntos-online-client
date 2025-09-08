import { Card, Flex, Heading } from "@radix-ui/themes";
import { ExitAlert } from "../exit-alert";

export const TopBar = () => {
  return (
    <Card>
      <Flex gap="4" direction={"column"}>
        <Flex justify={"between"} align={"center"}>
          <Heading>Bem vindo</Heading>
          <ExitAlert />
        </Flex>
      </Flex>
    </Card>
  );
};
