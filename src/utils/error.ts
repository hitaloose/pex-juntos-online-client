import axios from "axios";
import { ZodError } from "zod";

export const errorHandler = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data.message;
    alert(message);
    return;
  }

  if (error instanceof ZodError) {
    const message = error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("\n");

    alert(message);
    return;
  }

  if (error instanceof Error) {
    alert(error.message);
    return;
  }

  alert("Ocorreu um error, tente novamente");
};
