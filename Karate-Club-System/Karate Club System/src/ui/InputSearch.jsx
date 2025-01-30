import styled from "styled-components";
import { HiSearchCircle } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import { FaLessThanEqual } from "react-icons/fa6";

const SearchCotainer = styled.div`
  position: relative;
`;
const InputSearchStyled = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  padding: 0.8rem 1.2rem;
`;
const ButtonSearch = styled.button`
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-brand-600);
  }
  position: absolute;
  right: 2%;
  top: 9%;
`;

function InputSearch({ IsFind = false }) {
  const [searchParams, setSearchParans] = useSearchParams();

  function handleChange(value) {
    if (!IsFind) {
      searchParams.set("search", value);
      setSearchParans(searchParams);
    } else {
      searchParams.set("find", value);
      setSearchParans(searchParams);
    }
  }

  return (
    <SearchCotainer>
      <InputSearchStyled
        type="text"
        placeholder="Search..."
        onChange={(e) => handleChange(e.target.value)}
      />
      <ButtonSearch>
        <HiSearchCircle />
      </ButtonSearch>
    </SearchCotainer>
  );
}

export default InputSearch;
