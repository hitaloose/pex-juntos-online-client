import {
  Avatar,
  Button,
  Dialog,
  Flex,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useCallback, useEffect, useMemo, useState } from "react";
import { api } from "../../../../services/api";
import { errorHandler } from "../../../../utils/error";
import type { User } from "../../../../types/user";
import type { Provider } from "../../../../types/provider";
import { providerSchema } from "../../../../schemas/provider-schema";
import { withMask } from "use-mask-input";

type Props = {
  onSubmit?: () => void;
};

export const AccountDialog = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState<null | User>(null);
  const [provider, setProvider] = useState<null | Provider>(null);
  const [originalProvider, setOriginalProvider] = useState<null | Provider>(
    null
  );

  const avatarPreviewUrl = useMemo(() => {
    if (provider && provider.image instanceof File) {
      const url = URL.createObjectURL(provider.image);
      return url;
    }
    return undefined;
  }, [provider]);

  const handleDidMount = useCallback(async () => {
    setLoading(true);

    try {
      const { data } = await api.get("/auth/me");
      setUser(data.user);
      setProvider(data.user.provider);
      setOriginalProvider(data.user.provider);
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChangePhoneWhatsapp = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = event.target.value.replace(/\D/g, "");
      setProvider((prev) => ({
        ...((prev || {}) as Provider),
        phoneWhatsapp: rawValue,
      }));
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    setLoading(true);

    try {
      const input = providerSchema.parse(provider);

      const formData = new FormData();
      if (input.image) {
        formData.append("image", input.image);
      }

      formData.append("name", input.name);
      formData.append("neighborhood", input.neighborhood);
      formData.append("phoneWhatsapp", input.phoneWhatsapp);

      const { data } = await api.put("/provider", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      props.onSubmit?.();

      setProvider(data.provider);
      setOriginalProvider(data.provider);
      setOpen(false);
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  }, [props, provider]);

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setProvider(originalProvider);
    }
    setOpen(next);
  };

  useEffect(() => {
    handleDidMount();
  }, [handleDidMount]);

  useEffect(() => {
    return () => {
      if (avatarPreviewUrl) URL.revokeObjectURL(avatarPreviewUrl);
    };
  }, [avatarPreviewUrl]);

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger>
        <Button>Conta</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Conta</Dialog.Title>

        <Flex direction="column" gap="3">
          <Flex justify={"center"}>
            <label htmlFor="avatar-upload" style={{ cursor: "pointer" }}>
              <Avatar
                size={"9"}
                src={avatarPreviewUrl || provider?.imageUrl}
                fallback={provider?.name.at(0) || ""}
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

                setProvider((prev) => ({
                  ...((prev || {}) as Provider),
                  image: file,
                }));
              }}
            />
          </Flex>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              E-mail
            </Text>
            <TextField.Root disabled value={user?.email} />
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Nome
            </Text>
            <TextField.Root
              disabled={loading}
              value={provider?.name}
              onChange={(event) =>
                setProvider((prev) => ({
                  ...((prev || {}) as Provider),
                  name: event.target.value,
                }))
              }
            />
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Whatsapp
            </Text>
            <TextField.Root
              disabled={loading}
              ref={withMask("(99) 99999-9999")}
              value={provider?.phoneWhatsapp}
              onChange={handleChangePhoneWhatsapp}
            />
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Bairro
            </Text>
            <TextField.Root
              disabled={loading}
              value={provider?.neighborhood}
              onChange={(event) =>
                setProvider((prev) => ({
                  ...((prev || {}) as Provider),
                  neighborhood: event.target.value,
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
          <Button loading={loading} disabled={loading} onClick={handleSubmit}>
            Confirmar
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
