import FieldImage from "../../ui/FieldImage";
import Image from "../../ui/Image";

function ImageField({ ImagePath, TypeName }) {
  return (
    <div>
      <FieldImage>
        <Image src={ImagePath} alt={`${TypeName}`} />
      </FieldImage>
    </div>
  );
}

export default ImageField;
