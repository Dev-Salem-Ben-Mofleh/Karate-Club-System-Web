import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { required } from "../../utils/validationRules";
import useLogin from "./useLogin";
import InputUserName from "../../ui/InputUserName";

function LoginForm() {
  const navigate = useNavigate();
  const { isLoading, Login } = useLogin();

  const { register, handleSubmit, reset, formState } = useForm({});
  const { errors } = formState;

  function onSubmit(data) {
    const { userName, password } = data;
    Login(
      { userName, password },
      {
        onSettled: () => {
          reset();
        },
        onSuccess: () => {
          navigate("/dashboard");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type={"login"}>
      <FormRowVertical label="User Name" error={errors?.userName?.message}>
        <InputUserName
          type="text"
          id="userName"
          autoComplete="userName"
          disabled={isLoading}
          {...register("userName", required("User Name"))}
        />
      </FormRowVertical>
      <FormRowVertical label="Password" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isLoading}
          {...register("password", required("Password"))}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoading}>
          {!isLoading ? "Log in" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
