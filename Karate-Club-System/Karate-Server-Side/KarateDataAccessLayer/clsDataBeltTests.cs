using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using clsKarateDataAccesseLayer;
using Microsoft.Data.SqlClient;
using static System.Runtime.InteropServices.JavaScript.JSType;
using static clsKarateDataAccesse.clsDataBeltRanks;
using static clsKarateDataAccesse.clsDataInstructors;
using static clsKarateDataAccesse.clsDataMembers;


namespace clsKarateDataAccesse
{
    public class clsDataBeltTests
    {
        public class BeltTestDTO
        {
            public BeltTestDTO(int? TestID, int? MemberID, int? RankID, bool? Result, DateTime? Date,
                              int? TestedByInstructorID, int? PaymentID)
            {
                this.TestID = TestID;
                this.MemberID = MemberID;
                memberDTO = clsDataMembers.GetRowInfoByMemberID(this.MemberID);
                this.RankID = RankID;
                beltRankDTO = clsDataBeltRanks.GetRowInfoByRankID(this.RankID);
                this.Result = Result;
                this.Date = Date;
                this.TestedByInstructorID = TestedByInstructorID;
                instructorDTO = clsDataInstructors.GetRowInfoByInstructorID(this.TestedByInstructorID);
                this.PaymentID = PaymentID;


            }

            public int? TestID { get; set; }
            public int? MemberID { get; set; }
            public MemberDTO memberDTO;
            public int? RankID { get; set; }
            public BeltRankDTO beltRankDTO;

            public bool? Result { get; set; }
            public DateTime? Date { get; set; }
            public int? TestedByInstructorID { get; set; }
            public InstructorDTO instructorDTO;

            public int? PaymentID { get; set; }



        }


        public class ViewBeltTestDTO
        {

            public ViewBeltTestDTO(int? TestID,bool? Result, DateTime? Date, int? PaymentID, string? InstructorName, string? MemberName, string? RankName)
            {
                this.TestID = TestID;
                this.Result = Result;
                this.Date = Date;
                this.PaymentID = PaymentID;
                this.InstructorName = InstructorName;
                this.MemberName = MemberName;
                this.RankName = RankName;


            }

            public int? TestID { get; set; }

            public bool? Result { get; set; }
            public DateTime? Date { get; set; }
            public int? PaymentID { get; set; }
            public string? InstructorName { get; set; }
            public string? MemberName { get; set; }
            public string? RankName { get; set; }


        }

        public static BeltTestDTO GetRowInfoByTestID(int? TestID)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_GetBeltTestByID", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;
                        Command.Parameters.AddWithValue("@TestID", (object)TestID ?? DBNull.Value);

                        connection.Open();

