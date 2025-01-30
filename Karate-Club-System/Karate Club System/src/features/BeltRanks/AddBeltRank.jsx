import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateAndUpdateBeltRank from "./CreateAndUpdateBeltRank";

function AddBeltRank() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="belt-form">
          <Button>Add new BeltRank</Button>
        </Modal.Open>
        <Modal.Window name="belt-form">
          <CreateAndUpdateBeltRank sendBeltRankID={0} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddBeltRank;
