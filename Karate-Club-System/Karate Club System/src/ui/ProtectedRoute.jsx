import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const curruentSessoinjson = localStorage.getItem("session");
  const curruentSessoin = JSON.parse(curruentSessoinjson);

  useEffect(() => {
    if (!curruentSessoin) {
      navigate("/login");
    }
  }, [curruentSessoin, navigate]);

  if (!curruentSessoin) {
    return null;
  }

  return children;
}

export default ProtectedRoute;
