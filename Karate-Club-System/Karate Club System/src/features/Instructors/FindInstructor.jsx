import { useEffect, useRef, useState } from "react";
import Heading from "../../ui/Heading";
import toast from "react-hot-toast";
import Spinner from "../../ui/Spinner";
import { required, validateInstuctorRule } from "../../utils/validationRules";
import ButtonSearch from "../../ui/ButtonSearch";
import StyledFind from "../../ui/StyledFind";
import StyeldButtonAndSearch from "../../ui/StyeldButtonAndSearch";
import InputSearchStyled2 from "../../ui/InputSearchStyled2";
import InstructorCardSearch from "./InstructorCardSearch";
import {
  fetchInstructorDetails,
  fetchMemberInstructorTheSame,
  handleIamge,
  isValidInstructorID,
  isValidMemberID,
} from "../../utils/helpers";
import { MALE_PICTURE_URL } from "../../utils/constants";

function FindInstructor({
  register,
  getValues,
  isWorking,
  isEditSession,
  isTest = false,
}) {
  const [isSearch, setIsSeearch] = useState(false);
  const instructorDetialsRef = useRef();
  const isSameRef = useRef();
  useEffect(() => {
    if (isEditSession && getValues("instructorID") > 0) {
      handleFetch(null, getValues("instructorID"));
    }
  }, [isEditSession]);

  let ImagePath = "";

  if (Boolean(instructorDetialsRef.current)) {
    ImagePath = handleIamge(
      instructorDetialsRef.current.image,
      instructorDetialsRef.current.gender
    );
  } else {
    ImagePath = MALE_PICTURE_URL;
  }

  if (isSearch) return <Spinner />;
  return (
    <>
      <StyledFind>
        <Heading as="h3">Find instructor By ID</Heading>
        <StyeldButtonAndSearch>
          {isTest ? (
            <>
              <InputSearchStyled2
                id="instructorID"
                disabled={isWorking}
                {...register("instructorID", required("Instructor ID"))}
                placeholder="Instructor ID"
              />
              <ButtonSearch
                onClick={(e) => handleFetch(e, getValues("instructorID"))}
              >
                Search
              </ButtonSearch>
            </>
          ) : (
            <>
              <InputSearchStyled2
                id="instructorID"
                disabled={isWorking}
                {...register(
                  "instructorID",
                  validateInstuctorRule(isSameRef.current)
                )}
                placeholder="Instructor ID"
              />
              <ButtonSearch
                onClick={(e) => handleFetch(e, getValues("instructorID"))}
              >
                Search
              </ButtonSearch>
            </>
          )}
        </StyeldButtonAndSearch>
        <InstructorCardSearch
          instructorDetials={instructorDetialsRef}
          ImagePath={ImagePath}
        />
      </StyledFind>
    </>
  );
  async function handleFetch(e, InstructorID) {
    if (e !== null) e.preventDefault();
    if (
      !isValidInstructorID(getValues("instructorID")) ||
      !isValidInstructorID(InstructorID)
    ) {
      toast.error(`Please enter Instructor ID Greater than > 0`);
      return;
    }
    setIsSeearch((value) => (value = true));
    instructorDetialsRef.current = await fetchInstructorDetails(InstructorID);
    if (!instructorDetialsRef.current) {
      toast.error(`Instructor Is not found try again and enter correct ID`);
      setIsSeearch((value) => (value = false));
      return;
    } else toast.success(`Instructor Is found with ID= ${InstructorID}`);
    if (isValidMemberID(getValues("memberID")))
      isSameRef.current = await fetchMemberInstructorTheSame(
        getValues("memberID"),
        getValues("instructorID")
      );

    isEditSession = false;
    setIsSeearch((value) => (value = false));
  }
}

export default FindInstructor;
