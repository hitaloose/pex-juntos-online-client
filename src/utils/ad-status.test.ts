import { describe, it, expect } from "vitest";
import { MAPPEP_AD_STATUS } from "./ad-status";

describe("MAPPEP_AD_STATUS", () => {
  it("contém os 4 status esperados", () => {
    expect(MAPPEP_AD_STATUS).toHaveProperty("activated");
    expect(MAPPEP_AD_STATUS).toHaveProperty("disabled");
    expect(MAPPEP_AD_STATUS).toHaveProperty("hidden");
    expect(MAPPEP_AD_STATUS).toHaveProperty("removed");
  });

  it("exibe os labels em português corretos", () => {
    expect(MAPPEP_AD_STATUS["activated"]).toBe("Ativado");
    expect(MAPPEP_AD_STATUS["disabled"]).toBe("Desativado");
    expect(MAPPEP_AD_STATUS["hidden"]).toBe("Oculto pelo administrador");
    expect(MAPPEP_AD_STATUS["removed"]).toBe("Excluido");
  });
});
