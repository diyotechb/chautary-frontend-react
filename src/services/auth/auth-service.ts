import { API } from "@/utils/api";
import { TRegistrationSchema } from "@/validations/register.validation";

const RegisterUser = async (
  data: Omit<TRegistrationSchema, "confirmPassword">,
) => {
  return API.post("/auth/register", data);
};

export const authService = {
  RegisterUser,
};
