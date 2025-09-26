import { Card, Flex, Text } from "@radix-ui/themes";
import type { Ad } from "../../../../types/ad";
import { EditAdDialog } from "../edit-ad-dialog";
import { RemoveAdAlert } from "../remove-ad-alert";
import { MAPPED_CATEGORIES } from "../../../../utils/categories";
import { MAPPEP_AD_STATUS } from "../../../../utils/ad-status";
import { ToggleStatusAlert } from "../toggle-status-alert";

type Props = {
  ad: Ad;
  onRemove?: () => void;
  onEdit?: () => void;
};

const PLACE_HOLDER_IMG = "https://placehold.co/600x400?text=Sem+imagem";

export const AdCard = (props: Props) => {
  const { ad, onRemove, onEdit } = props;

  return (
    <Card>
      <Flex justify={"between"}>
        <Flex width={"100%"} direction={"row"} gap={"2"}>
          <img
            src={ad.imageUrl || PLACE_HOLDER_IMG}
            style={{
              objectFit: "cover",
              width: 120,
              height: "100%",
              borderRadius: "var(--radius-2)",
            }}
          />
          <Flex width={"100%"} flexGrow={"1"} direction={"column"}>
            <Text>Status: {MAPPEP_AD_STATUS[ad.status]}</Text>
            <Text>Código: {ad.id}</Text>
            <Text>Título: {ad.title}</Text>
            <Text>Descrição: {ad.description}</Text>
            <Text>Categoria: {MAPPED_CATEGORIES[ad.category]}</Text>
          </Flex>
        </Flex>
        <Flex direction={"column"} gap={"2"}>
          <EditAdDialog ad={ad} onSubmit={onEdit} />
          <RemoveAdAlert ad={ad} onRemove={onRemove} />
          <ToggleStatusAlert ad={ad} onUpdate={onRemove} />
        </Flex>
      </Flex>
    </Card>
  );
};
