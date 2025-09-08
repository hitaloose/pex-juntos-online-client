import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import type { Ad } from "../../../../types/ad";
import { useCallback, useEffect, useState } from "react";
import { adSchema } from "../../../../schemas/ad-schema";
import { api } from "../../../../services/api";
import { errorHandler } from "../../../../utils/error";
import { CategorySelect } from "../../../../components/category-select";

type Props = {
  ad: Ad;
  onSubmit?: () => void;
};

export const EditAdDialog = (props: Props) => {
  const { ad } = props;

  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState(ad.title);
  const [description, setDescription] = useState(ad.description);
  const [category, setCategory] = useState(ad.category);

  const resetForm = useCallback(() => {
    setTitle(ad.title);
    setDescription(ad.description);
    setCategory(ad.category);
  }, [ad.category, ad.description, ad.title]);

  const handleSubmit = useCallback(async () => {
    try {
      const input = adSchema.parse({ title, description, category });
      await api.put(`/ad/${ad.id}`, input);
      setOpen(false);
      props.onSubmit?.();
    } catch (error) {
      errorHandler(error);
    }
  }, [ad.id, category, description, props, title]);

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
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Título
            </Text>
            <TextField.Root
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Descrição
            </Text>
            <TextField.Root
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Categoria
            </Text>
            <CategorySelect
              value={category}
              onValueChange={(e) => setCategory(e)}
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft">Cancelar</Button>
          </Dialog.Close>
          <Button onClick={handleSubmit}>Confirmar</Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
