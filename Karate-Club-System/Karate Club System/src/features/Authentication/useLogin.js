import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getUserByUserNameAndPassword } from "../../services/apiUsers";

function useLogin() {
  const navigate = useNavigate();
  const { mutate: Login, isPending: isLoading } = useMutation({
    mutationFn: ({ userName, password }) =>
      getUserByUserNameAndPassword(userName, password),
    onSuccess: (result) => {
      if (result) localStorage.setItem("session", JSON.stringify(result));
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      toast.error(
        "Provider userName or password are incorrect or he/she is not active "
      );
    },
  });

  return { isLoading, Login };
}

export default useLogin;
