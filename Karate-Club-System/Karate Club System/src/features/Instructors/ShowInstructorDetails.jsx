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

function ShowInstructorDetails({
  instructorDetails,
  onCloseModal,
  isShowCancle = true,
}) {
  let ImagePath = "";

  if (instructorDetails !== null) {
    ImagePath = handleIamge(instructorDetails.image, instructorDetails.gender);
  }
  return instructorDetails ? (
    <>
      <Heading as="h2">
        Show Instructor Details With ID= {`${instructorDetails.instructorID}`}
      </Heading>
      <Card>
        <div>
          <Field>
            <Text>Instructor ID: </Text>
            <Icon>{<ImageIcone src="./id.png" />}</Icon>
            <Text>{instructorDetails.instructorID}</Text>
          </Field>
          <PersonDetails personDetails={instructorDetails} />
        </div>
        <div>
          <Field>
            <Text>Qualification: </Text>
            <Icon>{<ImageIcone src="./qualification.png" />}</Icon>
            <Text>
              {instructorDetails.qualification
                ? instructorDetails.qualification
                : "no qualification"}
            </Text>
          </Field>
          <ImageField ImagePath={ImagePath} TypeName={"Instructor"} />
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
            <Text>Instructor ID: </Text>
            <Icon>{<ImageIcone src="./id.png" />}</Icon>
            <Text>???</Text>
          </Field>
          <PersonDetails personDetails={instructorDetails} />
        </div>
        <div>
          <Field>
            <Text>Qualification: </Text>
            <Icon>{<ImageIcone src="./qualification.png" />}</Icon>
            <Text>???</Text>
          </Field>
          <ImageField ImagePath={MALE_PICTURE_URL} TypeName={"Instructor"} />
        </div>
      </Card>
    </>
  );
}

export default ShowInstructorDetails;
