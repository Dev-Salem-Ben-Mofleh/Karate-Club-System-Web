using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using clsKarateDataAccesseLayer;
using Microsoft.Data.SqlClient;
using static clsKarateDataAccesse.clsDataInstructors;
using static clsKarateDataAccesseLayer.clsDataPerson;


namespace clsKarateDataAccesse
{
    public class clsDataBeltRanks
    {
        public class BeltRankDTO
        {
            public BeltRankDTO(int? RankID, string RankName, decimal TestFees)
            {
                this.RankID = RankID;
                this.RankName = RankName;
                this.TestFees = TestFees;

            }

            public int? RankID { get; set; }
            public string RankName { get; set; }
            public decimal TestFees { get; set; }


        }
        public static BeltRankDTO GetRowInfoByRankID(int? RankID)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_GetBeltRankByID", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;
                        Command.Parameters.AddWithValue("@RankID", (object)RankID ?? DBNull.Value);

                        connection.Open();

                        using (SqlDataReader reader = Command.ExecuteReader())
                        {

                            if (reader.Read())
                            {
                                return new BeltRankDTO
                                 (
                                 reader.GetInt32(reader.GetOrdinal("RankID")),
                                 reader.GetString(reader.GetOrdinal("RankName")),
                                 reader.GetDecimal(reader.GetOrdinal("TestFees"))
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
        public static int AddNewRow(BeltRankDTO beltRankDTO)
        {
            int RankID = -1;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))

                {
                    using (SqlCommand Command = new SqlCommand("sp_AddNewBeltRank", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;
                        Command.Parameters.AddWithValue("@RankName", beltRankDTO.RankName);
                        Command.Parameters.AddWithValue("@TestFees", beltRankDTO.TestFees);



                        SqlParameter outputIdParam = new SqlParameter("@RankID", SqlDbType.Int)
                        {
                            Direction = ParameterDirection.Output
                        };
                        Command.Parameters.Add(outputIdParam);


                        connection.Open();
                        Command.ExecuteNonQuery();

                        RankID = (int)outputIdParam.Value;

                    }
                }
            }
            catch (Exception ex)
            {
                clsLoggingEvent.LoogingEvent("Error: " + ex.Message);
            }
            return RankID;

        }
        public static bool UpdateRow(BeltRankDTO beltRankDTO)
        {

            int RowsAffected = 0;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_UpdateBeltRank", connection))
                    {

                        Command.CommandType = CommandType.StoredProcedure;

                        Command.Parameters.AddWithValue("@RankID", beltRankDTO.RankID);
                        Command.Parameters.AddWithValue("@RankName", beltRankDTO.RankName);
                        Command.Parameters.AddWithValue("@TestFees", beltRankDTO.TestFees);
                        connection.Open();
                        RowsAffected = Command.ExecuteNonQuery();

                    }
                }
            }
            catch (Exception ex)
            {
                clsLoggingEvent.LoogingEvent("Error: " + ex.Message);

                return false;
            }

            return (RowsAffected > 0);

        }
      
