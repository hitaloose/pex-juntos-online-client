import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { PAGES } from "../../../../utils/pages";

export const ExitAlert = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmitClick = useCallback(async () => {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("USER");
    navigate(PAGES.HOME, { replace: true });
  }, [navigate]);

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger>
        <Button>Sair</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Atenção</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Deseja realmente sair do sistema?
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft">Cancelar</Button>
          </AlertDialog.Cancel>
          <Button onClick={handleSubmitClick}>Confirmar</Button>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
