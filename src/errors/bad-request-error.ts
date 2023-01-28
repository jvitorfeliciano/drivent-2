import { ApplicationError } from "@/protocols";

export function badRequestError(): ApplicationError {
  return {
    name: "BadRequestError",
    message: "You must provide the required fields",
  };
}
