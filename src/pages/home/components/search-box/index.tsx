import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button, Card, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import { NavLink, useSearchParams } from "react-router";
import { PAGES } from "../../../../utils/pages";
import { CategorySelect } from "../../../../components/category-select";
import { NeighborhoodSelect } from "../../../../components/neighborhood-select";
import { useCallback, useState } from "react";
import { searchAdsSchema } from "../../../../schemas/ad-schema";
import { errorHandler } from "../../../../utils/error";

export const SearchBox = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [q, setQ] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [neighborhood, setNeighborhood] = useState(
    searchParams.get("neighborhood") || "Todos"
  );

  const handleSubmitClick = useCallback(() => {
    try {
      const input = searchAdsSchema.parse({ q, category, neighborhood });
      setSearchParams((prev) => {
        prev.set("q", input.q);
        prev.set("category", input.category);
        prev.set("neighborhood", input.neighborhood);
        return prev;
      });
    } catch (error) {
      errorHandler(error);
    }
  }, [category, neighborhood, q, setSearchParams]);

  return (
    <Card>
      <Flex gap="4" direction={"column"}>
        <Flex justify={"between"} align={"center"}>
          <Heading>Pesquise anúncios</Heading>
          <NavLink to={PAGES.LOGIN}>Entrar</NavLink>
        </Flex>

        <TextField.Root
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Pesquise anúncios..."
        >
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>

        <Flex gap="6" align="center">
          <Flex gap="1" width="200px" direction={"column"}>
            <Text size="1">Categoria</Text>
            <CategorySelect
              value={category}
              onValueChange={(value) => setCategory(value)}
              showAllOption
            />
          </Flex>

          <Flex gap="1" width="200px" direction={"column"}>
            <Text size="1">Bairro</Text>
            <NeighborhoodSelect
              value={neighborhood}
              onValueChange={(value) => setNeighborhood(value)}
              showAllOption
            />
          </Flex>
        </Flex>

        <Flex justify={"end"}>
          <Button onClick={handleSubmitClick}>Pesquisar</Button>
        </Flex>
      </Flex>
    </Card>
  );
};
