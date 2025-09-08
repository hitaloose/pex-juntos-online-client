import { useCallback, useState } from "react";
import { Button, Card, Flex, Heading, TextField } from "@radix-ui/themes";
import { NavLink, useNavigate } from "react-router";
import { PAGES } from "../../utils/pages";
import { api } from "../../services/api";
import { Role } from "../../types/role";
import { errorHandler } from "../../utils/error";
import { loginSchema } from "../../schemas/auth-schema";

export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = useCallback(async () => {
    try {
      const input = loginSchema.parse({ email, password });

      const { data } = await api.post("/auth/login", input);

      localStorage.setItem("TOKEN", data.token);
      localStorage.setItem("USER", JSON.stringify(data.user));

      if (data.user.role === Role.PROVIDER) {
        navigate(PAGES.DASHBOARD);
      }
      if (data.user.role === Role.ADMIN) {
        navigate(PAGES.ADMIN);
      }
    } catch (error) {
      errorHandler(error);
    }
  }, [email, navigate, password]);

  return (
    <Card>
      <Flex gap="4" direction={"column"}>
        <Flex justify={"between"} align={"center"}>
          <Heading>Acesso</Heading>
          <NavLink to={PAGES.HOME}>Início</NavLink>
        </Flex>

        <TextField.Root
          required
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField.Root
          required
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <NavLink to={PAGES.SIGNUP}>Cadastrar</NavLink>

        <Flex justify={"end"}>
          <Button onClick={handleSubmit}>Entrar</Button>
        </Flex>
      </Flex>
    </Card>
  );
};
