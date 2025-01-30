import { formatDate } from "../../utils/helpers";
import ImageIcone from "../../ui/ImageIcone";
import Icon from "../../ui/Icon";
import Text from "../../ui/Text";
import Field from "../../ui/Field";

function PersonDetails({ personDetails }) {
  console.log(personDetails);
  return personDetails ? (
    <div>
      <Field>
        <Text>Name: </Text>
        <Icon>{<ImageIcone src="/Person 32.png" />}</Icon>
        <Text>{personDetails.name}</Text>
      </Field>
      <Field>
        <Text>Gender: </Text>
        {personDetails.gender === 1 ? (
          <Icon>{<ImageIcone src="/Man 32.png" />}</Icon>
        ) : (
          <Icon>{<ImageIcone src="/Woman 32.png" />}</Icon>
        )}
        <Text> {personDetails.gender === 1 ? "Male" : "Female"} </Text>
      </Field>
      <Field>
        <Text>Email: </Text>
        <Icon>{<ImageIcone src="/Email 32.png" />}</Icon>
        <Text> {personDetails.email}</Text>
      </Field>
      <Field>
        <Text>Date of Birth: </Text>
        <Icon>{<ImageIcone src="/Calendar 32.png" />}</Icon>
        <Text> {formatDate(personDetails.dateOfBirth)}</Text>
      </Field>
      <Field>
        <Text>Address: </Text>
        <Icon>{<ImageIcone src="/Address 32.png" />}</Icon>
        <Text> {personDetails.address}</Text>
      </Field>
      <Field>
        <Text>Phone: </Text>
        <Icon>{<ImageIcone src="/Phone 32.png" />}</Icon>
        <Text> {personDetails.phone}</Text>
      </Field>
    </div>
  ) : (
    <div>
      <Field>
        <Text>Name: </Text>
        <Icon>{<ImageIcone src="/Person 32.png" />}</Icon>
        <Text>???</Text>
      </Field>
      <Field>
        <Text>Gender: </Text>
        <Icon>{<ImageIcone src="/Man 32.png" />}</Icon>
        <Text>???</Text>
      </Field>
      <Field>
        <Text>Email: </Text>
        <Icon>{<ImageIcone src="/Email 32.png" />}</Icon>
        <Text>???</Text>
      </Field>
      <Field>
        <Text>Date of Birth: </Text>
        <Icon>{<ImageIcone src="/Calendar 32.png" />}</Icon>
        <Text>???</Text>
      </Field>
      <Field>
        <Text>Address: </Text>
        <Icon>{<ImageIcone src="/Address 32.png" />}</Icon>
        <Text>???</Text>
      </Field>
      <Field>
        <Text>Last Belt Rank </Text>
        <Icon>{<ImageIcone src="/belt.png" />}</Icon>
        <Text>???</Text>
      </Field>
      <Field>
        <Text>Phone: </Text>
        <Icon>{<ImageIcone src="/Phone 32.png" />}</Icon>
        <Text>???</Text>
      </Field>
    </div>
  );
}

export default PersonDetails;
