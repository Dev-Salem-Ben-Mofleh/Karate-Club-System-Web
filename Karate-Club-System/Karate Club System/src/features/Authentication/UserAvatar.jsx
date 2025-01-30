import styled from "styled-components";
import useCurrentUser from "./useCurrentUser";
import Spinner from "../../ui/Spinner";
import { USER_PICTURE_URL } from "../../utils/constants";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

function UserAvatar() {
  const { isLoading, currentUser = {} } = useCurrentUser();

  let fullName = "";
  let avatar = "";

  if (currentUser.personID > 0) {
    fullName = currentUser.name;
    avatar = currentUser.image === null ? USER_PICTURE_URL : currentUser.image;
  }
  if (isLoading) return <Spinner />;
  return (
    <StyledUserAvatar>
      <Avatar src={avatar} alt={`Avatar of ${fullName}`} />

      <span>{fullName}</span>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
