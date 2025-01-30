import {
  fetchInstructorDetails,
  fetchMemberDetails,
  formatDate,
} from "../../utils/helpers";
import ImageIcone from "../../ui/ImageIcone";
import Icon from "../../ui/Icon";
import Text from "../../ui/Text";
import Field from "../../ui/Field";
import Card from "../../ui/Card";
import Heading from "../../ui/Heading";
import { useEffect, useRef, useState } from "react";
import Spinner from "../../ui/Spinner";
import ShowInstructorDetails from "../Instructors/ShowInstructorDetails";
import ShowMemberDetails from "../Members/ShowMemberDetails";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { useAllBeltRankForMembers } from "../BeltRanks/useAllBeltRankForMembers";

const StyledPage = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  justify-content: flex-start;
  gap: 20;
`;

function ShowMemberInstructorDetails({ onCloseModal }) {
  const location = useLocation();
  const navigate = useNavigate();

  let memberInstructorDetails = location.state;
  useAllBeltRankForMembers();
  const [isLoad, setIsLoading] = useState(false);
  const instructorDetails = useRef();
  const memberDetails = useRef();

  useEffect(() => {
    async function fetchData() {
      await handleFetchInstructor();
      await handleFetchMember();
      if (instructorDetails.current && memberDetails.current)
        setIsLoading((value) => (value = true));
    }
    fetchData();
  }, []);
  console.log(instructorDetails.current);
  console.log(memberDetails.current);

  return isLoad ? (
    <>
      <Heading as="h2">
        Show Instructor Details With ID=
        {`${memberInstructorDetails.memberInstructorID}`}
      </Heading>

      <StyledPage>
        <Card>
          <Field>
            <Text>Assign Date: </Text>
            <Icon>{<ImageIcone src="./Calendar 32.png" />}</Icon>
            <Text> {formatDate(memberInstructorDetails.assignDate)}</Text>
          </Field>
        </Card>

        <ShowMemberDetails
          memberDetails={memberDetails.current}
          isShowCancle={false}
        />
        <ShowInstructorDetails
          instructorDetails={instructorDetails.current}
          isShowCancle={false}
        />
        <Button variation="danger" type="reset" onClick={() => navigate(-1)}>
          Return
        </Button>
      </StyledPage>
    </>
  ) : (
    <Spinner />
  );

  async function handleFetchInstructor() {
    instructorDetails.current = await fetchInstructorDetails(
      memberInstructorDetails.instructorID
    );
  }
  async function handleFetchMember() {
    memberDetails.current = await fetchMemberDetails(
      memberInstructorDetails.memberID
    );
  }
}

export default ShowMemberInstructorDetails;
