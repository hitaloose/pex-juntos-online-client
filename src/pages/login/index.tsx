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

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

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
      } finally {
        setLoading(false);
      }
    },
    [email, navigate, password]
  );

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <Flex gap="4" direction={"column"}>
          <Flex justify={"between"} align={"center"}>
            <Heading>Acesso</Heading>
            <NavLink to={PAGES.HOME}>Início</NavLink>
          </Flex>

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

          <NavLink to={PAGES.SIGNUP}>Cadastrar</NavLink>

          <Flex justify={"end"}>
            <Button disabled={loading} loading={loading} type="submit">
              Entrar
            </Button>
          </Flex>
        </Flex>
      </form>
    </Card>
  );
};
