import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { CategorySelect } from "../../../../components/category-select";
import { useCallback, useEffect, useState } from "react";
import { adSchema } from "../../../../schemas/ad-schema";
import { api } from "../../../../services/api";
import { errorHandler } from "../../../../utils/error";

type Props = {
  onSubmit?: () => void;
};

export const AddAdDialog = (props: Props) => {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const resetForm = useCallback(() => {
    setTitle("");
    setDescription("");
    setCategory("");
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      const input = adSchema.parse({ title, description, category });
      await api.post("/ad", input);
      props.onSubmit?.();
      setOpen(false);
    } catch (error) {
      errorHandler(error);
    }
  }, [category, description, props, title]);

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
