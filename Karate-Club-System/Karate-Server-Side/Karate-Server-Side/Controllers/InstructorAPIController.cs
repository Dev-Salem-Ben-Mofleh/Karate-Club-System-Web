using clsKarateBussinse;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static clsKarateDataAccesse.clsDataInstructors;
using static clsKarateDataAccesse.clsDataMembers;

namespace Karate_Server_Side.Controllers
{
    [Route("api/KarateAPI/Instructor")]
    [ApiController]
    public class InstructorAPIController : ControllerBase
    {
        [HttpGet("AllInstructors", Name = "GetAllInstructors")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<IEnumerable<ViewInstructorDTO>> GetAllInstructors()
        {
            List<ViewInstructorDTO> Instructor = clsInstructors.GetAllRows();

            if (Instructor == null || Instructor.Count == 0)
            {
                return NotFound("No Instructors Found!");
            }

            return Ok(Instructor);
        }
        [HttpGet("AllInstructors/{PageNumber}/{RowsPerPage}", Name = "GetAllInstructorsRowsPerPage")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<IEnumerable<ViewInstructorDTO>> GetAllInstructors(int PageNumber, int RowsPerPage)
        {
            List<ViewInstructorDTO> Instructor = clsInstructors.GetAllRows(PageNumber, RowsPerPage);

            if (Instructor == null || Instructor.Count == 0)
            {
                return NotFound("No Instructors Found!");
            }

            return Ok(Instructor);
        }


        [HttpGet("GetAllInstructors/{Culomn}/{ValueSearch}", Name = "GetAllInstructorsRowsForSearch")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<IEnumerable<ViewInstructorDTO>> GetAllInstructors(string Culomn, string ValueSearch)
        {
            List<ViewInstructorDTO> Instructor = clsInstructors.GetAllRows(Culomn, ValueSearch);

            if (Instructor == null || Instructor.Count == 0)
            {
                return NotFound("No Instructors Found!");
            }

            return Ok(Instructor);
        }


        [HttpGet("GetInstructor/{InstructorID}", Name = "GetInstructorById")]

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<InstructorDTO> GetInstructorById(int InstructorID)
        {

            if (InstructorID < 1)
            {
                return BadRequest($"Not accepted ID {InstructorID}");
            }

            clsInstructors Instructor = clsInstructors.FindByInstructorID(InstructorID);

            if (Instructor == null)
            {
                return NotFound($"Instructor with ID {InstructorID} not found.");
            }

            InstructorDTO IDTO = Instructor.IDTO;

            return Ok(IDTO);

        }


        [HttpPost("AddInstructor", Name = "AddInstructor")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<InstructorDTO> AddInstructor(InstructorDTO newInstructorDTO)
        {
            //we validate the data here
            if (newInstructorDTO == null)
            {
                return BadRequest("Invalid Instructor data.");
            }


            clsInstructors Instructor = new clsInstructors(new InstructorDTO(newInstructorDTO.InstructorID, newInstructorDTO.PersonID,
                newInstructorDTO.Qualification));


            if (Instructor.Save())

            {
                newInstructorDTO.InstructorID = Instructor.InstructorID;

                return CreatedAtRoute("GetInstructorById", new { InstructorID = newInstructorDTO.InstructorID }, newInstructorDTO);
            }
            else
            {
                return StatusCode(500, new { message = "Error adding Instructor" });

            }



        }

        [HttpPut("UpdateInstructor/{InstructorID}", Name = "UpdateInstructor")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<InstructorDTO> UpdateInstructor(int InstructorID, InstructorDTO updatedInstructor)
        {
            if (updatedInstructor == null || InstructorID < 1)
            {
                return BadRequest("Invalid Instructor data.");
            }


            clsInstructors Instructor = clsInstructors.FindByInstructorID(InstructorID);


            if (Instructor == null)
            {
                return NotFound($"Instructor with ID {InstructorID} not found.");
            }

            Instructor.PersonID = updatedInstructor.PersonID;
            Instructor.Qualification = updatedInstructor.Qualification;


            if (Instructor.Save())
            {
                return Ok(Instructor.IDTO);
            }
            else
            {
                return StatusCode(500, new { message = "Error updating Instructor" });
            }


        }

        [HttpDelete("DeleteinstInstructor/{InstructorID}", Name = "DeleteinstInstructor")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult DeleteinstInstructor(int InstructorID)
        {
            if (InstructorID < 1)
            {
                return BadRequest($"Not accepted ID {InstructorID}");
            }


            if (clsInstructors.DeleteRow(InstructorID))

                return Ok($"Instructor with ID {InstructorID} has been deleted.");
            else
                return NotFound($"Instructor with ID {InstructorID} not found. no rows deleted!");
        }

        [HttpGet("exists/{InstructorID}", Name = "ExistsInstructorByInstructorId")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<bool> ExistsInstructorByInstructorId(int InstructorID)
        {
            if (InstructorID < 1)
            {
                return BadRequest($"Not accepted ID {InstructorID}");
            }

            if (clsMembers.DoesRowExist(InstructorID))
            {
                return Ok(true);
            }
            else
            {
                return NotFound(false);
            }
        }


       

        [HttpGet("Count/Instructors", Name = "CountInstructors")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<int> CountInstructors()
        {
            int Instructors = clsInstructors.CountInstructors();

            if (Instructors <= 0)
            {
                return NotFound("No Instructors");
            }

            return Ok(Instructors);


        }
    }
}
