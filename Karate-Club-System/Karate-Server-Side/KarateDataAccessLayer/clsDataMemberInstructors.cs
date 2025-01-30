using clsKarateDataAccesseLayer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using static clsKarateDataAccesseLayer.clsDataPerson;
using static clsKarateDataAccesse.clsDataMembers;
using static clsKarateDataAccesse.clsDataInstructors;
using System.Runtime.InteropServices;

namespace clsKarateDataAccesse
{
    public class clsDataMemberInstructors
    {
        public class MemberInstructorDTO
        {
            public MemberInstructorDTO(int? MemberInstructorID, int? MemberID, int? InstructorID,
                              DateTime? AssignDate)
            {
                this.MemberInstructorID = MemberInstructorID;
                this.MemberID = MemberID;
                memberDTO = clsDataMembers.GetRowInfoByMemberID(this.MemberID);
                this.InstructorID = InstructorID;
                instructorDTO = clsDataInstructors.GetRowInfoByInstructorID(this.InstructorID);
                this.AssignDate = AssignDate;
            }

            public int? MemberInstructorID { get; set; }
            public int? MemberID { get; set; }
            public MemberDTO memberDTO;
            public int? InstructorID { get; set; }
            public InstructorDTO instructorDTO;
            public DateTime? AssignDate { get; set; }



        }

    

        public class ViewMemberInstructorDTO
        {
            public ViewMemberInstructorDTO(int? MemberInstructorID,DateTime? AssignDate, string? InstructorName, string? MemberName)
            {
                this.MemberInstructorID = MemberInstructorID;
                this.AssignDate = AssignDate;
                this.InstructorName = InstructorName;
                this.MemberName = MemberName;
            }

            public int? MemberInstructorID { get; set; }
            public DateTime? AssignDate { get; set; }
            public string? InstructorName { get; set; }
            public string? MemberName { get; set; }


        }

        public static MemberInstructorDTO GetRowInfoByMemberID(int? MemberInstructorID)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_GetMemberInstructorByID", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;
                        Command.Parameters.AddWithValue("@MemberInstructorID", (object)MemberInstructorID ?? DBNull.Value);

                        connection.Open();

