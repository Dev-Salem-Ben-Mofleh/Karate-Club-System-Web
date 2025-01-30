import { useQuery } from "@tanstack/react-query";
import { getUserByID } from "../../services/apiUsers";

function useCurrentUser() {
  const curruentSessoinjson = localStorage.getItem("session");
  const curruentSessoin = JSON.parse(curruentSessoinjson);
  const {
    isLoading,
    error,
    data: currentUser,
  } = useQuery({
    queryFn: () => getUserByID(curruentSessoin?.userID),
    enabled: !!curruentSessoin?.userID,
  });

  return { isLoading, error, currentUser };
}

export default useCurrentUser;
