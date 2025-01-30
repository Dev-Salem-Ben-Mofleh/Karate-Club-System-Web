import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import FieldMainTable from "../../ui/FieldMainTable";
import ImageIcone from "../../ui/ImageIcone";
import {
  fetchMemberDetails,
  fetchPaymentDetails,
  fetchPaymentForWhat,
  formatCurrency,
} from "../../utils/helpers";
import { formatDate } from "../../utils/helpers";
import { useRef, useState } from "react";
import ShowPaymentDetails from "./ShowPaymentDetails";
import Spinner from "../../ui/Spinner";
import ShowPaymentHistory from "./ShowPaymentsHistory";

function PaymentRow({ payment }) {
  const [Fetch, setFetch] = useState(false);
  const paymentDetialsRef = useRef();
  const memberDetialsRef = useRef();
  const memberIDRef = useRef();
  const paymentForWhat = useRef();
  const { paymentID, memberName, date, amount } = payment;

  return (
    <Table.Row>
      <FieldMainTable>{paymentID}</FieldMainTable>
      <FieldMainTable>{memberName}</FieldMainTable>
      <FieldMainTable>{formatDate(date)}</FieldMainTable>
      <FieldMainTable>{formatCurrency(amount)}</FieldMainTable>

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={paymentID} />
            <Menus.List id={paymentID}>
              <Modal.Open opens="show">
                <Menus.Button
                  icon={<ImageIcone src="./PersonDetails 32.png" />}
                  onFetch={() => handleFetch(paymentID)}
                >
                  Show Payment Informations
                </Menus.Button>
              </Modal.Open>
              <Modal.Open opens="payment">
                <Menus.Button
                  icon={<ImageIcone src="./payment.png" />}
                  onFetch={() => handleFetch(paymentID)}
                >
                  Show Payment History
                </Menus.Button>
              </Modal.Open>
            </Menus.List>
            <Modal.Window name="show">
              {!Fetch ? (
                <ShowPaymentDetails
                  PaymnetDatails={paymentDetialsRef.current}
                  memberDetails={memberDetialsRef.current}
                  paymentForWhat={paymentForWhat.current}
                />
              ) : (
                <Spinner />
              )}
            </Modal.Window>
            <Modal.Window name="payment">
              {!Fetch ? (
                <ShowPaymentHistory memberID={memberIDRef.current} />
              ) : (
                <Spinner />
              )}
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );

  async function handleFetch(paymentID) {
    setFetch((value) => (value = true));
    paymentDetialsRef.current = await fetchPaymentDetails(paymentID);
    memberIDRef.current = paymentDetialsRef.current.memberID;
    memberDetialsRef.current = await fetchMemberDetails(
      paymentDetialsRef.current.memberID
    );
    paymentForWhat.current = await fetchPaymentForWhat(
      paymentID,
      paymentDetialsRef.current.paymentFor
    );
    setFetch((value) => (value = false));
  }
}

export default PaymentRow;
