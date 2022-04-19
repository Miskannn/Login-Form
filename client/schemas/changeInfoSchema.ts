import * as yup from "yup"

export const changeInfoSchema = yup.object().shape({
  email: yup.string().required().email(),
});

