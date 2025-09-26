import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import type { Ad } from "../../../../types/ad";
import { api } from "../../../../services/api";
import { useCallback, useState } from "react";
import { errorHandler } from "../../../../utils/error";

type Props = {
  ad: Ad;
  onUpdate?: () => void;
};

export const ToggleStatusAlert = (props: Props) => {
  const { ad, onUpdate } = props;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirmClick = useCallback(async () => {
    setLoading(true);

    try {
      await api.patch(`/ad/${ad.id}/toggle-status`);
      setOpen(false);
      onUpdate?.();
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  }, [ad.id, onUpdate]);

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger>
        <Button variant="soft">
          {ad.status === "activated" ? "Desativar" : "Ativar"}
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Atenção</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Deseja realmente alterar o status?
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
            onClick={handleConfirmClick}
          >
            Confirmar
          </Button>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
