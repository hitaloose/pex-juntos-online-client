import { Button, Card, Flex, Heading, TextField } from "@radix-ui/themes";
import { NavLink, useNavigate } from "react-router";
import { PAGES } from "../../utils/pages";
import { signupSchema } from "../../schemas/auth-schema";
import { api } from "../../services/api";
import { errorHandler } from "../../utils/error";
import { useCallback, useState } from "react";
import { withMask } from "use-mask-input";

export const Signup = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [phoneWhatsapp, setPhoneWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleChangePhoneWhatsapp = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = event.target.value.replace(/\D/g, "");
      setPhoneWhatsapp(rawValue);
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      try {
        const input = signupSchema.parse({
          email,
          password,
          name,
          neighborhood,
          phoneWhatsapp,
          passwordConfirmation,
        });

        const { data } = await api.post("/auth/signup", input);

        localStorage.setItem("TOKEN", data.token);
        localStorage.setItem("USER", JSON.stringify(data.user));

        navigate(PAGES.DASHBOARD);
      } catch (error) {
        errorHandler(error);
      } finally {
        setLoading(false);
      }
    },
    [
      email,
      name,
      navigate,
      neighborhood,
      password,
      passwordConfirmation,
      phoneWhatsapp,
    ]
  );
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <Flex gap="4" direction={"column"}>
          <Flex justify={"between"} align={"center"}>
            <Heading>Cadastro</Heading>
            <NavLink to={PAGES.HOME}>Início</NavLink>
          </Flex>

          <TextField.Root
            required
            disabled={loading}
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField.Root
            required
            disabled={loading}
            placeholder="Bairro"
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
          />
          <TextField.Root
            required
            disabled={loading}
            placeholder="Whatsapp"
            ref={withMask("(99) 99999-9999")}
            value={phoneWhatsapp}
            onChange={handleChangePhoneWhatsapp}
          />
          <TextField.Root
            required
            disabled={loading}
            placeholder="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField.Root
            required
            disabled={loading}
            placeholder="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField.Root
            required
            disabled={loading}
            placeholder="Confirmar senha"
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />

          <NavLink to={PAGES.LOGIN}>Entrar</NavLink>

          <Flex justify={"end"}>
            <Button type="submit" disabled={loading} loading={loading}>
              Cadastrar
            </Button>
          </Flex>
        </Flex>
      </form>
    </Card>
  );
};
