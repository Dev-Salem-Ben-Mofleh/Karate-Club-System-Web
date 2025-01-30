using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.InteropServices.ComTypes;
using Microsoft.Data.SqlClient;
using clsKarateDataAccesseLayer;
using static clsKarateDataAccesseLayer.clsDataPerson;

namespace clsKarateDataAccesse
{
    public class clsDataSetting
    {
        public class SettingDTO
        {
            public SettingDTO(byte PeriodDay)
            {
                this.PeriodDay = PeriodDay;


            }
            public byte PeriodDay { get; set; }

        }

        public static SettingDTO GetRowInfoByPeriodID()
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_GetNumberOfPeriod", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;

                        connection.Open();

                        using (SqlDataReader reader = Command.ExecuteReader())
                        {

                            if (reader.Read())
                            {
                                return new SettingDTO
                                 (
                                  reader.GetByte(reader.GetOrdinal("PeriodDay"))
                                );
                            }
                            else
                            {
                                return null;
                            }

                        }
                    }
                }
            }
            catch (Exception ex)
            {
                clsLoggingEvent.LoogingEvent("Error: " + ex.Message);
            }
            return null;



        }

    }
}
