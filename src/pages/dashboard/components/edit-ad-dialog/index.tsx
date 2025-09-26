import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import type { Ad } from "../../../../types/ad";
import { useCallback, useEffect, useMemo, useState } from "react";
import { adSchema } from "../../../../schemas/ad-schema";
import { api } from "../../../../services/api";
import { errorHandler } from "../../../../utils/error";
import { CategorySelect } from "../../../../components/category-select";

type Props = {
  ad: Ad;
  onSubmit?: () => void;
};

const PLACE_HOLDER_IMG = "https://placehold.co/600x400?text=Clique+aqui";

export const EditAdDialog = (props: Props) => {
  const INITIAL_AD_STATE = props.ad;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [ad, setAd] = useState(INITIAL_AD_STATE);

  const previewUrl = useMemo(() => {
    if (ad && ad.image instanceof File) {
      const url = URL.createObjectURL(ad.image);
      return url;
    }
    return undefined;
  }, [ad]);

  const resetForm = useCallback(() => {
    setAd(INITIAL_AD_STATE);
  }, [INITIAL_AD_STATE]);

  const handleSubmit = useCallback(async () => {
    setLoading(true);

    try {
      const input = adSchema.parse(ad);

      const formData = new FormData();
      if (input.image) {
        formData.append("image", input.image);
      }

      formData.append("title", input.title);
      formData.append("description", input.description);
      formData.append("category", input.category);

      await api.put(`/ad/${INITIAL_AD_STATE.id}`, formData);
      setOpen(false);
      props.onSubmit?.();
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  }, [INITIAL_AD_STATE.id, ad, props]);

  useEffect(() => {
    if (open === false) {
      resetForm();
    }
  }, [open, resetForm]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button>Editar</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Editar anúncio</Dialog.Title>

        <Flex direction="column" gap="3">
          <Flex justify={"center"}>
            <label htmlFor="avatar-upload" style={{ cursor: "pointer" }}>
              <img
                src={previewUrl || ad.imageUrl || PLACE_HOLDER_IMG}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: 100,
                  borderRadius: "var(--radius-2)",
                }}
              />
            </label>
            <input
              disabled={loading}
              id="avatar-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) return;

                setAd((prev) => ({
                  ...prev,
                  image: file,
                }));
              }}
            />
          </Flex>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Título
            </Text>
            <TextField.Root
              disabled={loading}
              value={ad.title}
              onChange={(event) =>
                setAd((prev) => ({
                  ...prev,
                  title: event.target.value,
                }))
              }
            />
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Descrição
            </Text>
            <TextField.Root
              disabled={loading}
              value={ad.description}
              onChange={(event) =>
                setAd((prev) => ({
                  ...prev,
                  description: event.target.value,
                }))
              }
            />
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Categoria
            </Text>
            <CategorySelect
              disabled={loading}
              value={ad.category}
              onValueChange={(newCategory) =>
                setAd((prev) => ({
                  ...prev,
                  category: newCategory,
                }))
              }
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button disabled={loading} variant="soft">
              Cancelar
            </Button>
          </Dialog.Close>
          <Button disabled={loading} loading={loading} onClick={handleSubmit}>
            Confirmar
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
