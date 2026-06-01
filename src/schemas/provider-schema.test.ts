import { describe, it, expect } from "vitest";
import { providerSchema } from "./provider-schema";

describe("providerSchema", () => {
  const validData = {
    name: "Maria Costa",
    phoneWhatsapp: "51988887777",
    neighborhood: "Moinhos",
  };

  it("aceita dados válidos sem imagem", () => {
    expect(() => providerSchema.parse(validData)).not.toThrow();
  });

  it("aceita dados válidos com imagem", () => {
    const file = new File([""], "foto.jpg", { type: "image/jpeg" });
    expect(() =>
      providerSchema.parse({ ...validData, image: file })
    ).not.toThrow();
  });

  it("rejeita phoneWhatsapp com menos de 11 caracteres", () => {
    expect(() =>
      providerSchema.parse({ ...validData, phoneWhatsapp: "5198888" })
    ).toThrow();
  });

  it("rejeita phoneWhatsapp com mais de 11 caracteres", () => {
    expect(() =>
      providerSchema.parse({ ...validData, phoneWhatsapp: "519888877771" })
    ).toThrow();
  });
});
