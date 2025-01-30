using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using clsKarateBussinseLayer;
using clsKarateDataAccesseLayer;
using static clsKarateDataAccesseLayer.clsDataPerson;
using clsKarateBussinse;
using KarateBussinesLayer;

namespace Karate_Server_Side.Controllers
{
    [Route("api/KarateAPI/Persons")]
    [ApiController]
    public class PersonsAPIController : ControllerBase
    {

        [HttpGet("AllPersons", Name = "GetAllPersons")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<IEnumerable<PersonDTO>> GetAllPersons()
        {
            List<PersonDTO> Persons = clsPersons.GetAllRows();

            if (Persons == null || Persons.Count == 0)
            {
                return NotFound("No Persons Found!");
            }

            return Ok(Persons);
        }

        [HttpGet("GetPersonBy/{PersonId}", Name = "GetPersonById")]

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<PersonDTO> GetPersonById(int PersonId)
        {

            if (PersonId < 1)
            {
                return BadRequest($"Not accepted ID {PersonId}");
            }

            clsPersons person = clsPersons.FindByPersonID(PersonId);

            if (person == null)
            {
                return NotFound($"Person with ID {PersonId} not found.");
            }

            //here we get only the DTO object to send it back.
            PersonDTO PDTO = person.PDTO;

            //we return the DTO not the student object.
            return Ok(PDTO);

        }

        [HttpPost("AddPerson",Name = "AddPerson")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<PersonDTO> AddPerson(PersonDTO newPersonDTO)
        {
            //we validate the data here
            if (newPersonDTO == null)
            {
                return BadRequest("Invalid Person data.");
            }


            clsPersons persons = new clsPersons(new PersonDTO(newPersonDTO.PersonID, newPersonDTO.Name, newPersonDTO.Address, newPersonDTO.Phone
                , newPersonDTO.DateOfBirth, newPersonDTO.Gender, newPersonDTO.Email, newPersonDTO.ImagePath));


            if (persons.Save())

            {
                newPersonDTO.PersonID = persons.PersonID;

                return CreatedAtRoute("GetPersonById", new { PersonId = newPersonDTO.PersonID }, newPersonDTO);
                //return CreatedAtRoute("GetPersonById", new { id = persons.PersonID }, persons.PDTO);

            }
            else
            {
                return StatusCode(500, new { message = "Error adding person" });

            }



        }

        [HttpPut("UpdatePerson/{PersonId}", Name = "UpdatePerson")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<PersonDTO> UpdatePerson(int PersonId, PersonDTO updatedPerson)
        {
            if (updatedPerson == null || PersonId < 1)
            {
                return BadRequest("Invalid Person data.");
            }


            clsPersons Perosn = clsPersons.FindByPersonID(PersonId);


            if (Perosn == null)
            {
                return NotFound($"Person with ID {PersonId} not found.");
            }

            Perosn.Name = updatedPerson.Name;
            Perosn.Address = updatedPerson.Address;
            Perosn.Phone = updatedPerson.Phone;
            Perosn.DateOfBirth = updatedPerson.DateOfBirth;
            Perosn.Gender = updatedPerson.Gender;
            Perosn.Email = updatedPerson.Email;
            Perosn.ImagePath = updatedPerson.ImagePath;


            if (Perosn.Save())
            {
                return Ok(Perosn.PDTO);
            }
            else
            {
                return StatusCode(500, new { message = "Error updating user" });
            }


        }

        [HttpDelete("DeletePerson/{PersonId}", Name = "DeletePerson")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult DeletePerson(int PersonId)
        {
            if (PersonId < 1)
            {
                return BadRequest($"Not accepted ID {PersonId}");
            }

            
            if (clsPersons.DeleteRow(PersonId))

                return Ok($"Person with ID {PersonId} has been deleted.");
            else
                return NotFound($"Person with ID {PersonId} not found. no rows deleted!");
        }

        [HttpGet("existsPerson/{PersonId}", Name = "ExistsPersonByPersonId")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<bool> ExistsPersonByUserId(int PersonId)
        {
            if (PersonId < 1)
            {
                return BadRequest($"Not accepted ID {PersonId}");
            }

            if (clsPersons.DoesRowExist(PersonId))
            {
                return Ok(true);
            }
            else
            {
                return NotFound(false);
            }
        }

        [HttpGet("Count/Persons", Name = "CountPersons")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<int> CountPersons()
        {
            int Persons=clsPersons.CounttRows();

            if (Persons <= 0)
            {
                return NotFound("No Persons");
            }

            return Ok(Persons);


        }


        [HttpPost("UploadImage")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]

        public async Task<IActionResult> UploadImage([FromForm] IFormFile ImageFile)
        {
            if (ImageFile == null || ImageFile.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            string imageUrl = "";
            try
            {
                using (var stream = ImageFile.OpenReadStream())
                {
                    imageUrl = await clsCloundinary.UploadImage(stream, ImageFile.FileName);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error uploading image: {ex.Message}");
            }

            return Ok(imageUrl );
        }


        [HttpPut("UpdateImage")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]

        public async Task<IActionResult> UpdateImage([FromQuery] string oldImageUrl, [FromForm] IFormFile file)
        {
            if (string.IsNullOrWhiteSpace(oldImageUrl) || file == null || file.Length == 0)
            {
                return BadRequest("Invalid input. Old image URL or file is missing.");
            }

            try
            {
                string imageUrl;
                using (var stream = file.OpenReadStream())
                {
                    imageUrl = await clsCloundinary.UpdateImage(stream, oldImageUrl, file.FileName);
                }
                return Ok(imageUrl);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error updating image: {ex.Message}");
            }
        }


        [HttpDelete("DeleteImage")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]

        public async Task<IActionResult> DeleteImage([FromQuery] string ImageUrl)
        {
            if (string.IsNullOrWhiteSpace(ImageUrl))
            {
                return BadRequest("No file URL provided.");
            }

            try
            {
              if(  await clsCloundinary.DeleteImage(ImageUrl))
                     return Ok(true);
              else
                    return Ok(false);

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error deleting image: {ex.Message}");
            }

        }



    }
}
