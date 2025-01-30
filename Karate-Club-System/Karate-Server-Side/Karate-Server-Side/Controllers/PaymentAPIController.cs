using clsKarateBussinse;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static clsKarateDataAccesse.clsDataBeltRanks;
using static clsKarateDataAccesse.clsDataMembers;
using static clsKarateDataAccesse.clsDataPayments;

namespace Karate_Server_Side.Controllers
{
    [Route("api/KarateAPI/Payments")]
    [ApiController]
    public class PaymentAPIController : ControllerBase
    {
        [HttpGet("AllPayments", Name = "GetAllPayments")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<IEnumerable<ViewPaymentDTO>> GetAllPayments()
        {
            List<ViewPaymentDTO> Payments = clsPayments.GetAllRows();

            if (Payments == null || Payments.Count == 0)
            {
                return NotFound("No Payments Found!");
            }

            return Ok(Payments);
        }


        [HttpGet("AllPayments/{PageNumber}/{RowsPerPage}", Name = "GetAllPaymentsRowsPerPage")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<IEnumerable<ViewPaymentDTO>> AllPayments(int PageNumber, int RowsPerPage)
        {
            List<ViewPaymentDTO> Payments = clsPayments.GetAllRows(PageNumber, RowsPerPage);

            if (Payments == null || Payments.Count == 0)
            {
                return NotFound("No Payments Found!");
            }

            return Ok(Payments);
        }


        [HttpGet("SearchPayments/{Culomn}/{ValueSearch}", Name = "GetAllPaymentsRowsForSearch")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<IEnumerable<ViewPaymentDTO>> AllPayments(string Culomn, string ValueSearch)
        {
            List<ViewPaymentDTO> Payments = clsPayments.GetAllRows(Culomn, ValueSearch);

            if (Payments == null || Payments.Count == 0)
            {
                return NotFound("No Payments Found!");
            }

            return Ok(Payments);
        }


        [HttpGet("AllPaymnetsBy/{MemberID}/{PageNumber}/{RowsPerPage}", Name = "GetAllPaymentsByMemberID")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<IEnumerable<ViewPaymentDTO>> GetAllPayments(int MemberID, int PageNumber, int RowsPerPage)
        {
            if (MemberID < 1)
            {
                return BadRequest($"Not accepted ID {MemberID}");
            }
            List<ViewPaymentDTO> Payment = clsPayments.GetAllRows(MemberID, PageNumber, RowsPerPage);

            if (Payment == null || Payment.Count == 0)
            {
                return NotFound("No Payments Found!");
            }

            return Ok(Payment);
        }

        [HttpGet("GetPayment/{PaymentID}", Name = "GetPaymentById")]

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<PaymentDTO> GetPaymentById(int PaymentID)
        {

            if (PaymentID < 1)
            {
                return BadRequest($"Not accepted ID {PaymentID}");
            }

            clsPayments Payment = clsPayments.FindByPaymentID(PaymentID);

            if (Payment == null)
            {
                return NotFound($"BeltRank with ID {PaymentID} not found.");
            }

            PaymentDTO PDTO = Payment.PDTO;

            return Ok(PDTO);

        }

        [HttpGet("GetPaymentPayForWhat/{PaymentID}/{choose}", Name = "GetPaymentPayForWhat")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<int> GetPaymentPayForWhat(int PaymentID, byte choose)
        {
            if (PaymentID < 1 || choose < 1)
            {
                return BadRequest($"Not accepted");
            }
            int Payments = clsPayments.GetPaymentPayForWhat(PaymentID, choose);

            if (Payments <= 0)
            {
                return NotFound("No Payments");
            }

            return Ok(Payments);


        }

        [HttpPost("AddPayment", Name = "AddPayment")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<PaymentDTO> AddPayment(PaymentDTO newPaymentDTO)
        {
            //we validate the data here
            if (newPaymentDTO == null)
            {
                return BadRequest("Invalid Payment data.");
            }

            clsPayments Payment = new clsPayments(new PaymentDTO(newPaymentDTO.PaymentID, newPaymentDTO.Amount,
                newPaymentDTO.Date,newPaymentDTO.MemberID,newPaymentDTO.PaymentFor));

            if (Payment.Save())

            {
                newPaymentDTO.PaymentID = Payment.PaymentID;

                return CreatedAtRoute("GetPaymentById", new { PaymentID = newPaymentDTO.PaymentID }, newPaymentDTO);
            }
            else
            {
                return StatusCode(500, new { message = "Error adding Payment" });

            }
        }

        [HttpPut("UpdatePayment/{PaymentID}", Name = "UpdatePayment")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<PaymentDTO> UpdatePayment(int PaymentID, PaymentDTO updatedPaymentDTO)
        {
            if (updatedPaymentDTO == null || PaymentID < 1)
            {
                return BadRequest("Invalid member data.");
            }


            clsPayments payments = clsPayments.FindByPaymentID(PaymentID);


            if (payments == null)
            {
                return NotFound($"User with ID {PaymentID} not found.");
            }

            payments.Amount = updatedPaymentDTO.Amount;
            payments.Date = updatedPaymentDTO.Date;
            payments.MemberID = updatedPaymentDTO.MemberID;
            payments.PaymentFor = updatedPaymentDTO.PaymentFor;


            if (payments.Save())
            {
                return Ok(payments.PDTO);
            }
            else
            {
                return StatusCode(500, new { message = "Error updating Payment" });
            }


        }

        [HttpDelete("DeletePayment/{PaymentID}", Name = "DeletePayment")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult DeletePayment(int PaymentID)
        {
            if (PaymentID < 1)
            {
                return BadRequest($"Not accepted ID {PaymentID}");
            }


            if (clsPayments.DeleteRow(PaymentID))

                return Ok($"Payment with ID {PaymentID} has been deleted.");
            else
                return NotFound($"Payment with ID {PaymentID} not found. no rows deleted!");
        }

        [HttpGet("exists/{PaymentID}", Name = "ExistsPaymentByPaymentId")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<bool> ExistsPaymentByPaymentId(int PaymentID)
        {
            if (PaymentID < 1)
            {
                return BadRequest($"Not accepted ID {PaymentID}");
            }

            if (clsPayments.DoesRowExist(PaymentID))
            {
                return Ok(true);
            }
            else
            {
                return NotFound(false);
            }
        }

        [HttpGet("Count/Payments", Name = "CountPayments")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<int> CountPayments()
        {
            int Payments = clsPayments.CountPayments();

            if (Payments <= 0)
            {
                return NotFound("No Payments");
            }

            return Ok(Payments);


        }

        [HttpGet("CountPayments/{MemberID}", Name = "CountPaymentsForMember")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<int> CountPayments(int MemberID)
        {
            int Payments = clsPayments.CountPaymentsForMember(MemberID);

            if (Payments <= 0)
            {
                return NotFound("No Payments");
            }

            return Ok(Payments);


        }




    }
}
