import styled from "styled-components";
// import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 25rem;
  width: 50%;
  object-fit: cover;
`;

function LoginLogo() {
  // const { isDarkMode, toggleDarkMode } = useDarkMode();

  // const src = isDarkMode ? "/logo-dark.png" : "/logo-light.png";

  return (
    <StyledLogo>
      <Img src="./karate-player.jpg" alt="Logo" />
    </StyledLogo>
  );
}

export default LoginLogo;
