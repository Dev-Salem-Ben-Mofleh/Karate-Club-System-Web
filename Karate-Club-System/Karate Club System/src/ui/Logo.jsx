import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: 60%;
  object-fit: cover;
  @media (max-width: 768px) {
    width: 20%;
  }

  /* Medium */
  @media (max-width: 992px) {
    width: 40%;
  }
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="/karate-logo.jpg" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
