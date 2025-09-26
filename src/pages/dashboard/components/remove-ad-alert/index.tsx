import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import type { Ad } from "../../../../types/ad";
import { api } from "../../../../services/api";
import { useCallback, useState } from "react";
import { errorHandler } from "../../../../utils/error";

type Props = {
  ad: Ad;
  onRemove?: () => void;
};

export const RemoveAdAlert = (props: Props) => {
  const { ad, onRemove } = props;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRemoveClick = useCallback(async () => {
    setLoading(true);

    try {
      await api.delete(`/ad/${ad.id}`);
      setOpen(false);
      onRemove?.();
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  }, [ad.id, onRemove]);

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger>
        <Button variant="soft">Excluir</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Atenção</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Deseja realmente excluir o anúncio?
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button disabled={loading} variant="soft">
              Cancelar
            </Button>
          </AlertDialog.Cancel>
          <Button
            disabled={loading}
            loading={loading}
            onClick={handleRemoveClick}
          >
            Confirmar
          </Button>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
