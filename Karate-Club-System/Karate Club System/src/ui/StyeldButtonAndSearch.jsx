import styled from "styled-components";

const StyeldButtonAndSearch = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 25px 0px 10px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export default StyeldButtonAndSearch;
