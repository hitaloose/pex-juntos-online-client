import { Card, Flex, Heading, Text } from "@radix-ui/themes";

export const LoadingCard = () => {
  return (
    <Card>
      <Flex direction={"column"} align={"center"} gap="2">
        <Heading>Carregando...</Heading>
        <Text>Buscando as melhores opções da cidade</Text>
      </Flex>
    </Card>
  );
};
