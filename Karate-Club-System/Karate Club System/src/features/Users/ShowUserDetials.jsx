import Button from "../../ui/Button";
import { handleIamge } from "../../utils/helpers";
import ImageIcone from "../../ui/ImageIcone";
import Icon from "../../ui/Icon";
import Text from "../../ui/Text";
import Field from "../../ui/Field";
import Card from "../../ui/Card";
import ButtonCancle from "../../ui/ButtonCancle";
import Heading from "../../ui/Heading";
import { MALE_PICTURE_URL } from "../../utils/constants";
import PersonDetails from "../Persons/PersonDetails";
import ImageField from "../Persons/ImageField";

function ShowUserDetials({ userDetails, onCloseModal, isShowCancle = true }) {
  let ImagePath = "";

  if (userDetails !== null) {
    ImagePath = handleIamge(userDetails.image, userDetails.gender);
  }

  return userDetails ? (
    <>
      <Heading as="h2">
        Show User Details With ID= {`${userDetails.userID}`}
      </Heading>
      <Card>
        <div>
          <Field>
            <Text>User ID: </Text>
            <Icon>{<ImageIcone src="./id.png" />}</Icon>
            <Text>{userDetails.userID}</Text>
          </Field>
          <PersonDetails personDetails={userDetails} />
        </div>
        <div>
          <Field>
            <Text>User Name: </Text>
            <Icon>{<ImageIcone src="./Person 32.png" />}</Icon>
            <Text>{userDetails.userName}</Text>
          </Field>
          <Field>
            <Text>Active: </Text>
            <Icon>
              {userDetails.isActive ? (
                <Icon>{<ImageIcone src="./active-user.png" />}</Icon>
              ) : (
                <Icon>{<ImageIcone src="./inactive-user.png" />}</Icon>
              )}
            </Icon>
            <Text> {userDetails.isActive ? "Active" : "Not-Active"}</Text>
          </Field>
          <ImageField ImagePath={ImagePath} TypeName={"User"} />
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
            <Text>Member ID: </Text>
            <Icon>{<ImageIcone src="./id.png" />}</Icon>
            <Text>???</Text>
          </Field>
          <PersonDetails personDetails={userDetails} />
        </div>
        <div>
          <Field>
            <Text>User Name: </Text>
            <Icon>{<ImageIcone src="./Person 32.png" />}</Icon>
            <Text>???</Text>
          </Field>
          <Field>
            <Text>Active: </Text>
            <Icon>
              <Icon>{<ImageIcone src="./Question 32.png" />}</Icon>
            </Icon>
            <Text>???</Text>
          </Field>
          <ImageField ImagePath={MALE_PICTURE_URL} TypeName={"User"} />
        </div>
      </Card>
    </>
  );
}

export default ShowUserDetials;