        public static List<BeltRankDTO> GetAllRows()
        {

            var BeltRankList = new List<BeltRankDTO>();
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_GetAllBeltRanks", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;

                        connection.Open();

                        using (SqlDataReader reader = Command.ExecuteReader())
                        {

                            while (reader.Read())
                            {
                                BeltRankList.Add(new BeltRankDTO
                                (
                                reader.GetInt32(reader.GetOrdinal("RankID")),
                                reader.GetString(reader.GetOrdinal("RankName")),
                                reader.GetDecimal(reader.GetOrdinal("TestFees"))


                                ));
                            }
                        }
                    }
                }

            }
            catch (Exception ex)
            {
                clsLoggingEvent.LoogingEvent("Error: " + ex.Message);
            }


            return BeltRankList;

        }

        public static List<BeltRankDTO> GetAllRows(int? PageNumber, int? RowsPerPage)
        {

            var BeltRankList = new List<BeltRankDTO>();
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_FetchBeltRanks", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;
                        Command.Parameters.AddWithValue("@PageNumber", (object)PageNumber ?? DBNull.Value);
                        Command.Parameters.AddWithValue("@RowsPerPage", (object)RowsPerPage ?? DBNull.Value);

                        connection.Open();

                        using (SqlDataReader reader = Command.ExecuteReader())
                        {

                            while (reader.Read())
                            {
                                BeltRankList.Add(new BeltRankDTO
                                (
                                reader.GetInt32(reader.GetOrdinal("RankID")),
                                reader.GetString(reader.GetOrdinal("RankName")),
                                reader.GetDecimal(reader.GetOrdinal("TestFees"))


                                ));
                            }
                        }
                    }
                }

            }
            catch (Exception ex)
            {
                clsLoggingEvent.LoogingEvent("Error: " + ex.Message);
            }


            return BeltRankList;

        }

        public static List<BeltRankDTO> GetAllRows(string? Culomn, string? ValueSearch)
        {

            var BeltRankList = new List<BeltRankDTO>();
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_FetchSearchBeltRanks", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;
                        Command.Parameters.AddWithValue("@Culomn", (object)Culomn ?? DBNull.Value);
                        Command.Parameters.AddWithValue("@ValueSearch", (object)ValueSearch ?? DBNull.Value);

                        connection.Open();

                        using (SqlDataReader reader = Command.ExecuteReader())
                        {

                            while (reader.Read())
                            {
                                BeltRankList.Add(new BeltRankDTO
                                (
                                reader.GetInt32(reader.GetOrdinal("RankID")),
                                reader.GetString(reader.GetOrdinal("RankName")),
                                reader.GetDecimal(reader.GetOrdinal("TestFees"))


                                ));
                            }
                        }
                    }
                }

            }
            catch (Exception ex)
            {
                clsLoggingEvent.LoogingEvent("Error: " + ex.Message);
            }


            return BeltRankList;

        }

        public static bool DeleteRow(int? RankID)
        {

            int RowsAffected = 0;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_DeleteBeltRank", connection))
                    {

                        Command.CommandType = CommandType.StoredProcedure;

                        Command.Parameters.AddWithValue("@RankID", (object)RankID ?? DBNull.Value);

                        connection.Open();
                        RowsAffected = Command.ExecuteNonQuery();

                    }
                }
            }
            catch (Exception ex)
            {
                clsLoggingEvent.LoogingEvent("Error: " + ex.Message);

                return false;
            }

            return (RowsAffected > 0);

        }
        public static bool DoesRowExist(int? RankID)
        {
            bool IsFound = false;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_CheckBeltRankExist", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;

                        Command.Parameters.AddWithValue("@RankID", (object)RankID ?? DBNull.Value);

                        connection.Open();

                        SqlParameter returnParameter = new SqlParameter(@"ReturnVal", SqlDbType.TinyInt)
                        {
                            Direction = ParameterDirection.ReturnValue
                        };
                        Command.Parameters.Add(returnParameter);

                        Command.ExecuteNonQuery();

                        IsFound = ((int)returnParameter.Value == 1);
                    }
                }
            }
            catch (Exception ex)
            {
                clsLoggingEvent.LoogingEvent("Error: " + ex.Message);
            }


            return IsFound;
        }
        public static int Count()
        {
            int countMembers = 0;

            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand command = new SqlCommand("sp_CountBeltRanks", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        connection.Open();
                        SqlParameter returnParameter = new SqlParameter(@"ReturnVal", SqlDbType.TinyInt)
                        {
                            Direction = ParameterDirection.ReturnValue
                        };
                        command.Parameters.Add(returnParameter);

                        command.ExecuteNonQuery();

                        countMembers = (int)returnParameter.Value;

                    }
                }
            }
            catch (Exception ex)
            {
                clsLoggingEvent.LoogingEvent("Error: " + ex.Message);
            }
            return countMembers;
        }


    }
}
