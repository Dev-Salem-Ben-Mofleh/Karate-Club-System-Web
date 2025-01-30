import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import FieldMainTable from "../../ui/FieldMainTable";
import ImageIcone from "../../ui/ImageIcone";
import { formatCurrency } from "../../utils/helpers";
import UpdateBeltRank from "./UpdateBeltRank";

function BeltRankRow({ beltRank }) {
  const { rankID, rankName, testFees } = beltRank;

  return (
    <Table.Row>
      <FieldMainTable>{rankID}</FieldMainTable>
      <FieldMainTable>{rankName}</FieldMainTable>
      <FieldMainTable>{formatCurrency(testFees)}</FieldMainTable>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={rankID} />
            <Menus.List id={rankID}>
              <Modal.Open opens="update">
                <Menus.Button icon={<ImageIcone src="./edit 32.png" />}>
                  Update Belt_Rank
                </Menus.Button>
              </Modal.Open>
            </Menus.List>
            <Modal.Window name="update">
              <UpdateBeltRank beltRankToEdit={beltRank} />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}
export default BeltRankRow;
