using clsKarateBussinse;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static clsKarateDataAccesse.clsDataBeltTests;
using static clsKarateDataAccesse.clsDataMembers;
using static clsKarateDataAccesse.clsDataSubscriptionPeriods;
using static clsKarateDataAccesse.clsDataUsers;

namespace Karate_Server_Side.Controllers
{
    [Route("api/KarateAPI/BeltTest")]
    [ApiController]
    public class BeltTestAPIController : ControllerBase
    {
        [HttpGet("AllBeltTests", Name = "GetAllBeltTests")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<IEnumerable<ViewBeltTestDTO>> GetAllBeltTests()
        {
            List<ViewBeltTestDTO> BeltTests = clsBeltTests.GetAllRows();

            if (BeltTests == null || BeltTests.Count == 0)
            {
                return NotFound("No BeltTests Found!");
            }

            return Ok(BeltTests);
        }

        [HttpGet("GetBeltTestAfterDate/{ToDate}", Name = "GetBeltTestAfterDate")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<IEnumerable<ViewBeltTestDTO>> GetBeltTestAfterDate(DateTime ToDate)
        {

            List<ViewBeltTestDTO> BeltTests = clsBeltTests.GeBeltTestsAfterDate(ToDate);

            if (BeltTests == null || BeltTests.Count == 0)
            {
                return NotFound("No BeltTest Found!");
            }

            return Ok(BeltTests);
        }


        [HttpGet("AllBeltTests/{PageNumber}/{RowsPerPage}", Name = "GetAllBeltTestsRowsPerPage")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<IEnumerable<ViewBeltTestDTO>> AllBeltTests(int PageNumber, int RowsPerPage)
        {
            List<ViewBeltTestDTO> BeltTests = clsBeltTests.GetAllRows(PageNumber, RowsPerPage);

            if (BeltTests == null || BeltTests.Count == 0)
            {
                return NotFound("No BeltTests Found!");
            }

            return Ok(BeltTests);
        }


        [HttpGet("SearchBeltTests/{Culomn}/{ValueSearch}", Name = "GetAllBeltTestsRowsForSearch")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<IEnumerable<ViewBeltTestDTO>> AllBeltTests(string Culomn, string ValueSearch)
        {
            List<ViewBeltTestDTO> BeltTests = clsBeltTests.GetAllRows(Culomn, ValueSearch);

            if (BeltTests == null || BeltTests.Count == 0)
            {
                return NotFound("No BeltTests Found!");
            }

            return Ok(BeltTests);
        }



        [HttpGet("AllBeltTestsBy/{MemberID}/{PageNumber}/{RowsPerPage}", Name = "GetAllBeltTestsByMemberID")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<IEnumerable<ViewBeltTestDTO>> GetAllBeltTestsByMemberID(int MemberID, int PageNumber, int RowsPerPage)
        {
            if (MemberID < 1)
            {
                return BadRequest($"Not accepted ID {MemberID}");
            }
            List<ViewBeltTestDTO> beltTests = clsBeltTests.GetAllRows(MemberID, PageNumber, RowsPerPage);

            if (beltTests == null || beltTests.Count == 0)
            {
                return NotFound("No beltTests Found!");
            }

            return Ok(beltTests);
        }

        [HttpGet("GetBeltTest/{TestID}", Name = "GetBeltTestById")]

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<BeltTestDTO> GetBeltTestById(int TestID)
        {

            if (TestID < 1)
            {
                return BadRequest($"Not accepted ID {TestID}");
            }

            clsBeltTests beltTests = clsBeltTests.FindByTestID(TestID);

            if (beltTests == null)
            {
                return NotFound($"BeltTest with ID {TestID} not found.");
            }

            BeltTestDTO BDTO = beltTests.BDTO;

            return Ok(BDTO);

        }


        [HttpPost("AddBeltTest", Name = "AddBeltTest")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<BeltTestDTO> AddBeltTest(BeltTestDTO newBeltTestDTO)
        {
            //we validate the data here
            if (newBeltTestDTO == null)
            {
                return BadRequest("Invalid beltTests data.");
            }


            clsBeltTests beltTests = new clsBeltTests(new BeltTestDTO(newBeltTestDTO.TestID, newBeltTestDTO.MemberID,
                newBeltTestDTO.RankID, newBeltTestDTO.Result,newBeltTestDTO.Date,newBeltTestDTO.TestedByInstructorID
                ,newBeltTestDTO.PaymentID));


            if (beltTests.Save())

            {
                newBeltTestDTO.TestID = beltTests.TestID;

                return CreatedAtRoute("GetBeltTestById", new { TestID = newBeltTestDTO.TestID }, newBeltTestDTO);
            }
            else
            {
                return StatusCode(500, new { message = "Error adding beltTests" });

            }



        }

        [HttpPut("UpdateBeltTest/{TestID}", Name = "UpdateBeltTest")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<BeltTestDTO> UpdateMember(int TestID, BeltTestDTO updatedBeltTestDTO)
        {
            if (updatedBeltTestDTO == null || TestID < 1)
            {
                return BadRequest("Invalid beltTest data.");
            }


            clsBeltTests beltTests = clsBeltTests.FindByTestID(TestID);


            if (beltTests == null)
            {
                return NotFound($"beltTest with ID {TestID} not found.");
            }


            beltTests.MemberID = updatedBeltTestDTO.MemberID;
            beltTests.RankID = updatedBeltTestDTO.RankID;
            beltTests.Result = updatedBeltTestDTO.Result;
            beltTests.Date = updatedBeltTestDTO.Date;
            beltTests.TestedByInstructorID = updatedBeltTestDTO.TestedByInstructorID;
            beltTests.PaymentID = updatedBeltTestDTO.PaymentID;



            if (beltTests.Save())
            {
                return Ok(beltTests.BDTO);
            }
            else
            {
                return StatusCode(500, new { message = "Error updating beltTest" });
            }


        }

        [HttpDelete("DeleteBeltTest/{TestID}", Name = "DeleteBeltTest")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
      
        public ActionResult DeleteBeltTest(int TestID)
        {
            if (TestID < 1)
            {
                return BadRequest($"Not accepted ID {TestID}");
            }


            if (clsBeltTests.DeleteRow(TestID))

                return Ok($"BeltTest with ID {TestID} has been deleted.");
            else
                return NotFound($"BeltTest with ID {TestID} not found. no rows deleted!");
        }

        [HttpGet("exists/{TestID}", Name = "ExistsBeltTestIDByTestId")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<bool> ExistsBeltTestIDByTestId(int TestID)
        {
            if (TestID < 1)
            {
                return BadRequest($"Not accepted ID {TestID}");
            }

            if (clsBeltTests.DoesRowExist(TestID))
            {
                return Ok(true);
            }
            else
            {
                return NotFound(false);
            }
        }


        [HttpGet("PassLastRankName/{MemberID}/{RankID}", Name = "GetPassLastRankNameForTests")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<bool> GetPassLastRankNameForTests(int MemberID, int RankID)
        {
            if (MemberID < 1 || RankID<1)
            {
                return BadRequest($"Not accepted");
            }

            if (clsBeltTests.GetPassLastRankNameForTests(MemberID, RankID))
            {
                return Ok(true);
            }
            else
            {
                return NotFound(false);
            }
        }

        [HttpGet("CountBeltTests", Name = "CountBeltTests")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<int> CountBeltTests()
        {
            int BeltTests = clsBeltTests.CountBeltTests();

            if (BeltTests <= 0)
            {
                return NotFound("No BeltTests");
            }

            return Ok(BeltTests);


        }


        [HttpGet("CountBeltTestsForMember/{MemberID}", Name = "CountBeltTestsForMember")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<int> CountBeltTests(int MemberID)
        {
            int BeltTests = clsBeltTests.CountBeltTestsForMember(MemberID);

            if (BeltTests <= 0)
            {
                return NotFound("No BeltTests");
            }

            return Ok(BeltTests);


        }


    }
}
