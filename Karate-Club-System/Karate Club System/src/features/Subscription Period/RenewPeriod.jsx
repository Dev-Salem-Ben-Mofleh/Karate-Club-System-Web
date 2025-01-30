import Form from "../../ui/Form";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import Heading from "../../ui/Heading";
import toast from "react-hot-toast";
import { useCreatePeriod } from "./useCreatePeriod";
import { useNavigate } from "react-router-dom";
import {
  fetchCheckMember,
  fetchMemberDetails,
  fetchPeriodDetails,
  formatDate2,
} from "../../utils/helpers";
import { useGetPeriodDay } from "./useGetPeriodDay";
import { addDays, differenceInDays } from "date-fns";
import { isNumber } from "../../utils/validatorUtils";
import { useAllBeltRankForMembers } from "../BeltRanks/useAllBeltRankForMembers";
import RenewFields from "./RenewFields";

function RenewPeriod() {
  useAllBeltRankForMembers();
  const { periodDays } = useGetPeriodDay();
  const { isCreating, createPeriod } = useCreatePeriod();

  const [isSearch, setIsSeearch] = useState(false);

  const navigate = useNavigate();

  const memberDetialsRef = useRef();
  const periofDetialsRef = useRef();
  const memberHasPeriodActiveRef = useRef(false);
  const memberNotPaidforPeriodRef = useRef(false);

  const { register, handleSubmit, reset, getValues, formState } = useForm();

  const { errors } = formState;
  const isWorking = isCreating;

  let isMemberActive = memberDetialsRef.current
    ? memberDetialsRef.current.isActive
    : false;
  let hasActivePeriod = memberHasPeriodActiveRef.current;
  let isNotPaid = memberNotPaidforPeriodRef.current;

  const defaultStartDate = formatDate2(new Date());

  function onSubmit(data) {
    const { fees } = data;
    const paid = true;
    const issueReason = 2;
    const isActive = true;
    const startDate = defaultStartDate;
    const endDate = addDays(new Date(), periodDays);
    const subscrpitonDays = differenceInDays(endDate, startDate);
    const periodID = 0;
    const paymentID = null;
    const memberIDForBoth = periofDetialsRef.current.memberID;
    createPeriod(
      {
        newPeriod: {
          periodID,
          paymentID,
          startDate,
          endDate,
          fees,
          memberID: memberIDForBoth,
          isActive,
          paid,
          issueReason,
          subscrpitonDays,
        },
        payment: {
          paymentID,
          amount: fees,
          date: defaultStartDate,
          memberID: memberIDForBoth,
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
    if (typeof errors.periodID !== "undefined")
      toast.error(errors.periodID.message);

    console.log(errors);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <Heading as="h2">
        {!memberDetialsRef.current
          ? "Renew New Subscription_Period"
          : `Renew New Subscription_Period With ID= ${memberDetialsRef.current.memberID}`}
      </Heading>
      <RenewFields
        register={register}
        getValues={getValues}
        errors={errors}
        handleFetch={handleFetch}
        memberDetials={memberDetialsRef.current}
        periofDetials={periofDetialsRef.current}
        isSearch={isSearch}
        isWorking={isWorking}
        isMemberActive={isMemberActive}
        hasActivePeriod={hasActivePeriod}
        isNotPaid={isNotPaid}
        navigate={navigate}
      />
    </Form>
  );

  async function handleFetch(e, periodID) {
    if (e !== null) e.preventDefault();
    if (!Number(getValues("periodID") > 0) || !isNumber(periodID)) {
      toast.error(`Please enter periodID ID Greater than > 0`);
      return;
    }

    setIsSeearch((value) => (value = true));
    periofDetialsRef.current = await fetchPeriodDetails(periodID);
    if (!periofDetialsRef.current) {
      toast.error(`period Is not found try again and enter correct ID`);
      setIsSeearch((value) => (value = false));
      return;
    } else {
      memberDetialsRef.current = await fetchMemberDetails(
        periofDetialsRef.current.memberID
      );
      toast.success(`period Is found with ID= ${periodID}`);
    }
    const { hasPeriod, isNotPaid } = await fetchCheckMember(
      periofDetialsRef.current.memberID
    );
    memberHasPeriodActiveRef.current = hasPeriod;
    memberNotPaidforPeriodRef.current = isNotPaid;

    setIsSeearch((value) => (value = false));
  }
}

export default RenewPeriod;
