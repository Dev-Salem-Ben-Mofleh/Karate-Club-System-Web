using clsKarateBussinse;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static clsKarateDataAccesse.clsDataBeltRanks;
using static clsKarateDataAccesse.clsDataMembers;
using static clsKarateDataAccesse.clsDataUsers;

namespace Karate_Server_Side.Controllers
{
    [Route("api/KarateAPI/BeltRanks")]
    [ApiController]
    public class BeltRankAPIController : ControllerBase
    {
        [HttpGet("AllBeltRanks", Name = "GetAllBeltRanks")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<IEnumerable<BeltRankDTO>> GetAllBeltRanks()
        {
            List<BeltRankDTO> BeltRank = clsBeltRanks.GetAllRows();

            if (BeltRank == null || BeltRank.Count == 0)
            {
                return NotFound("No BeltRanks Found!");
            }

            return Ok(BeltRank);
        }

        [HttpGet("AllBeltRanks/{PageNumber}/{RowsPerPage}", Name = "GetAllBeltRanksRowsPerPage")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<IEnumerable<BeltRankDTO>> GetAllBeltRanks(int PageNumber, int RowsPerPage)
        {
            List<BeltRankDTO> BeltRank = clsBeltRanks.GetAllRows(PageNumber, RowsPerPage);

            if (BeltRank == null || BeltRank.Count == 0)
            {
                return NotFound("No BeltRank Found!");
            }

            return Ok(BeltRank);
        }


        [HttpGet("SearchBeltRanks/{Culomn}/{ValueSearch}", Name = "GetAllBeltRanksRowsForSearch")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<IEnumerable<BeltRankDTO>> GetAllBeltRanks(string Culomn, string ValueSearch)
        {
            List<BeltRankDTO> BeltRank = clsBeltRanks.GetAllRows(Culomn, ValueSearch);

            if (BeltRank == null || BeltRank.Count == 0)
            {
                return NotFound("No BeltRank Found!");
            }

            return Ok(BeltRank);
        }


        [HttpGet("GetBeltRank/{RankID}", Name = "GetBeltRankById")]

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<BeltRankDTO> GetBeltRankById(int RankID)
        {

            if (RankID < 1)
            {
                return BadRequest($"Not accepted ID {RankID}");
            }

            clsBeltRanks beltRanks = clsBeltRanks.FindByRankID(RankID);

            if (beltRanks == null)
            {
                return NotFound($"BeltRank with ID {RankID} not found.");
            }

            BeltRankDTO BDTO = beltRanks.BDTO;

            return Ok(BDTO);

        }


        [HttpPost("AddBeltRank", Name = "AddBeltRank")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<BeltRankDTO> AddBeltRank(BeltRankDTO newBeltRankDTO)
        {
            //we validate the data here
            if (newBeltRankDTO == null)
            {
                return BadRequest("Invalid BeltRank data.");
            }


            clsBeltRanks beltRank = new clsBeltRanks(new BeltRankDTO(newBeltRankDTO.RankID, newBeltRankDTO.RankName,
                newBeltRankDTO.TestFees));


            
            if (beltRank.Save())

            {
                newBeltRankDTO.RankID = beltRank.RankID;

                return CreatedAtRoute("GetBeltRankById", new { RankID = newBeltRankDTO.RankID }, newBeltRankDTO);
            }
            else
            {
                return StatusCode(500, new { message = "Error adding BeltRank" });

            }



        }

        [HttpPut("UpdateBeltRank/{RankID}", Name = "UpdateBeltRank")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<BeltRankDTO> UpdateBeltRank(int RankID, BeltRankDTO updatedBeltRankDTO)
        {
            if (updatedBeltRankDTO == null || RankID < 1)
            {
                return BadRequest("Invalid member data.");
            }


            clsBeltRanks BeltRank = clsBeltRanks.FindByRankID(RankID);


            if (BeltRank == null)
            {
                return NotFound($"User with ID {RankID} not found.");
            }

            BeltRank.RankName = updatedBeltRankDTO.RankName;
            BeltRank.TestFees = updatedBeltRankDTO.TestFees;


            if (BeltRank.Save())
            {
                return Ok(BeltRank.BDTO);
            }
            else
            {
                return StatusCode(500, new { message = "Error updating BeltRank" });
            }


        }

        [HttpDelete("DeleteBeltRank/{RankID}", Name = "DeleteBeltRank")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult DeleteBeltRank(int RankID)
        {
            if (RankID < 1)
            {
                return BadRequest($"Not accepted ID {RankID}");
            }


            if (clsBeltRanks.DeleteRow(RankID))

                return Ok($"BeltRank with ID {RankID} has been deleted.");
            else
                return NotFound($"BeltRank with ID {RankID} not found. no rows deleted!");
        }

        [HttpGet("exists/{RankID}", Name = "ExistsBeltRankByRankId")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<bool> ExistsBeltRankByRankId(int RankID)
        {
            if (RankID < 1)
            {
                return BadRequest($"Not accepted ID {RankID}");
            }

            if (clsBeltRanks.DoesRowExist(RankID))
            {
                return Ok(true);
            }
            else
            {
                return NotFound(false);
            }
        }

        [HttpGet("CountBeltRanks", Name = "CountBeltRanks")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<int> CountBeltRanks()
        {
            int BeltRank = clsBeltRanks.CountBeltRanks();

            if (BeltRank <= 0)
            {
                return NotFound("No BeltRank");
            }

            return Ok(BeltRank);


        }
    }
}