                        using (SqlDataReader reader = Command.ExecuteReader())
                        {

                            if (reader.Read())
                            {
                                return new BeltTestDTO
                                 (
                                reader.GetInt32(reader.GetOrdinal("TestID")),
                                reader.GetInt32(reader.GetOrdinal("MemberID")),
                                 reader.GetInt32(reader.GetOrdinal("RankID")),
                                 reader.GetBoolean(reader.GetOrdinal("Result")),
                                 reader.GetDateTime(reader.GetOrdinal("Date")),
                                 reader.GetInt32(reader.GetOrdinal("TestedByInstructorID")),
                                 reader.IsDBNull(reader.GetOrdinal("PaymentID")) ? null :
                                 reader.GetInt32(reader.GetOrdinal("PaymentID"))
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
        public static int AddNewRow(BeltTestDTO beltTestDTO )
        {
            int TestID = -1;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))

                {
                    using (SqlCommand Command = new SqlCommand("sp_AddNewTest", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;


                        Command.Parameters.AddWithValue("@MemberID", beltTestDTO.MemberID);
                        Command.Parameters.AddWithValue("@RankID", beltTestDTO.RankID);
                        Command.Parameters.AddWithValue("@Result", beltTestDTO.Result);
                        Command.Parameters.AddWithValue("@Date", beltTestDTO.Date);
                        Command.Parameters.AddWithValue("@TestedByInstructorID", beltTestDTO.TestedByInstructorID);


                        if (beltTestDTO.PaymentID.HasValue)
                            Command.Parameters.AddWithValue("@PaymentID", beltTestDTO.PaymentID);
                        else
                            Command.Parameters.AddWithValue("@PaymentID", DBNull.Value);


                        SqlParameter outputIdParam = new SqlParameter("@TestID", SqlDbType.Int)
                        {
                            Direction = ParameterDirection.Output
                        };
                        Command.Parameters.Add(outputIdParam);


                        connection.Open();
                        Command.ExecuteNonQuery();

                        TestID = (int)outputIdParam.Value;

                    }
                }
            }
            catch (Exception ex)
            {
                clsLoggingEvent.LoogingEvent("Error: " + ex.Message);
            }
            return TestID;

        }
        public static bool UpdateRow(BeltTestDTO beltTestDTO )
        {

            int RowsAffected = 0;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_UpdateTest", connection))
                    {

                        Command.CommandType = CommandType.StoredProcedure;
                        Command.Parameters.AddWithValue("@TestID", beltTestDTO.TestID);
                        Command.Parameters.AddWithValue("@MemberID", beltTestDTO.MemberID);
                        Command.Parameters.AddWithValue("@RankID", beltTestDTO.RankID);
                        Command.Parameters.AddWithValue("@Result", beltTestDTO.Result);
                        Command.Parameters.AddWithValue("@Date", beltTestDTO.Date);
                        Command.Parameters.AddWithValue("@TestedByInstructorID", beltTestDTO.TestedByInstructorID);


                        if (beltTestDTO.PaymentID.HasValue)
                            Command.Parameters.AddWithValue("@PaymentID", beltTestDTO.PaymentID);
                        else
                            Command.Parameters.AddWithValue("@PaymentID", DBNull.Value);

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
        public static List<ViewBeltTestDTO> GetAllRows()
        {

            var BeltTestList = new List<ViewBeltTestDTO>();
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_GetAllBeltTests", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;

                        connection.Open();

                        using (SqlDataReader reader = Command.ExecuteReader())
                        {

                            while (reader.Read())
                            {
                                BeltTestList.Add(new ViewBeltTestDTO
                                (
                                reader.GetInt32(reader.GetOrdinal("TestID")),
                                reader.GetBoolean(reader.GetOrdinal("Result")),
                                reader.GetDateTime(reader.GetOrdinal("Date")),
                                reader.IsDBNull(reader.GetOrdinal("PaymentID")) ? null :
                                reader.GetInt32(reader.GetOrdinal("PaymentID")),
                                reader.GetString(reader.GetOrdinal("InstructorName")),
                                reader.GetString(reader.GetOrdinal("MemberName")),
                                reader.GetString(reader.GetOrdinal("RankName"))

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


            return BeltTestList;

        }
        public static List<ViewBeltTestDTO> GetAllRows(DateTime? ToDate)
        {

            var BeltTestList = new List<ViewBeltTestDTO>();
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_GetBeltTestsToDate", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;
                        Command.Parameters.AddWithValue("@ToDate", (object)ToDate ?? DBNull.Value);


                        connection.Open();

                        using (SqlDataReader reader = Command.ExecuteReader())
                        {

                            while (reader.Read())
                            {
                                BeltTestList.Add(new ViewBeltTestDTO
                                (
                                reader.GetInt32(reader.GetOrdinal("TestID")),
                                reader.GetBoolean(reader.GetOrdinal("Result")),
                                reader.GetDateTime(reader.GetOrdinal("Date")),
                                reader.IsDBNull(reader.GetOrdinal("PaymentID")) ? null :
                                reader.GetInt32(reader.GetOrdinal("PaymentID")),
                                reader.GetString(reader.GetOrdinal("InstructorName")),
                                reader.GetString(reader.GetOrdinal("MemberName")),
                                reader.GetString(reader.GetOrdinal("RankName"))

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


            return BeltTestList;

        }

        public static List<ViewBeltTestDTO> GetAllRows(int? PageNumber, int? RowsPerPage)
        {

            var BeltTestList = new List<ViewBeltTestDTO>();
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_FetchBeltTests", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;

                        Command.Parameters.AddWithValue("@PageNumber", (object)PageNumber ?? DBNull.Value);
                        Command.Parameters.AddWithValue("@RowsPerPage", (object)RowsPerPage ?? DBNull.Value);

                        connection.Open();

                        using (SqlDataReader reader = Command.ExecuteReader())
                        {

                            while (reader.Read())
                            {
                                BeltTestList.Add(new ViewBeltTestDTO
                                (
                                reader.GetInt32(reader.GetOrdinal("TestID")),
                                reader.GetBoolean(reader.GetOrdinal("Result")),
                                reader.GetDateTime(reader.GetOrdinal("Date")),
                                reader.IsDBNull(reader.GetOrdinal("PaymentID")) ? null :
                                reader.GetInt32(reader.GetOrdinal("PaymentID")),
                                reader.GetString(reader.GetOrdinal("InstructorName")),
                                reader.GetString(reader.GetOrdinal("MemberName")),
                                reader.GetString(reader.GetOrdinal("RankName"))

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


            return BeltTestList;

        }
        public static List<ViewBeltTestDTO> GetAllRows(string? Culomn, string? ValueSearch)
        {

            var BeltTestList = new List<ViewBeltTestDTO>();
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_FetchSearchBeltTests", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;

                        Command.Parameters.AddWithValue("@Culomn", (object)Culomn ?? DBNull.Value);
                        Command.Parameters.AddWithValue("@ValueSearch", (object)ValueSearch ?? DBNull.Value);

                        connection.Open();

                        using (SqlDataReader reader = Command.ExecuteReader())
                        {

                            while (reader.Read())
                            {
                                BeltTestList.Add(new ViewBeltTestDTO
                                (
                                reader.GetInt32(reader.GetOrdinal("TestID")),
                                reader.GetBoolean(reader.GetOrdinal("Result")),
                                reader.GetDateTime(reader.GetOrdinal("Date")),
                                reader.IsDBNull(reader.GetOrdinal("PaymentID")) ? null :
                                reader.GetInt32(reader.GetOrdinal("PaymentID")),
                                reader.GetString(reader.GetOrdinal("InstructorName")),
                                reader.GetString(reader.GetOrdinal("MemberName")),
                                reader.GetString(reader.GetOrdinal("RankName"))

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


            return BeltTestList;

        }

        public static List<ViewBeltTestDTO> GetAllRows(int? MemberID, int? PageNumber, int? RowsPerPage)
        {

            var BeltTestList = new List<ViewBeltTestDTO>();
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_FetchBeltTestByMemberID", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;
                        Command.Parameters.AddWithValue("@MemberID", (object)MemberID ?? DBNull.Value);
                        Command.Parameters.AddWithValue("@PageNumber", (object)PageNumber ?? DBNull.Value);
                        Command.Parameters.AddWithValue("@RowsPerPage", (object)RowsPerPage ?? DBNull.Value);


                        connection.Open();

                        using (SqlDataReader reader = Command.ExecuteReader())
                        {

                            while (reader.Read())
                            {
                                BeltTestList.Add(new ViewBeltTestDTO
                                (
                                reader.GetInt32(reader.GetOrdinal("TestID")),
                                reader.GetBoolean(reader.GetOrdinal("Result")),
                                reader.GetDateTime(reader.GetOrdinal("Date")),
                                reader.IsDBNull(reader.GetOrdinal("PaymentID")) ? null :
                                reader.GetInt32(reader.GetOrdinal("PaymentID")),
                                reader.GetString(reader.GetOrdinal("InstructorName")),
                                reader.GetString(reader.GetOrdinal("MemberName")),
                                reader.GetString(reader.GetOrdinal("RankName"))

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


            return BeltTestList;

        }
        public static bool DeleteRow(int? TestID)
        {

            int RowsAffected = 0;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_DeleteBeltTest", connection))
                    {

                        Command.CommandType = CommandType.StoredProcedure;

                        Command.Parameters.AddWithValue("@TestID", (object)TestID ?? DBNull.Value);

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
        public static bool DoesRowExist(int? TestID)
        {
            bool IsFound = false;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_CheckBeltTestExist", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;

                        Command.Parameters.AddWithValue("@TestID", (object)TestID ?? DBNull.Value);

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
            int countBeltTests = 0;

            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand command = new SqlCommand("sp_CountBeltTest", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        connection.Open();
                        SqlParameter returnParameter = new SqlParameter(@"ReturnVal", SqlDbType.TinyInt)
                        {
                            Direction = ParameterDirection.ReturnValue
                        };
                        command.Parameters.Add(returnParameter);

                        command.ExecuteNonQuery();

                        countBeltTests = (int)returnParameter.Value;

                    }
                }
            }
            catch (Exception ex)
            {
                clsLoggingEvent.LoogingEvent("Error: " + ex.Message);
            }
            return countBeltTests;
        }

        public static int Count(int? MemberID)
        {
            int countBeltTests = 0;

            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand command = new SqlCommand("sp_CountPeriodsByMemberID", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@MemberID", (object)MemberID ?? DBNull.Value);

                        connection.Open();
                        SqlParameter returnParameter = new SqlParameter(@"ReturnVal", SqlDbType.TinyInt)
                        {
                            Direction = ParameterDirection.ReturnValue
                        };
                        command.Parameters.Add(returnParameter);

                        command.ExecuteNonQuery();

                        countBeltTests = (int)returnParameter.Value;

                    }
                }
            }
            catch (Exception ex)
            {
                clsLoggingEvent.LoogingEvent("Error: " + ex.Message);
            }
            return countBeltTests;
        }
        public static bool GetPassLastRankNameForTests(int? MemberID, int? RankID)
        {
            bool IsFound = false;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("CheckPassLastRankNameForTest", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;

                        Command.Parameters.AddWithValue("@MemberID", (object)MemberID ?? DBNull.Value);
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
        public static bool CheckMemberIsActive(int? MemberID)
        {
            bool IsFound = false;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("SP_CheckMemberIsActive", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;

                        Command.Parameters.AddWithValue("@MemberID", (object)MemberID ?? DBNull.Value);


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

    }
}
