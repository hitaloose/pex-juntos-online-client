import { Card, Code, Flex, Heading, Link, Text } from "@radix-ui/themes";
import type { Ad } from "../../../../types/ad";
import { useMemo } from "react";
import { MAPPED_CATEGORIES } from "../../../../utils/categories";

type Props = {
  ad: Ad;
};

export const AdCard = (props: Props) => {
  const { ad } = props;

  const whatsAppNumber = useMemo(() => {
    const defaultCountryCode = "55";
    const input = ad.provider.phoneWhatsapp;

    if (!input) return "";

    const digits = input.replace(/\D/g, "");

    if (digits.startsWith(defaultCountryCode) && digits.length >= 12) {
      return `+${digits}`;
    }

    if (digits.length >= 10 && digits.length <= 11) {
      return `+${defaultCountryCode}${digits}`;
    }

    return "";
  }, [ad.provider.phoneWhatsapp]);

  return (
    <Card>
      <Flex justify={"between"} align={"center"}>
        <Flex direction={"column"} gap="4">
          <Flex direction={"column"}>
            <Heading>{ad.title}</Heading>
            <Text>{ad.provider.name}</Text>
            <Flex gap="2" align={"center"}>
              <Code size="1">{MAPPED_CATEGORIES[ad.category]}</Code>
              <Text size="1">{ad.provider.neighborhood}</Text>
            </Flex>
          </Flex>
          <Text size={"2"}>{ad.description}</Text>
        </Flex>
        <Link size={"5"} href={`https://wa.me/${whatsAppNumber}`}>
          Chamar no whatsapp
        </Link>
      </Flex>
    </Card>
  );
};
