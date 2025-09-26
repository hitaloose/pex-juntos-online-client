import { Avatar, Card, Code, Flex, Link, Text } from "@radix-ui/themes";
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
      <Flex direction={"column"} gap={"4"}>
        <Flex gap={"4"} align={"center"}>
          <Avatar
            size={"3"}
            src={ad.provider.imageUrl}
            fallback={ad.provider.name.at(0) || ""}
          />
          <Flex direction={"column"} gap={"1"}>
            <Text weight={"bold"}>{ad.provider.name}</Text>
            <Flex gap={"2"}>
              <Text size="1">{ad.provider.neighborhood}</Text>
              <Code size="1">{MAPPED_CATEGORIES[ad.category]}</Code>
            </Flex>
          </Flex>
        </Flex>

        <Flex direction={"column"}>
          <Text weight={"bold"}>{ad.title}</Text>
          <Text size={"2"}>{ad.description}</Text>
        </Flex>

        {ad.imageUrl && (
          <Flex justify={"center"}>
            <img
              src={ad.imageUrl}
              alt={`Imagem do anúncio ${ad.title}`}
              loading="lazy"
              className="w-28 h-28 rounded-md object-cover"
              style={{
                objectFit: "contain",
                width: "100%",
                height: "240px",
                borderRadius: "var(--radius-2)",
              }}
            />
          </Flex>
        )}

        <Flex>
          <Link size={"4"} href={`https://wa.me/${whatsAppNumber}`}>
            Chamar no whatsapp
          </Link>
        </Flex>
      </Flex>
    </Card>
  );
};
