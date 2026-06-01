import { describe, it, expect } from "vitest";
import { signupSchema, loginSchema } from "./auth-schema";

describe("signupSchema", () => {
  const validData = {
    name: "João Silva",
    email: "joao@email.com",
    password: "123456",
    passwordConfirmation: "123456",
    phoneWhatsapp: "51999990000",
    neighborhood: "Centro",
  };

  it("aceita dados válidos", () => {
    expect(() => signupSchema.parse(validData)).not.toThrow();
  });

  it("rejeita email inválido", () => {
    expect(() =>
      signupSchema.parse({ ...validData, email: "nao-e-email" })
    ).toThrow();
  });

  it("rejeita phoneWhatsapp com menos de 11 caracteres", () => {
    expect(() =>
      signupSchema.parse({ ...validData, phoneWhatsapp: "5199999" })
    ).toThrow();
  });

  it("rejeita phoneWhatsapp com mais de 11 caracteres", () => {
    expect(() =>
      signupSchema.parse({ ...validData, phoneWhatsapp: "519999900001" })
    ).toThrow();
  });

  it("rejeita name vazio", () => {
    expect(() =>
      signupSchema.parse({ ...validData, name: "" })
    ).toThrow();
  });

  it("rejeita password vazio", () => {
    expect(() =>
      signupSchema.parse({ ...validData, password: "" })
    ).toThrow();
  });

  it("rejeita neighborhood vazio", () => {
    expect(() =>
      signupSchema.parse({ ...validData, neighborhood: "" })
    ).toThrow();
  });
});

describe("loginSchema", () => {
  const validData = {
    email: "joao@email.com",
    password: "123456",
  };

  it("aceita email e senha válidos", () => {
    expect(() => loginSchema.parse(validData)).not.toThrow();
  });

  it("rejeita email inválido", () => {
    expect(() =>
      loginSchema.parse({ ...validData, email: "invalido" })
    ).toThrow();
  });

  it("rejeita password vazio", () => {
    expect(() =>
      loginSchema.parse({ ...validData, password: "" })
    ).toThrow();
  });
});
