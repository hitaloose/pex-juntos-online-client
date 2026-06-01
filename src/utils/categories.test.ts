import { describe, it, expect } from "vitest";
import { CATEGORIES, MAPPED_CATEGORIES } from "./categories";

describe("CATEGORIES", () => {
  it("cada valor de CATEGORIES existe em MAPPED_CATEGORIES", () => {
    for (const category of CATEGORIES) {
      expect(MAPPED_CATEGORIES).toHaveProperty(category.value);
    }
  });

  it("o label de CATEGORIES bate com o valor em MAPPED_CATEGORIES", () => {
    for (const category of CATEGORIES) {
      expect(MAPPED_CATEGORIES[category.value]).toBe(category.label);
    }
  });

  it("CATEGORIES e MAPPED_CATEGORIES têm o mesmo número de entradas", () => {
    expect(CATEGORIES.length).toBe(Object.keys(MAPPED_CATEGORIES).length);
  });
});
