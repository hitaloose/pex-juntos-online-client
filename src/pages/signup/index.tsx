import { Button, Card, Flex, Heading, TextField } from "@radix-ui/themes";
import { NavLink, useNavigate } from "react-router";
import { PAGES } from "../../utils/pages";
import { signupSchema } from "../../schemas/auth-schema";
import { api } from "../../services/api";
import { errorHandler } from "../../utils/error";
import { useCallback, useState } from "react";

export const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [phoneWhatsapp, setPhoneWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = useCallback(async () => {
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
    }
  }, [
    email,
    name,
    navigate,
    neighborhood,
    password,
    passwordConfirmation,
    phoneWhatsapp,
  ]);
  return (
    <Card>
      <Flex gap="4" direction={"column"}>
        <Flex justify={"between"} align={"center"}>
          <Heading>Cadastro</Heading>
          <NavLink to={PAGES.HOME}>Início</NavLink>
        </Flex>

        <TextField.Root
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField.Root
          placeholder="Bairro"
          value={neighborhood}
          onChange={(e) => setNeighborhood(e.target.value)}
        />
        <TextField.Root
          placeholder="Whatsapp"
          value={phoneWhatsapp}
          onChange={(e) => setPhoneWhatsapp(e.target.value)}
        />
        <TextField.Root
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField.Root
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField.Root
          placeholder="Confirmar senha"
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />

        <NavLink to={PAGES.LOGIN}>Entrar</NavLink>

        <Flex justify={"end"}>
          <Button onClick={handleSubmit}>Cadastrar</Button>
        </Flex>
      </Flex>
    </Card>
  );
};
