import Button from "../../ui/Button";
import { formatCurrency, formatDate, handleIamge } from "../../utils/helpers";
import ImageIcone from "../../ui/ImageIcone";
import Icon from "../../ui/Icon";
import Image from "../../ui/Image";
import Text from "../../ui/Text";
import Field from "../../ui/Field";
import Card from "../../ui/Card";
import FieldImage from "../../ui/FieldImage";
import ButtonCancle from "../../ui/ButtonCancle";
import Heading from "../../ui/Heading";
import { MALE_PICTURE_URL } from "../../utils/constants";

function ShowPaymentDetails({
  PaymnetDatails,
  memberDetails,
  paymentForWhat,
  onCloseModal,
  isShowCancle = true,
}) {
  let ImagePath = "";
  if (memberDetails !== null) {
    ImagePath = handleIamge(memberDetails.image, memberDetails.gender);
  }
  return PaymnetDatails ? (
    <>
      <Heading as="h2">
        Show Test Details With ID= {`${PaymnetDatails.paymentID}`}
      </Heading>
      <Card>
        <div>
          <Field>
            <Text>Payment ID: </Text>
            <Icon>{<ImageIcone src="/id.png" />}</Icon>
            <Text>{PaymnetDatails.paymentID}</Text>
          </Field>
          <Field>
            <Text>Member Name: </Text>
            <Icon>{<ImageIcone src="/Person 32.png" />}</Icon>
            <Text>{memberDetails.name}</Text>
          </Field>
          <Field>
            <Text>Member ID: </Text>
            <Icon>{<ImageIcone src="/id.png" />}</Icon>
            <Text>{memberDetails.memberID}</Text>
          </Field>
          <Field>
            <Text>Gender: </Text>
            {memberDetails.gender === 1 ? (
              <Icon>{<ImageIcone src="/Man 32.png" />}</Icon>
            ) : (
              <Icon>{<ImageIcone src="/Woman 32.png" />}</Icon>
            )}
            <Text> {memberDetails.gender === 1 ? "Male" : "Female"} </Text>
          </Field>
          <Field>
            <Text>Payment Date: </Text>
            <Icon>{<ImageIcone src="/Calendar 32.png" />}</Icon>
            <Text> {formatDate(PaymnetDatails.date)}</Text>
          </Field>
        </div>
        <div>
          <Field>
            <Text>
              {PaymnetDatails.paymentFor === 1 ? "Period ID" : "Test ID"}{" "}
            </Text>
            <Icon>{<ImageIcone src="/id.png" />}</Icon>
            <Text>{paymentForWhat}</Text>
          </Field>
          <Field>
            <Text>Payment For: </Text>
            {PaymnetDatails.paymentFor === 1 ? (
              <Icon>{<ImageIcone src="/Subscriptions.png" />}</Icon>
            ) : (
              <Icon>{<ImageIcone src="/BeltTest.png" />}</Icon>
            )}

            <Text>
              {PaymnetDatails.paymentFor === 1
                ? "Subscription Period"
                : "Belt Test"}
            </Text>
          </Field>
          <Field>
            <Text>Amount: </Text>
            <Icon>{<ImageIcone src="/money 32.png" />}</Icon>
            <Text>{formatCurrency(PaymnetDatails.amount)}</Text>
          </Field>
          <FieldImage>
            <Image src={ImagePath} alt="Member" />
          </FieldImage>
        </div>
      </Card>
      {isShowCancle ? (
        <ButtonCancle>
          <Button
            variation="danger"
            type="reset"
            onClick={() => onCloseModal?.()}
          >
            Close
          </Button>
        </ButtonCancle>
      ) : null}
    </>
  ) : (
    <>
      <Card>
        <div>
          <Field>
            <Text>Payment ID: </Text>
            <Icon>{<ImageIcone src="/id.png" />}</Icon>
            <Text>???</Text>
          </Field>
          <Field>
            <Text>Member Name: </Text>
            <Icon>{<ImageIcone src="/Person 32.png" />}</Icon>
            <Text>???</Text>
          </Field>
          <Field>
            <Text>Member ID: </Text>
            <Icon>{<ImageIcone src="/id.png" />}</Icon>
            <Text>???</Text>
          </Field>
          <Field>
            <Text>Gender: </Text>
            <Icon>{<ImageIcone src="/Man 32.png" />}</Icon>
            <Text>???</Text>
          </Field>
          <Field>
            <Text>Payment Date: </Text>
            <Icon>{<ImageIcone src="/Calendar 32.png" />}</Icon>
            <Text>???</Text>
          </Field>
        </div>
        <div>
          <Field>
            <Text>Payment For: </Text>
            <Icon>{<ImageIcone src="/id.png" />}</Icon>
            <Text>???</Text>
          </Field>
          <Field>
            <Text>Amount: </Text>
            <Icon>{<ImageIcone src="/money 32.png" />}</Icon>
            <Text>???</Text>
          </Field>
          <FieldImage>
            <Image src={MALE_PICTURE_URL} alt="Member" />
          </FieldImage>
        </div>
      </Card>
    </>
  );
}

export default ShowPaymentDetails;
