using clsKarateBussinse;
using clsKarateBussinseLayer;
using KarateBussinesLayer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Numerics;
using static clsKarateDataAccesse.clsDataMembers;
using static clsKarateDataAccesse.clsDataUsers;
using static clsKarateDataAccesseLayer.clsDataPerson;

namespace Karate_Server_Side.Controllers
{
    [Route("api/KarateAPI/Members")]
    [ApiController]
    public class MemberAPIController : ControllerBase
    {
      
            [HttpGet("AllMembers", Name = "GetAllMembers")]
            [ProducesResponseType(StatusCodes.Status200OK)]
            [ProducesResponseType(StatusCodes.Status404NotFound)]

            public ActionResult<IEnumerable<ViewMemberDTO>> GetAllMembers()
            {
                List<ViewMemberDTO> Members = clsMembers.GetAllRows();

                if (Members == null || Members.Count == 0)
                {
                    return NotFound("No Members Found!");
                }

                return Ok(Members);
            }


        [HttpGet("AllMembers/{PageNumber}/{RowsPerPage}/{filter}", Name = "GetAllMembersRowsPerPage")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<IEnumerable<ViewMemberDTO>> GetAllMembers(int PageNumber, int RowsPerPage,string filter)
        {
            List<ViewMemberDTO> Members = clsMembers.GetAllRows(PageNumber, RowsPerPage, filter);

            if (Members == null || Members.Count == 0)
            {
                return NotFound("No Members Found!");
            }

            return Ok(Members);
        }


        [HttpGet("AllMembers/{Culomn}/{ValueSearch}", Name = "GetAllMembersRowsForSearch")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<IEnumerable<ViewMemberDTO>> GetAllMembers(string Culomn, string ValueSearch)
        {
            List<ViewMemberDTO> Members = clsMembers.GetAllRows( Culomn, ValueSearch);

            if (Members == null || Members.Count == 0)
            {
                return NotFound("No Members Found!");
            }

            return Ok(Members);
        }


        [HttpGet("GetAllMembersTrainedBy/{instructorID}/{PageNumber}/{RowsPerPage}", Name = "GetAllMembersTrainedByInstructor")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<IEnumerable<ViewMemberDTO>> GetAllMembersTrainedByInstructorID(int instructorID, int PageNumber, int RowsPerPage)
        {
            if (instructorID < 1)
            {
                return BadRequest($"Not accepted ID {instructorID}");
            }
            List<ViewMemberDTO> Members = clsMembers.GetAllRows(instructorID,PageNumber, RowsPerPage);

            if (Members == null || Members.Count == 0)
            {
                return NotFound("No Members Found!");
            }

            return Ok(Members);
        }

        [HttpGet("GetMember/{MemberID}", Name = "GetMemberById")]

            [ProducesResponseType(StatusCodes.Status200OK)]
            [ProducesResponseType(StatusCodes.Status400BadRequest)]
            [ProducesResponseType(StatusCodes.Status404NotFound)]

            public ActionResult<MemberDTO> GetMemberById(int MemberID)
            {

                if (MemberID < 1)
                {
                    return BadRequest($"Not accepted ID {MemberID}");
                }

                clsMembers Members = clsMembers.FindByMemberID(MemberID);

                if (Members == null)
                {
                    return NotFound($"Member with ID {MemberID} not found.");
                }

                MemberDTO MDTO = Members.MDTO;

                return Ok(MDTO);

            }


            [HttpPost("AddMember", Name = "AddMember")]
            [ProducesResponseType(StatusCodes.Status201Created)]
            [ProducesResponseType(StatusCodes.Status400BadRequest)]
            [ProducesResponseType(StatusCodes.Status500InternalServerError)]
            public ActionResult<MemberDTO> AddMember(MemberDTO newMemberDTO)
            {
                //we validate the data here
                if (newMemberDTO == null)
                {
                    return BadRequest("Invalid member data.");
                }


                clsMembers member = new clsMembers(new MemberDTO(newMemberDTO.MemberID, newMemberDTO.PersonID,
                    newMemberDTO.EmergencyContactInfo, newMemberDTO.LastBeltRankID
                    , newMemberDTO.IsActive));


            if (member.Save())

                {
                newMemberDTO.MemberID = member.MemberID;

                    return CreatedAtRoute("GetMemberById", new { MemberID = newMemberDTO.MemberID }, newMemberDTO);
                }
                else
                {
                    return StatusCode(500, new { message = "Error adding Member" });

                }



            }

            [HttpPut("UpdateMember/{MemberID}", Name = "UpdateMember")]
            [ProducesResponseType(StatusCodes.Status200OK)]
            [ProducesResponseType(StatusCodes.Status400BadRequest)]
            [ProducesResponseType(StatusCodes.Status404NotFound)]
            [ProducesResponseType(StatusCodes.Status500InternalServerError)]
            public ActionResult<MemberDTO> UpdateMember(int MemberID, MemberDTO updatedMember)
            {
                if (updatedMember == null || MemberID < 1)
                {
                    return BadRequest("Invalid member data.");
                }


                clsMembers member = clsMembers.FindByMemberID(MemberID);


                if (member == null)
                {
                    return NotFound($"Member with ID {MemberID} not found.");
                }

            member.EmergencyContactInfo = updatedMember.EmergencyContactInfo;
            member.LastBeltRankID = updatedMember.LastBeltRankID;
            member.IsActive = updatedMember.IsActive;


                if (member.Save())
                {
                    return Ok(member.MDTO);
                }
                else
                {
                    return StatusCode(500, new { message = "Error updating Member" });
                }


            }

            [HttpDelete("DeleteMember/{MemberID}", Name = "DeleteMember")]
            [ProducesResponseType(StatusCodes.Status200OK)]
            [ProducesResponseType(StatusCodes.Status400BadRequest)]
            [ProducesResponseType(StatusCodes.Status404NotFound)]
            public  ActionResult DeleteMember(int MemberID)
            {
                if (MemberID < 1)
                {
                    return BadRequest($"Not accepted ID {MemberID}");
                }

            if (clsMembers.DeleteRow(MemberID))

                    return Ok($"Member with ID {MemberID} has been deleted.");
                else
                    return NotFound($"Member with ID {MemberID} not found. no rows deleted!");
            }

            [HttpGet("exists/{MemberID}", Name = "ExistsMemberIDByMemberId")]
            [ProducesResponseType(StatusCodes.Status400BadRequest)]
            [ProducesResponseType(StatusCodes.Status200OK)]
            [ProducesResponseType(StatusCodes.Status404NotFound)]
            public ActionResult<bool> ExistsMemberByMemberId(int MemberID)
            {
                if (MemberID < 1)
                {
                    return BadRequest($"Not accepted ID {MemberID}");
                }

                if (clsMembers.DoesRowExist(MemberID))
                {
                    return Ok(true);
                }
                else
                {
                    return NotFound(false);
                }
            }


            [HttpGet("CheckMemberIsActive/{MemberID}", Name = "CheckMemberIsActive")]
            [ProducesResponseType(StatusCodes.Status400BadRequest)]
            [ProducesResponseType(StatusCodes.Status200OK)]
            [ProducesResponseType(StatusCodes.Status404NotFound)]
            public ActionResult<bool> CheckMemberIsActive(int MemberID)
            {
                if (MemberID < 1)
                {
                    return BadRequest($"Not accepted");
                }

                if (clsMembers.CheckMemberIsActive(MemberID))
                {
                    return Ok(true);
                }
                else
                {
                    return NotFound(false);
                }
            }

            [HttpGet("Count/Members/{InstructorID}", Name = "CountMembers")]
            [ProducesResponseType(StatusCodes.Status200OK)]
            [ProducesResponseType(StatusCodes.Status404NotFound)]
            public ActionResult<int> CountMembers(int InstructorID)
            {
                int Members = clsMembers.CountMembers(InstructorID);

                if (Members <= 0)
                {
                    return NotFound("No Members");
                }

                return Ok(Members);


            }


        [HttpGet("CountMembers/{filter}", Name = "CountMembersByFilter")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<int> CountMembers(string filter)
        {
            int Members = clsMembers.CountMembers(filter);

            if (Members <= 0)
            {
                return NotFound("No Members");
            }

            return Ok(Members);


        }

    }
}



