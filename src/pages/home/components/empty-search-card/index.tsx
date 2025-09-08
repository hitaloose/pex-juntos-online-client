import { Card, Flex, Heading, Text } from "@radix-ui/themes";

export const EmptySearchCard = () => {
  return (
    <Card>
      <Flex direction={"column"} align={"center"} gap="2">
        <Heading>Nenhum anúncio encontrado</Heading>
        <Text>Tente ajustar sua pesquisa</Text>
      </Flex>
    </Card>
  );
};
