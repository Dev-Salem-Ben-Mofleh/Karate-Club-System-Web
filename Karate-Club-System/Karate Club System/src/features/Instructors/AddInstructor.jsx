import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateInstructor from "./CreateInstructor";

function AddInstructor() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="instructor-form">
          <Button>Add new instructor</Button>
        </Modal.Open>
        <Modal.Window name="instructor-form">
          <CreateInstructor />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddInstructor;
