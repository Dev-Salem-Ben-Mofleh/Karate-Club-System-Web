import styled from "styled-components";
import Heading from "../ui/Heading";

const StyledPageNotFound = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 3.2rem;
  }
`;
function PermissionPage({ PageName }) {
  return (
    <StyledPageNotFound>
      <Box>
        <Heading as="h1">
          {`This page does not have permission to manage ${PageName}, see your manager 😢`}
        </Heading>
      </Box>
    </StyledPageNotFound>
  );
}

export default PermissionPage;

// function readPermissionsToSet(Permissions) {
//   if (Permissions === 0) return;

//   if (Permissions === 255) {
//     setValue("all_Permission", true);
//     return;
//   } else {
//     if ((1 & permission) === 1) setValue("manage_Members", true);
//     if ((2 & Permissions) === 2) setValue("manage_Instructors", true);
//     if ((4 & Permissions) === 4) setValue("manage_Users", true);
//     if ((8 & Permissions) === 8) setValue("manage_MembersInstructors", true);
//     if ((16 & Permissions) === 16) setValue("manage_BeltRanks", true);
//     if ((32 & Permissions) === 32) setValue("manage_SubscriptionPeriod", true);
//     if ((64 & Permissions) === 64) setValue("manage_BeltTests", true);
//     if ((128 & Permissions) === 128) setValue("manage_Payments", true);
//   }
// }
