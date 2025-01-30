using clsKarateBussinse;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static clsKarateDataAccesse.clsDataBeltTests;
using static clsKarateDataAccesse.clsDataMembers;
using static clsKarateDataAccesse.clsDataSubscriptionPeriods;

namespace Karate_Server_Side.Controllers
{
    [Route("api/KarateAPI/SubscriptionPeriod")]
    [ApiController]
    public class SubscriptionPeriodAPIController : ControllerBase
    {
        [HttpGet("AllSubscriptionPeriods", Name = "GetAllSubscriptionPeriods")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<IEnumerable<ViewSubscriptionPeriodDTO>> GetAllSubscriptionPeriods()
        {
            List<ViewSubscriptionPeriodDTO> SubscriptionPeriod = clsSubscriptionPeriods.GetAllRows();

            if (SubscriptionPeriod == null || SubscriptionPeriod.Count == 0)
            {
                return NotFound("No SubscriptionPeriods Found!");
            }

            return Ok(SubscriptionPeriod);
        }
        [HttpGet("AllSubscriptionPeriods/{PageNumber}/{RowsPerPage}/{filter}", Name = "GetAllSubscriptionPeriodsRowsPerPage")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<IEnumerable<ViewSubscriptionPeriodDTO>> AllSubscriptionPeriods(int PageNumber, int RowsPerPage, string filter)
        {
            List<ViewSubscriptionPeriodDTO> SubscriptionPeriod = clsSubscriptionPeriods.GetAllRows(PageNumber, RowsPerPage, filter);

            if (SubscriptionPeriod == null || SubscriptionPeriod.Count == 0)
            {
                return NotFound("No SubscriptionPeriod Found!");
            }

            return Ok(SubscriptionPeriod);
        }


        [HttpGet("AllSubscriptionPeriods/{Culomn}/{ValueSearch}", Name = "GetAllSubscriptionPeriodsRowsForSearch")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<IEnumerable<ViewSubscriptionPeriodDTO>> AllSubscriptionPeriods(string Culomn, string ValueSearch)
        {
            List<ViewSubscriptionPeriodDTO> SubscriptionPeriod = clsSubscriptionPeriods.GetAllRows(Culomn, ValueSearch);

            if (SubscriptionPeriod == null || SubscriptionPeriod.Count == 0)
            {
                return NotFound("No SubscriptionPeriod Found!");
            }

            return Ok(SubscriptionPeriod);
        }



        [HttpGet("AllSubscriptionPeriodsBy/{MemberID}/{PageNumber}/{RowsPerPage}", Name = "GetAllSubscriptionPeriodsMemberID")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<IEnumerable<ViewSubscriptionPeriodDTO>> GetAllSubscriptionPeriodsMemberID(int MemberID,int PageNumber, int RowsPerPage)
        {
            if (MemberID < 1)
            {
                return BadRequest($"Not accepted ID {MemberID}");
            }
            List<ViewSubscriptionPeriodDTO> SubscriptionPeriod = clsSubscriptionPeriods.GetAllRows(MemberID, PageNumber, RowsPerPage);

            if (SubscriptionPeriod == null || SubscriptionPeriod.Count == 0)
            {
                return NotFound("No SubscriptionPeriod Found!");
            }

            return Ok(SubscriptionPeriod);
        }


        [HttpGet("GetSubscriptionPeriodsAfterDate/{ToDate}", Name = "GetSubscriptionPeriodsAfterDate")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<IEnumerable<ViewSubscriptionPeriodDTO>> GetSubscriptionPeriodsAfterDate(DateTime ToDate)
        {
            
            List<ViewSubscriptionPeriodDTO> SubscriptionPeriod = clsSubscriptionPeriods.GetSubscriptionPeriodsAfterDate(ToDate);

            if (SubscriptionPeriod == null || SubscriptionPeriod.Count == 0)
            {
                return NotFound("No SubscriptionPeriod Found!");
            }

            return Ok(SubscriptionPeriod);
        }

        [HttpGet("GetSubscriptionPeriodsAfterDateAndActive/{ToDate}", Name = "GetSubscriptionPeriodsAfterDateAndActive")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<IEnumerable<ViewSubscriptionPeriodDTO>> GetSubscriptionPeriodsAfterDateAndActive(DateTime ToDate)
        {

            List<ViewSubscriptionPeriodDTO> SubscriptionPeriod = clsSubscriptionPeriods.GetSubscriptionPeriodsAfterDateAndActive(ToDate);

            if (SubscriptionPeriod == null || SubscriptionPeriod.Count == 0)
            {
                return NotFound("No SubscriptionPeriod Found!");
            }

            return Ok(SubscriptionPeriod);
        }

        [HttpGet("GetSubscriptionPeriod/{PeriodID}", Name = "GetSubscriptionPeriodById")]

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<SubscriptionPeriodDTO> GetSubscriptionPeriodById(int PeriodID)
        {

            if (PeriodID < 1)
            {
                return BadRequest($"Not accepted ID {PeriodID}");
            }

            clsSubscriptionPeriods SubscriptionPeriod = clsSubscriptionPeriods.FindByPeriodID(PeriodID);

            if (SubscriptionPeriod == null)
            {
                return NotFound($"SubscriptionPeriod with ID {PeriodID} not found.");
            }

            SubscriptionPeriodDTO SDTO = SubscriptionPeriod.SDTO;

            return Ok(SDTO);

        }


        [HttpPost("AddSubscriptionPeriod", Name = "AddSubscriptionPeriod")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<SubscriptionPeriodDTO> AddSubscriptionPeriod(SubscriptionPeriodDTO newSubscriptionPeriodDTO)
        {
            //we validate the data here
            if (newSubscriptionPeriodDTO == null)
            {
                return BadRequest("Invalid SubscriptionPeriod data.");
            }


            clsSubscriptionPeriods SubscriptionPeriod = new clsSubscriptionPeriods(new SubscriptionPeriodDTO
                (newSubscriptionPeriodDTO.PeriodID, newSubscriptionPeriodDTO.StartDate,
                newSubscriptionPeriodDTO.EndDate, newSubscriptionPeriodDTO.Fees, newSubscriptionPeriodDTO.Paid,
                newSubscriptionPeriodDTO.MemberID
                , newSubscriptionPeriodDTO.PaymentID, newSubscriptionPeriodDTO.issueReason, newSubscriptionPeriodDTO.subscrpitonDays
                , newSubscriptionPeriodDTO.IsActive));


            if (SubscriptionPeriod.Save())

            {
                newSubscriptionPeriodDTO.PeriodID = SubscriptionPeriod.PeriodID;

                return CreatedAtRoute("GetSubscriptionPeriodById", new { PeriodID = newSubscriptionPeriodDTO.PeriodID }, newSubscriptionPeriodDTO);
            }
            else
            {
                return StatusCode(500, new { message = "Error adding SubscriptionPeriod" });

            }



        }

        [HttpPut("UpdateSubscriptionPeriod/{SubscriptionPeriodID}", Name = "UpdateSubscriptionPeriod")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<SubscriptionPeriodDTO> UpdateSubscriptionPeriod(int SubscriptionPeriodID, SubscriptionPeriodDTO updatedSubscriptionPeriodDTO)
        {
            if (updatedSubscriptionPeriodDTO == null || SubscriptionPeriodID < 1)
            {
                return BadRequest("Invalid SubscriptionPeriod data.");
            }


            clsSubscriptionPeriods SubscriptionPeriod = clsSubscriptionPeriods.FindByPeriodID(SubscriptionPeriodID);


            if (SubscriptionPeriod == null)
            {
                return NotFound($"SubscriptionPeriod with ID {SubscriptionPeriodID} not found.");
            }

            SubscriptionPeriod.StartDate = updatedSubscriptionPeriodDTO.StartDate;
            SubscriptionPeriod.EndDate = updatedSubscriptionPeriodDTO.EndDate;
            SubscriptionPeriod.Fees = updatedSubscriptionPeriodDTO.Fees;
            SubscriptionPeriod.Paid = updatedSubscriptionPeriodDTO.Paid;
            SubscriptionPeriod.MemberID = updatedSubscriptionPeriodDTO.MemberID;
            SubscriptionPeriod.PaymentID = updatedSubscriptionPeriodDTO.PaymentID;
            SubscriptionPeriod.issueReason = updatedSubscriptionPeriodDTO.issueReason;
            SubscriptionPeriod.subscrpitonDays = updatedSubscriptionPeriodDTO.subscrpitonDays;



            if (SubscriptionPeriod.Save())
            {
                return Ok(SubscriptionPeriod.SDTO);
            }
            else
            {
                return StatusCode(500, new { message = "Error updating SubscriptionPeriod" });
            }


        }

        [HttpDelete("DeleteSubscriptionPeriod/{SubscriptionPeriodID}", Name = "DeleteSubscriptionPeriod")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult DeleteSubscriptionPeriod(int SubscriptionPeriodID)
        {
            if (SubscriptionPeriodID < 1)
            {
                return BadRequest($"Not accepted ID {SubscriptionPeriodID}");
            }


            if (clsSubscriptionPeriods.DeleteRow(SubscriptionPeriodID))

                return Ok($"SubscriptionPeriod with ID {SubscriptionPeriodID} has been deleted.");
            else
                return NotFound($"SubscriptionPeriod with ID {SubscriptionPeriodID} not found. no rows deleted!");
        }

        [HttpGet("exists/{SubscriptionPeriodID}", Name = "ExistsSubscriptionPeriodBySubscriptionPeriodId")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<bool> ExistsSubscriptionPeriodBySubscriptionPeriodId(int SubscriptionPeriodID)
        {
            if (SubscriptionPeriodID < 1)
            {
                return BadRequest($"Not accepted ID {SubscriptionPeriodID}");
            }

            if (clsSubscriptionPeriods.DoesRowExist(SubscriptionPeriodID))
            {
                return Ok(true);
            }
            else
            {
                return Ok(false);
            }
        }

        [HttpGet("CheckSubscriptionsIsNotPaid/{MemberID}", Name = "CheckSubscriptionsIsNotPaid")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<bool> CheckSubscriptionsIsNotPaid(int MemberID)
        {
            if (MemberID < 1)
            {
                return BadRequest($"Not accepted ID {MemberID}");
            }

            if (clsSubscriptionPeriods.CheckSubscriptionsIsNotPaid(MemberID))
            {
                return Ok(true);
            }
            else
            {
                return Ok(false);
            }
        }

        [HttpGet("CheckMemberHasPeriod/{MemberID}", Name = "CheckMemberHasPeriod")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<bool> CheckMemberHasPeriod(int MemberID)
        {
            if (MemberID < 1)
            {
                return BadRequest($"Not accepted ID {MemberID}");
            }

            if (clsSubscriptionPeriods.CheckMemberHasPeriod(MemberID))
            {
                return Ok(true);
            }
            else
            {
                return Ok(false);
            }
        }


        [HttpGet("CheckIsActiveAndIsPaid/{MemberID}", Name = "CheckIsActiveAndIsPaid")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<bool> CheckIsActiveAndIsPaid(int MemberID)
        {
            if (MemberID < 1)
            {
                return BadRequest($"Not accepted ID {MemberID}");
            }

            if (clsSubscriptionPeriods.CheckIsActiveAndIsPaid(MemberID))
            {
                return Ok(true);
            }
            else
            {
                return Ok(false);
            }
        }

        [HttpGet("CheckForDeletePeriod/{SubscriptionPeriodID}", Name = "CheckForDeletePeriod")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<bool> CheckForDeletePeriod(int SubscriptionPeriodID)
        {
            if (SubscriptionPeriodID < 1)
            {
                return BadRequest($"Not accepted ID {SubscriptionPeriodID}");
            }

            if (clsSubscriptionPeriods.CheckForDeletePeriod(SubscriptionPeriodID))
            {
                return Ok(true);
            }
            else
            {
                return Ok(false);
            }
        }


        [HttpGet("CheckForPayPeriod/{SubscriptionPeriodID}", Name = "CheckForPayPeriod")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<bool> CheckForPayPeriod(int SubscriptionPeriodID)
        {
            if (SubscriptionPeriodID < 1)
            {
                return BadRequest($"Not accepted ID {SubscriptionPeriodID}");
            }

            if (clsSubscriptionPeriods.CheckForPayPeriod(SubscriptionPeriodID))
            {
                return Ok(true);
            }
            else
            {
                return Ok(false);
            }
        }

        [HttpGet("CheckForRenewPeriod/{SubscriptionPeriodID}", Name = "CheckForRenewPeriod")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<bool> CheckForRenewPeriod(int SubscriptionPeriodID)
        {
            if (SubscriptionPeriodID < 1)
            {
                return BadRequest($"Not accepted ID {SubscriptionPeriodID}");
            }

            if (clsSubscriptionPeriods.CheckForRenewPeriod(SubscriptionPeriodID))
            {
                return Ok(true);
            }
            else
            {
                return Ok(false);
            }
        }

        [HttpGet("Count/SubscriptionPeriods/{filter}", Name = "CountSubscriptionPeriods")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<int> CountSubscriptionPeriods(string filter)
        {
            int SubscriptionPeriods = clsSubscriptionPeriods.CountSubscriptionPeriods(filter);

            if (SubscriptionPeriods <= 0)
            {
                return NotFound("No SubscriptionPeriod");
            }

            return Ok(SubscriptionPeriods);


        }
        [HttpGet("CountSubscriptionPeriodsForMember/{MemberID}", Name = "CountSubscriptionPeriodsForMember")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<int> CountSubscriptionPeriodsForMember(int MemberID)
        {
            int SubscriptionPeriods = clsSubscriptionPeriods.CountSubscriptionPeriodsForMember(MemberID);

            if (SubscriptionPeriods <= 0)
            {
                return NotFound("No SubscriptionPeriod");
            }

            return Ok(SubscriptionPeriods);


        }



    }

}
