import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { ZodError, z } from "zod";
import { errorHandler } from "./error";

const mockAlert = vi.fn();

beforeEach(() => {
  vi.stubGlobal("alert", mockAlert);
  mockAlert.mockClear();
});

describe("errorHandler", () => {
  it("exibe a mensagem de erro do Axios", () => {
    const axiosError = new axios.AxiosError("erro");
    axiosError.response = {
      data: { message: "Credenciais inválidas" },
      status: 401,
      statusText: "Unauthorized",
      headers: {},
      config: {} as never,
    };

    errorHandler(axiosError);

    expect(mockAlert).toHaveBeenCalledWith("Credenciais inválidas");
  });

  it("exibe as issues formatadas de um ZodError", () => {
    const schema = z.object({ email: z.email() });
    let zodError: ZodError | null = null;
    try {
      schema.parse({ email: "invalido" });
    } catch (err) {
      zodError = err as ZodError;
    }

    errorHandler(zodError!);

    expect(mockAlert).toHaveBeenCalledWith(expect.stringContaining("email"));
  });

  it("exibe a mensagem de um Error genérico", () => {
    errorHandler(new Error("algo deu errado"));

    expect(mockAlert).toHaveBeenCalledWith("algo deu errado");
  });

  it("exibe mensagem padrão para erro desconhecido", () => {
    errorHandler("erro desconhecido");

    expect(mockAlert).toHaveBeenCalledWith("Ocorreu um error, tente novamente");
  });
});
