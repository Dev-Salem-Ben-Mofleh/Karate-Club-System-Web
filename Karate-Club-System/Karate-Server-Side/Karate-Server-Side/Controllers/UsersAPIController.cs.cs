using clsKarateBussinse;
using clsKarateBussinseLayer;
using clsKarateDataAccesseLayer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static clsKarateDataAccesse.clsDataMembers;
using static clsKarateDataAccesse.clsDataUsers;
using static clsKarateDataAccesseLayer.clsDataPerson;

namespace Karate_Server_Side.Controllers
{
    [Route("api/KarateAPI/Users")]
    [ApiController]
    public class UsersAPIController : ControllerBase
    {
        [HttpGet("AllUsers", Name = "GetAllUsers")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<IEnumerable<ViewUserDTO>> GetAllUsers()
        {
            List<ViewUserDTO> Users = clsUsers.GetAllRows();

            if (Users == null || Users.Count == 0)
            {
                return NotFound("No Users Found!");
            }

            return Ok(Users);
        }

        [HttpGet("AllUsers/{PageNumber}/{RowsPerPage}/{filter}", Name = "GetAllUsersRowsPerPage")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<IEnumerable<ViewUserDTO>> GetAllUsers(int PageNumber, int RowsPerPage, string filter)
        {
            List<ViewUserDTO> Users = clsUsers.GetAllRows(PageNumber, RowsPerPage, filter);

            if (Users == null || Users.Count == 0)
            {
                return NotFound("No Users Found!");
            }

            return Ok(Users);
        }


        [HttpGet("AllUsers/{Culomn}/{ValueSearch}", Name = "GetAllUsersRowsForSearch")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<IEnumerable<ViewUserDTO>> GetAllUsers(string Culomn, string ValueSearch)
        {
            List<ViewUserDTO> Users = clsUsers.GetAllRows(Culomn, ValueSearch);

            if (Users == null || Users.Count == 0)
            {
                return NotFound("No Users Found!");
            }

            return Ok(Users);
        }



        [HttpGet("GetUser/{UserID}", Name = "GetUserById")]

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<UserDTO> GetUserById(int UserID)
        {

            if (UserID < 1)
            {
                return BadRequest($"Not accepted ID {UserID}");
            }

            clsUsers User = clsUsers.FindByUserID(UserID);

            if (User == null)
            {
                return NotFound($"User with ID {UserID} not found.");
            }

            UserDTO UDTO = User.UDTO;
            
            return Ok(UDTO);

        }


        [HttpGet("GetUser/{UserName}/{Password}", Name = "GetUserByUserNameAndPassword")]

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult<PersonDTO> GetUserByUserNameAndPassword(string UserName, string Password)
        {

            if (UserName == "" || Password == "")
            {
                return BadRequest($"Not accepted");
            }

            clsUsers User = clsUsers.FindByUsernameAndPassword(UserName, Password);

            if (User == null)
            {
                return NotFound($"User with UserName {UserName} and Password {Password} not found.");
            }

            //here we get only the DTO object to send it back.
            UserDTO UDTO = User.UDTO;

            //we return the DTO not the student object.
            return Ok(UDTO);

        }

        [HttpPost("AddUser", Name = "AddUser")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<UserDTO> AddUser(UserDTO newUserDTO)
        {
            //we validate the data here
            if (newUserDTO == null)
            {
                return BadRequest("Invalid user data.");
            }


            clsUsers user = new clsUsers(new UserDTO(newUserDTO.UserID, newUserDTO.PersonID, newUserDTO.UserName, newUserDTO.Password
                , newUserDTO.IsActive, newUserDTO.Permission));


            if (user.Save())

            {
                newUserDTO.UserID = user.UserID;

                return CreatedAtRoute("GetUserById", new { UserID = newUserDTO.UserID }, newUserDTO);
            }
            else
            {
                return StatusCode(500, new { message = "Error adding user" });

            }



        }

        [HttpPut("UpdateUser/{UserID}", Name = "UpdateUser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<UserDTO> UpdateUser(int UserID, UserDTO updatedUser)
        {
            if (updatedUser == null || UserID < 1)
            {
                return BadRequest("Invalid user data.");
            }


            clsUsers user = clsUsers.FindByUserID(UserID);


            if (user == null)
            {
                return NotFound($"User with ID {UserID} not found.");
            }

            user.UserName = updatedUser.UserName;
            user.Password = updatedUser.Password;
            user.IsActive = updatedUser.IsActive;
            user.Permission = updatedUser.Permission;


            if (user.Save())
            {
                return Ok(user.UDTO);
            }
            else
            {
                return StatusCode(500, new { message = "Error updating user" });
            }


        }

        [HttpDelete("DeleteUser/{UserID}", Name = "DeleteUser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult DeleteUser(int UserID)
        {
            if (UserID < 1)
            {
                return BadRequest($"Not accepted ID {UserID}");
            }


            if (clsUsers.DeleteRow(UserID))

                return Ok($"User with ID {UserID} has been deleted.");
            else
                return NotFound($"User with ID {UserID} not found. no rows deleted!");
        }

        [HttpGet("exists/{UserID}", Name = "ExistsUserByUserId")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<bool> ExistsUserByUserId(int UserID)
        {
            if (UserID < 1)
            {
                return BadRequest($"Not accepted ID {UserID}");
            }

            if (clsUsers.DoesRowExist(UserID))
            {
                return Ok(true);
            }
            else
            {
                return Ok(false);
            }
        }


        [HttpGet("existsUserBy/{Userame}", Name = "ExistsUserByUserName")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<bool> ExistsUserByUserName(string Userame)
        {
            if (Userame == "")
            {
                return BadRequest($"Not accepted");
            }

            if (clsUsers.DoesRowExist(Userame))
            {
                return Ok(true);
            }
            else
            {
                return Ok(false);
            }
        }

        [HttpGet("Count/Users/{filter}", Name = "CountUsers")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<int> CountUsers(string filter)
        {
            int Users = clsUsers.CountUsers(filter);

            if (Users <= 0)
            {
                return NotFound("No Users");
            }

            return Ok(Users);


        }

    }
}
