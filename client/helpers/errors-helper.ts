import axios from "axios";

export const errorLogger = (error: Error | unknown): void => {
  if (error instanceof TypeError) {
    console.error("Error is instance TypeError",error);
  } else if (error instanceof RangeError) {
    console.error("Error is instance RangeError",error);
  } else if (error instanceof EvalError) {
    console.error("Error is instance EvalError",error);
  } else if (typeof error === "string") {
    console.error("Error is string",error);
  } else if (axios.isAxiosError(error)) {
    console.error("Error is instance AxiosError",error)
  } else {
    console.error("Error instance is not found",error)
  }
}
