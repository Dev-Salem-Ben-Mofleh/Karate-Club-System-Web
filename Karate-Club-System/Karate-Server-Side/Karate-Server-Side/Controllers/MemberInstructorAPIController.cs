using clsKarateBussinse;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static clsKarateDataAccesse.clsDataInstructors;
using static clsKarateDataAccesse.clsDataMemberInstructors;
using static clsKarateDataAccesse.clsDataMembers;

namespace Karate_Server_Side.Controllers
{
    [Route("api/KarateAPI/MemberInstructor")]
    [ApiController]
    public class MemberInstructorAPIController : ControllerBase
    {
        [HttpGet("AllMemberInstructors", Name = "GetAllMemberInstructors")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<IEnumerable<ViewMemberInstructorDTO>> GetAllMemberInstructors()
        {
            List<ViewMemberInstructorDTO> memberInstructor = clsMemberInstructors.GetAllRows();

            if (memberInstructor == null || memberInstructor.Count == 0)
            {
                return NotFound("No memberInstructor Found!");
            }

            return Ok(memberInstructor);
        }
        [HttpGet("AllMemberInstructors/{PageNumber}/{RowsPerPage}", Name = "GetAllMemberInstructorsRowsPerPage")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<IEnumerable<ViewMemberInstructorDTO>> GetAllMemberInstructors(int PageNumber, int RowsPerPage)
        {
            List<ViewMemberInstructorDTO> MemberInstructors = clsMemberInstructors.GetAllRows(PageNumber, RowsPerPage);

            if (MemberInstructors == null || MemberInstructors.Count == 0)
            {
                return NotFound("No MemberInstructors Found!");
            }

            return Ok(MemberInstructors);
        }


        [HttpGet("SearchMemberInstructors/{Culomn}/{ValueSearch}", Name = "GetAllMemberInstructorsRowsForSearch")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<IEnumerable<ViewMemberInstructorDTO>> GetAllMemberInstructors(string Culomn, string ValueSearch)
        {
            List<ViewMemberInstructorDTO> memberInstructor = clsMemberInstructors.GetAllRows(Culomn, ValueSearch);

            if (memberInstructor == null || memberInstructor.Count == 0)
            {
                return NotFound("No memberInstructor Found!");
            }

            return Ok(memberInstructor);
        }




        [HttpGet("GetMemberInstructor/{MemberInstructorID}", Name = "GetMemberInstructorById")]

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<MemberInstructorDTO> GetMemberInstructorById(int MemberInstructorID)
        {

            if (MemberInstructorID < 1)
            {
                return BadRequest($"Not accepted ID {MemberInstructorID}");
            }

            clsMemberInstructors memberInstructor = clsMemberInstructors.FindByMemberInsturctorID(MemberInstructorID);

            if (memberInstructor == null)
            {
                return NotFound($"Instructor with ID {MemberInstructorID} not found.");
            }

            MemberInstructorDTO MIDTO = memberInstructor.MIDTO;

            return Ok(MIDTO);

        }


        [HttpPost("AddMemberInstructor", Name = "AddMemberInstructor")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<MemberInstructorDTO> AddMemberInstructor(MemberInstructorDTO newMemberInstructorDTO)
        {
            //we validate the data here
            if (newMemberInstructorDTO == null)
            {
                return BadRequest("Invalid MemberInstructor data.");
            }


            clsMemberInstructors memberInstructor = new clsMemberInstructors(new MemberInstructorDTO(newMemberInstructorDTO.MemberInstructorID, newMemberInstructorDTO.MemberID,
                newMemberInstructorDTO.InstructorID, newMemberInstructorDTO.AssignDate));




            if (memberInstructor.Save())

            {
                newMemberInstructorDTO.MemberInstructorID = memberInstructor.MemberInstructorID;

                return CreatedAtRoute("GetMemberInstructorById", new { MemberInstructorID = newMemberInstructorDTO.MemberInstructorID }, newMemberInstructorDTO);
            }
            else
            {
                return StatusCode(500, new { message = "Error adding MemberInstructor" });

            }



        }

        [HttpPut("UpdateMemberInstructor/{MemberInstructorID}", Name = "UpdateMemberInstructor")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<MemberInstructorDTO> UpdateMemberInstructorID(int MemberInstructorID, MemberInstructorDTO updatedMemberInstructor)
        {
            if (updatedMemberInstructor == null || MemberInstructorID < 1)
            {
                return BadRequest("Invalid MemberInstructor data.");
            }


            clsMemberInstructors memberInstructors= clsMemberInstructors.FindByMemberInsturctorID(MemberInstructorID);


            if (memberInstructors == null)
            {
                return NotFound($"MemberInstructors with ID {MemberInstructorID} not found.");
            }

            memberInstructors.MemberID = updatedMemberInstructor.MemberID;
            memberInstructors.InstructorID = updatedMemberInstructor.InstructorID;
            memberInstructors.AssignDate = updatedMemberInstructor.AssignDate;


            if (memberInstructors.Save())
            {
                return Ok(memberInstructors.MIDTO);
            }
            else
            {
                return StatusCode(500, new { message = "Error updating memberInstructors" });
            }


        }

        [HttpDelete("DeleteMemberInstructor/{MemberInstructorID}", Name = "DeleteMemberInstructor")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult DeleteMemberInstructor(int MemberInstructorID)
        {
            if (MemberInstructorID < 1)
            {
                return BadRequest($"Not accepted ID {MemberInstructorID}");
            }


            if (clsMemberInstructors.DeleteRow(MemberInstructorID))

                return Ok($"MemberInstructor with ID {MemberInstructorID} has been deleted.");
            else
                return NotFound($"MemberInstructor with ID {MemberInstructorID} not found. no rows deleted!");
        }

        [HttpGet("exists/{MemberInstructorID}", Name = "ExistsMemberInstructorIDByMemberInstructorID")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<bool> ExistsMemberInstructorIDByMemberInstructorID(int MemberInstructorID)
        {
            if (MemberInstructorID < 1)
            {
                return BadRequest($"Not accepted ID {MemberInstructorID}");
            }

            if (clsMemberInstructors.DoesRowExist(MemberInstructorID))
            {
                return Ok(true);
            }
            else
            {
                return NotFound(false);
            }
        }

        [HttpGet("CheckMemberHasSameInstructor/{MemberID}/{InstructorID}", Name = "CheckMemberHasSameInstructor")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<bool> CheckMemberHasSameInstructor(int MemberID,int InstructorID)
        {
            if (MemberID < 1 && InstructorID<1)
            {
                return BadRequest($"Not accepted");
            }

            if (clsMemberInstructors.CheckMemberHasSameInstructor(MemberID, InstructorID))
            {
                return Ok(true);
            }
            else
            {
                return Ok(false);
            }
        }



        [HttpGet("Count/MemberInstructor", Name = "CountMemberInstructor")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<int> CountMemberInstructor()
        {
            int MemberInstructors = clsMemberInstructors.CountMemberInstructors();

            if (MemberInstructors <= 0)
            {
                return NotFound("No Members");
            }

            return Ok(MemberInstructors);


        }

    }
}
