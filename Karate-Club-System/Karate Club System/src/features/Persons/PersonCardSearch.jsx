import Field from "../../ui/Field";
import Icon from "../../ui/Icon";
import ImageIcone from "../../ui/ImageIcone";
import Text from "../../ui/Text";
import { formatDate } from "../../utils/helpers";

function PersonCardSearch({ personDetials }) {
  return Boolean(personDetials) ? (
    <div>
      <Field>
        <Text>Name: </Text>
        <Icon>{<ImageIcone src="/Person 32.png" />}</Icon>
        <Text>{personDetials.name}</Text>
      </Field>
      <Field>
        <Text>Gender: </Text>
        {personDetials.gender === 1 ? (
          <Icon>{<ImageIcone src="/Man 32.png" />}</Icon>
        ) : (
          <Icon>{<ImageIcone src="/Woman 32.png" />}</Icon>
        )}
        <Text>{personDetials.gender === 1 ? "Male" : "Female"} </Text>
      </Field>
      <Field>
        <Text>Email: </Text>
        <Icon>{<ImageIcone src="/Email 32.png" />}</Icon>
        <Text> {personDetials.email}</Text>
      </Field>
      <Field>
        <Text>Date of Birth: </Text>
        <Icon>{<ImageIcone src="/Calendar 32.png" />}</Icon>
        <Text> {formatDate(personDetials.dateOfBirth)}</Text>
      </Field>
      <Field>
        <Text>Address: </Text>
        <Icon>{<ImageIcone src="/Address 32.png" />}</Icon>
        <Text> {personDetials.address}</Text>
      </Field>
      <Field>
        <Text>Phone: </Text>
        <Icon>{<ImageIcone src="/Phone 32.png" />}</Icon>
        <Text> {personDetials.phone}</Text>
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
        <Text> ???</Text>
      </Field>
      <Field>
        <Text>Address: </Text>
        <Icon>{<ImageIcone src="/Address 32.png" />}</Icon>
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

export default PersonCardSearch;
