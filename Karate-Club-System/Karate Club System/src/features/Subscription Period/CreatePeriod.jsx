import Form from "../../ui/Form";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import Heading from "../../ui/Heading";
import toast from "react-hot-toast";
import { useCreatePeriod } from "./useCreatePeriod";
import { useNavigate } from "react-router-dom";
import {
  fetchCheckMember,
  fetchMemberDetails,
  formatDate2,
} from "../../utils/helpers";
import { useGetPeriodDay } from "./useGetPeriodDay";
import { addDays, differenceInDays } from "date-fns";
import { isNumber } from "../../utils/validatorUtils";
import { useAllBeltRankForMembers } from "../BeltRanks/useAllBeltRankForMembers";
import PeriodFields from "./PeriodFields";
import Spinner from "../../ui/Spinner";

function CreatePeriod() {
  useAllBeltRankForMembers();
  const { isCreating, createPeriod } = useCreatePeriod();
  const { isLoading, periodDays } = useGetPeriodDay();

  const [isSearch, setIsSeearch] = useState();
  const [selectedOption, setSelectedOption] = useState("no");

  const navigate = useNavigate();

  const memberDetialsRef = useRef();
  const memberHasPeriodActiveRef = useRef(false);
  const memberNotPaidforPeriodRef = useRef(false);
  const isFetchMemberRef = useRef(false);

  const { register, handleSubmit, reset, getValues, formState } = useForm();

  useEffect(() => {
    if (isFetchMemberRef.current && getValues("memberID") > 0) {
      handleFetch(null, getValues("memberID"));
      isFetchMemberRef.current = false;
    }
  }, []);

  const { errors } = formState;
  const isWorking = isCreating;

  let isMemberActive = memberDetialsRef.current
    ? memberDetialsRef.current.isActive
    : false;
  let hasActivePeriod = memberHasPeriodActiveRef.current;
  let isNotPaid = memberNotPaidforPeriodRef.current;

  const defaultStartDate = formatDate2(new Date());
  const endDate = addDays(new Date(), periodDays || 30);
  const defaultEndDate = formatDate2(endDate);

  function onSubmit(data) {
    const { endDate, fees, memberID, periodID = 0 } = data;
    const paid = getValues("paid") === "yes" ? true : false;
    const issueReason = 1;
    const isActive = true;
    const startDate = defaultStartDate;
    const subscrpitonDays = differenceInDays(endDate, startDate);
    const paymentID = null;

    createPeriod(
      {
        newPeriod: {
          periodID,
          paymentID,
          startDate,
          endDate,
          fees,
          memberID,
          isActive,
          paid,
          issueReason,
          subscrpitonDays,
        },
        payment: {
          paymentID,
          amount: fees,
          date: defaultStartDate,
          memberID: memberID,
          paymentFor: 1,
        },
      },
      {
        onSuccess: (data) => {
          reset();
          navigate(-1);
        },
      }
    );
  }

  function onError(errors) {
    if (typeof errors.memberID !== "undefined")
      toast.error(errors.memberID.message);

    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <Heading as="h2">{"Add New Subscription_Period"}</Heading>
      <PeriodFields
        register={register}
        errors={errors}
        getValues={getValues}
        handleFetch={handleFetch}
        memberDetials={memberDetialsRef.current}
        payment={0}
        defaultStartDate={defaultStartDate}
        defaultEndDate={defaultEndDate}
        setSelectedOption={setSelectedOption}
        selectedOption={selectedOption}
        isEditSession={false}
        isWorking={isWorking}
        isSearch={isSearch}
        isMemberActive={isMemberActive}
        hasActivePeriod={hasActivePeriod}
        isNotPaid={isNotPaid}
        startDate={"No Date"}
        navigate={navigate}
      />
    </Form>
  );

  async function handleFetch(e, memberID) {
    if (e !== null) e.preventDefault();
    if (!Number(getValues("memberID") > 0) || !isNumber(memberID)) {
      toast.error(`Please enter memberID ID Greater than > 0`);
      return;
    }
    setIsSeearch((value) => (value = true));
    memberDetialsRef.current = await fetchMemberDetails(memberID);
    if (!memberDetialsRef.current) {
      toast.error(`Member Is not found try again and enter correct ID`);
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

export default CreatePeriod;
