import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import Logout from "../features/Authentication/Logout";
import Modal from "./Modal";
import { useRef, useState } from "react";
import Spinner from "./Spinner";
import useCurrentUser from "../features/Authentication/useCurrentUser";
import UpdateUser from "../features/Users/UpdateUser";
import { fetchUserDetails } from "../utils/helpers";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
  @media (max-width: 768px) {
    margin-left: 15px;
  }
`;

function HeaderMenu() {
  const { isLoading, currentUser = {} } = useCurrentUser();
  const [isFetch, setIsFetch] = useState(false);
  const userDetialsRef = useRef();

  return (
    <StyledHeaderMenu>
      <li>
        <Modal>
          <Modal.Open opens="update">
            <ButtonIcon>
              <HiOutlineUser onClick={() => handleFetch(currentUser.userID)} />
            </ButtonIcon>
          </Modal.Open>
          <Modal.Window name="update">
            {isLoading || isFetch ? (
              <Spinner />
            ) : (
              <UpdateUser userToEdit={userDetialsRef.current} />
            )}
          </Modal.Window>
        </Modal>
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
  async function handleFetch(userID) {
    setIsFetch((value) => (value = true));
    userDetialsRef.current = await fetchUserDetails(userID);
    setIsFetch((value) => (value = false));
  }
}

export default HeaderMenu;
