import { describe, it, expect } from "vitest";
import { adSchema, searchAdsSchema } from "./ad-schema";

describe("adSchema", () => {
  const validData = {
    title: "Costura em geral",
    description: "Faço ajustes e costuras em geral",
    category: "costura",
  };

  it("aceita dados válidos sem imagem", () => {
    expect(() => adSchema.parse(validData)).not.toThrow();
  });

  it("aceita dados válidos com imagem", () => {
    const file = new File([""], "anuncio.jpg", { type: "image/jpeg" });
    expect(() =>
      adSchema.parse({ ...validData, image: file })
    ).not.toThrow();
  });
});

describe("searchAdsSchema", () => {
  it("aceita objeto vazio e aplica defaults", () => {
    const result = searchAdsSchema.parse({});
    expect(result.q).toBe("");
    expect(result.category).toBe("");
    expect(result.neighborhood).toBe("");
  });

  it("aceita campos preenchidos", () => {
    const result = searchAdsSchema.parse({
      q: "costura",
      category: "costura",
      neighborhood: "Centro",
    });
    expect(result.q).toBe("costura");
    expect(result.category).toBe("costura");
    expect(result.neighborhood).toBe("Centro");
  });

  it("aplica default para campos undefined individualmente", () => {
    const result = searchAdsSchema.parse({ q: "busca" });
    expect(result.q).toBe("busca");
    expect(result.category).toBe("");
    expect(result.neighborhood).toBe("");
  });
});
