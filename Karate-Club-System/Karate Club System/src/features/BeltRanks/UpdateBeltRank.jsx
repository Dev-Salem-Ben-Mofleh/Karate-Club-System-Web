import Form from "../../ui/Form";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Heading from "../../ui/Heading";
import { useUpdateBeltRank } from "./useUpdateBeltRank";
import BeltRankFeilds from "./BeltRankFeilds";

function UpdateBeltRank({ beltRankToEdit = {}, onCloseModal }) {
  const { isUpdating, updatBeltRank } = useUpdateBeltRank();

  const { register, handleSubmit, reset, getValues, formState, setValue } =
    useForm();

  useEffect(() => {
    uploadBeltRankDataforUpdate();
  }, []);

  const { errors } = formState;
  const isWorking = isUpdating;

  function onSubmit(data) {
    const { rankID = beltRankToEdit.rankID, rankName, testFees } = data;

    updatBeltRank(
      {
        updateBeltRank: {
          rankID,
          rankName,
          testFees,
        },
      },
      {
        onSuccess: (data) => {
          reset();
          onCloseModal?.();
        },
      }
    );
  }

  function onError(errors) {
    console.log(errors);
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <Heading as="h2">{`Update Belt_Rank With ID= ${beltRankToEdit.rankID}`}</Heading>
      <BeltRankFeilds
        errors={errors}
        isWorking={isWorking}
        register={register}
        getValues={getValues}
        onCloseModal={onCloseModal}
      />
    </Form>
  );

  function uploadBeltRankDataforUpdate() {
    const { rankName, testFees } = beltRankToEdit;

    setValue("rankName", rankName);
    setValue("testFees", testFees);
  }
}

export default UpdateBeltRank;