                        using (SqlDataReader reader = Command.ExecuteReader())
                        {

                            if (reader.Read())
                            {
                                return new MemberInstructorDTO
                                 (
                                 reader.GetInt32(reader.GetOrdinal("MemberInstructorID")),
                                 reader.GetInt32(reader.GetOrdinal("MemberID")),
                                 reader.GetInt32(reader.GetOrdinal("InstructorID")),
                                 reader.GetDateTime(reader.GetOrdinal("AssignDate"))
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
        public static int AddNewRow(MemberInstructorDTO memberInstructorDTO)
        {
            int MemberInstructorID = -1;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))

                {
                    using (SqlCommand Command = new SqlCommand("sp_AddNewMemberInstructors", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;

                        Command.Parameters.AddWithValue("@MemberID", memberInstructorDTO.MemberID);
                        Command.Parameters.AddWithValue("@InstructorID", memberInstructorDTO.InstructorID);
                        Command.Parameters.AddWithValue("@AssignDate", memberInstructorDTO.AssignDate);



                        SqlParameter outputIdParam = new SqlParameter("@MemberInstructorID", SqlDbType.Int)
                        {
                            Direction = ParameterDirection.Output
                        };
                        Command.Parameters.Add(outputIdParam);


                        connection.Open();
                        Command.ExecuteNonQuery();

                        MemberInstructorID = (int)outputIdParam.Value;

                    }
                }
            }
            catch (Exception ex)
            {
                clsLoggingEvent.LoogingEvent("Error: " + ex.Message);
            }
            return MemberInstructorID;

        }
        public static bool UpdateRow(MemberInstructorDTO memberInstructorDTO)
        {

            int RowsAffected = 0;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_UpdateMemberInstructors", connection))
                    {

                        Command.CommandType = CommandType.StoredProcedure;
                        Command.Parameters.AddWithValue("@MemberInstructorID", memberInstructorDTO.MemberInstructorID);
                        Command.Parameters.AddWithValue("@MemberID", memberInstructorDTO.MemberID);
                        Command.Parameters.AddWithValue("@InstructorID", memberInstructorDTO.InstructorID);
                        Command.Parameters.AddWithValue("@AssignDate", memberInstructorDTO.AssignDate);
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
        public static List<ViewMemberInstructorDTO> GetAllRows()
        {

            var MemberInstructorList = new List<ViewMemberInstructorDTO>();
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_GetAllMemberInstructors", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;

                        connection.Open();

                        using (SqlDataReader reader = Command.ExecuteReader())
                        {

                            while (reader.Read())
                            {
                                MemberInstructorList.Add(new ViewMemberInstructorDTO
                                (
                                reader.GetInt32(reader.GetOrdinal("MemberInstructorID")),
                                reader.GetDateTime(reader.GetOrdinal("AssignDate")),
                                reader.GetString(reader.GetOrdinal("InstructorName")),
                                reader.GetString(reader.GetOrdinal("MemberName"))


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


            return MemberInstructorList;

        }
        public static List<ViewMemberInstructorDTO> GetAllRows(int? PageNumber, int? RowsPerPage)
        {

            var MemberInstructorList = new List<ViewMemberInstructorDTO>();
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_FetchMemberInstructor", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;
                        Command.Parameters.AddWithValue("@PageNumber", (object)PageNumber ?? DBNull.Value);
                        Command.Parameters.AddWithValue("@RowsPerPage", (object)RowsPerPage ?? DBNull.Value);

                        connection.Open();

                        using (SqlDataReader reader = Command.ExecuteReader())
                        {

                            while (reader.Read())
                            {
                                MemberInstructorList.Add(new ViewMemberInstructorDTO
                                (
                                reader.GetInt32(reader.GetOrdinal("MemberInstructorID")),
                                reader.GetDateTime(reader.GetOrdinal("AssignDate")),
                                reader.GetString(reader.GetOrdinal("InstructorName")),
                                reader.GetString(reader.GetOrdinal("MemberName"))


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


            return MemberInstructorList;

        }
        public static List<ViewMemberInstructorDTO> GetAllRows(string? Culomn, string? ValueSearch)
        {

            var MemberInstructorList = new List<ViewMemberInstructorDTO>();
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_FetchSearchMemberInstructors", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;
                        Command.Parameters.AddWithValue("@Culomn", (object)Culomn ?? DBNull.Value);
                        Command.Parameters.AddWithValue("@ValueSearch", (object)@ValueSearch ?? DBNull.Value);

                        connection.Open();

                        using (SqlDataReader reader = Command.ExecuteReader())
                        {

                            while (reader.Read())
                            {
                                MemberInstructorList.Add(new ViewMemberInstructorDTO
                                (
                                reader.GetInt32(reader.GetOrdinal("MemberInstructorID")),
                                reader.GetDateTime(reader.GetOrdinal("AssignDate")),
                                reader.GetString(reader.GetOrdinal("InstructorName")),
                                reader.GetString(reader.GetOrdinal("MemberName"))


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


            return MemberInstructorList;

        }

        public static bool DeleteRow(int? MemberInstructorID)
        {

            int RowsAffected = 0;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_DeleteMemberInstructor", connection))
                    {

                        Command.CommandType = CommandType.StoredProcedure;

                        Command.Parameters.AddWithValue("@MemberInstructorID", (object)MemberInstructorID ?? DBNull.Value);

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
        public static bool DoesRowExist(int? MemberInstructorID)
        {
            bool IsFound = false;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_CheckMemberInstructorExist", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;

                        Command.Parameters.AddWithValue("@MemberInstructorID", (object)MemberInstructorID ?? DBNull.Value);

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
        public static bool CheckMemberHasSameInstructor(int? MemberID, int? InstructorID)
        {
            bool IsFound = false;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("SP_CheckMemberHasSameInstructor", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;

                        Command.Parameters.AddWithValue("@MemberID", (object)MemberID ?? DBNull.Value);
                        Command.Parameters.AddWithValue("@InstructorID", (object)InstructorID ?? DBNull.Value);


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
                    using (SqlCommand command = new SqlCommand("sp_CountMemberInstructors", connection))
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
