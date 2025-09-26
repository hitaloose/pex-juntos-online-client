import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { CategorySelect } from "../../../../components/category-select";
import { useCallback, useEffect, useMemo, useState } from "react";
import { adSchema } from "../../../../schemas/ad-schema";
import { api } from "../../../../services/api";
import { errorHandler } from "../../../../utils/error";
import type { Ad } from "../../../../types/ad";

type Props = {
  onSubmit?: () => void;
};

const INITIAL_AD_STATE = {
  title: "",
  description: "",
  category: "",
} as Ad;

const PLACE_HOLDER_IMG = "https://placehold.co/600x400?text=Clique+aqui";

export const AddAdDialog = (props: Props) => {
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
  }, []);

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

      await api.post("/ad", formData);
      props.onSubmit?.();
      setOpen(false);
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  }, [ad, props]);

  useEffect(() => {
    if (open === false) {
      resetForm();
    }
  }, [open, resetForm]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button>Incluir anúncio</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Incluir anúncio</Dialog.Title>

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
