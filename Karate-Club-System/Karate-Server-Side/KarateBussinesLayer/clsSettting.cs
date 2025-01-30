using clsKarateDataAccesse;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static clsKarateDataAccesse.clsDataMembers;
using static clsKarateDataAccesse.clsDataPayments;
using static clsKarateDataAccesse.clsDataSetting;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace clsKarateBussinse
{
    public class clsSettting
    {

        public SettingDTO SDTO
        {
            get
            {
                return (new SettingDTO(this.PeriodDay));
            }
        }

        public clsSettting(SettingDTO settingDTO)
        {

            this.PeriodDay = settingDTO.PeriodDay;

        }
        public byte PeriodDay { get; set; }

        public static SettingDTO GetPeriodDay ()=> clsDataSetting.GetRowInfoByPeriodID();



    }
}
