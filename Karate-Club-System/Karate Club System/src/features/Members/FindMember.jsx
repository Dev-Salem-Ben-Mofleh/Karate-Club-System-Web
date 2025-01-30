import { useEffect, useRef, useState } from "react";
import Heading from "../../ui/Heading";
import toast from "react-hot-toast";
import { useAllBeltRankForMembers } from "../BeltRanks/useAllBeltRankForMembers";
import { validateRule } from "../../utils/validationRules";
import Spinner from "../../ui/Spinner";
import ButtonSearch from "../../ui/ButtonSearch";
import StyledFind from "../../ui/StyledFind";
import StyeldButtonAndSearch from "../../ui/StyeldButtonAndSearch";
import InputSearchStyled2 from "../../ui/InputSearchStyled2";
import MemberCardSearch from "./MemberCardSearch";
import {
  fetchMemberDetails,
  fetchCheckMember,
  isValidMemberID,
  handleIamge,
} from "../../utils/helpers";
import { MALE_PICTURE_URL } from "../../utils/constants";

function FindMember({
  register,
  getValues,
  setValue,
  isWorking,
  isEditSession = false,
  isTest = false,
}) {
  const { beltRanks } = useAllBeltRankForMembers();

  const [isSearch, setIsSeearch] = useState(false);

  const memberDetialsRef = useRef();
  const memberHasPeriodActiveRef = useRef(false);
  const memberNotPaidforPeriodRef = useRef(false);

  useEffect(() => {
    if (isEditSession && getValues("memberID") > 0) {
      isTest
        ? handleFetchForTest(null, getValues("memberID"))
        : handleFetch(null, getValues("memberID"));
    }
  }, [isEditSession]);

  let RankMember = "";
  let TestRank = "";
  let RankIDForValidate = 0;
  let ImagePath = "";
  let isMemberActive = false;
  let hasActivePeriod = false;
  let isNotPaid = false;

  //ToLoadDataWhenFindMmeber
  if (Boolean(memberDetialsRef.current)) {
    RankIDForValidate = memberDetialsRef.current.lastBeltRank;
    RankMember = beltRanks.filter(
      (beltRank) => beltRank.rankID === memberDetialsRef.current.lastBeltRank
    );
    if (isTest) {
      TestRank = beltRanks.filter(
        (beltRank) =>
          beltRank.rankID === memberDetialsRef.current.lastBeltRank + 1
      );
      setValue("rankID", TestRank.length > 0 ? TestRank.at(0).rankID : 17);
      setValue(
        "beltRankName",
        TestRank.length > 0 ? TestRank.at(0).rankName : "Black Belt(10th Dan)"
      );
      setValue("fees", TestRank.length > 0 ? TestRank.at(0).testFees : "210");
    }
    ImagePath = handleIamge(
      memberDetialsRef.current.image,
      memberDetialsRef.current.gender
    );

    isMemberActive = memberDetialsRef.current.isActive;
    hasActivePeriod = memberHasPeriodActiveRef.current;
    isNotPaid = memberNotPaidforPeriodRef.current;
  } else {
    ImagePath = MALE_PICTURE_URL;
  }

  if (isSearch) return <Spinner />;

  return (
    <>
      <StyledFind>
        <Heading as="h3">Find Member By ID</Heading>
        <StyeldButtonAndSearch>
          {isTest ? (
            <>
              <InputSearchStyled2
                id="memberID"
                disabled={isEditSession ? isEditSession : isWorking}
                {...register(
                  "memberID",
                  validateRule({
                    isMemberActive,
                    hasActivePeriod,
                    isNotPaid,
                    RankIDForValidate,
                    context: "validateTestRule",
                  })
                )}
                placeholder="MemberID"
              />
              <ButtonSearch
                onClick={(e) => handleFetchForTest(e, getValues("memberID"))}
                disabled={isEditSession ? isEditSession : isWorking}
              >
                Search
              </ButtonSearch>
            </>
          ) : (
            <>
              <InputSearchStyled2
                id="memberID"
                disabled={isEditSession ? isEditSession : isWorking}
                {...register(
                  "memberID",
                  validateRule({
                    isMemberActive,
                    context: "validateMemberRule",
                  })
                )}
                placeholder="MemberID"
              />
              <ButtonSearch
                onClick={(e) => handleFetch(e, getValues("memberID"))}
                disabled={isEditSession ? isEditSession : isWorking}
              >
                Search
              </ButtonSearch>
            </>
          )}
        </StyeldButtonAndSearch>
        <MemberCardSearch
          memberDetials={memberDetialsRef}
          RankMember={RankMember}
          ImagePath={ImagePath}
        />
      </StyledFind>
    </>
  );

  async function handleFetch(e, memberID) {
    if (e !== null) e.preventDefault();
    if (!isValidMemberID(getValues("memberID")) || !isValidMemberID(memberID)) {
      toast.error(`Please enter member ID Greater than > 0`);
      return;
    }

    setIsSeearch((value) => (value = true));

    memberDetialsRef.current = await fetchMemberDetails(memberID);
    if (!memberDetialsRef.current)
      toast.error(`Member Is not found try again and enter correct ID`);
    else toast.success(`Member Is found with ID= ${memberID}`);
    isEditSession = false;
    setIsSeearch((value) => (value = false));
  }

  async function handleFetchForTest(e, memberID) {
    if (e !== null) e.preventDefault();
    if (!isValidMemberID(getValues("memberID")) || !isValidMemberID(memberID)) {
      toast.error(`Please enter member ID Greater than > 0`);
      return;
    }
    setIsSeearch((value) => (value = true));

    memberDetialsRef.current = await fetchMemberDetails(memberID);
    if (!memberDetialsRef.current) {
      toast.error(`Member Is not found try again and enter correct ID`);
      setIsSeearch((value) => (value = false));
      return;
    } else {
      toast.success(`Member Is found with ID= ${memberID}`);
    }
    const { hasPeriod, isNotPaid } = await fetchCheckMember(memberID);
    memberHasPeriodActiveRef.current = hasPeriod;
    memberNotPaidforPeriodRef.current = isNotPaid;

    setIsSeearch((value) => (value = false));
  }
}

export default FindMember;
