using clsKarateBussinse;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static clsKarateDataAccesse.clsDataSetting;

namespace Karate_Server_Side.Controllers
{
    [Route("api/KarateAPI/Setting")]
    [ApiController]
    public class SettingAPIController : ControllerBase
    {
        [HttpGet("PeriodDay", Name = "GetPeriodDay")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<byte> CountPayments()
        {
            SettingDTO settingDTO = clsSettting.GetPeriodDay();

            if (settingDTO.PeriodDay <= 0)
            {
                return NotFound("No Default PeriodDay");
            }

            return Ok(settingDTO.PeriodDay);


        }
    }
}
