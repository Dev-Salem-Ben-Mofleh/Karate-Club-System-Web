using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using clsKarateDataAccesseLayer;
using Microsoft.Data.SqlClient;
using static clsKarateDataAccesse.clsDataMembers;
using static clsKarateDataAccesseLayer.clsDataPerson;

namespace clsKarateDataAccesse
{
    public class clsDataInstructors
    {

        public class InstructorDTO
        {
            public InstructorDTO(int? InstructorID, int? PersonID, string? Qualification)
            {
                this.InstructorID = InstructorID;
                this.PersonID = PersonID;
                personDTO = clsDataPerson.GetRowInfoByPersonID(this.PersonID);
                this.Qualification = Qualification;
       
            }

            public int? InstructorID { get; set; }
            public int? PersonID { get; set; }
            public PersonDTO personDTO;
            public string? Qualification { get; set; }


        }

        public class ViewInstructorDTO
        {
            public ViewInstructorDTO(int? InstructorID, string? Qualification,
                              string? Name, string? Gneder, DateTime? DateOfBirth, string? Phone)
            {
                this.InstructorID = InstructorID;
                this.Qualification = Qualification;
                this.Name = Name;
                this.Gneder = Gneder;
                this.DateOfBirth = DateOfBirth;
                this.Phone = Phone;

            }

            public int? InstructorID { get; set; }
            public string? Qualification { get; set; }
            public string? Name { get; set; }
            public string? Gneder { get; set; }
            public DateTime? DateOfBirth { get; set; }
            public string? Phone { get; set; }


        }

        public static InstructorDTO GetRowInfoByInstructorID(int? InstructorID)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_GetInstructorByID", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;
                        Command.Parameters.AddWithValue("@InstructorID", (object)InstructorID ?? DBNull.Value);

                        connection.Open();

                        using (SqlDataReader reader = Command.ExecuteReader())
                        {

                            if (reader.Read())
                            {
                                return new InstructorDTO
                                 (
                                  reader.GetInt32(reader.GetOrdinal("InstructorID")),
                                 reader.GetInt32(reader.GetOrdinal("PersonID")),
                                 reader.IsDBNull(reader.GetOrdinal("Qualification")) ? null :
                                 reader.GetString(reader.GetOrdinal("Qualification"))
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
        public static int AddNewRow(InstructorDTO instructorDTO)
        {
            int InstructorID = -1;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))

                {
                    using (SqlCommand Command = new SqlCommand("sp_AddNewInstructor", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;

                        Command.Parameters.AddWithValue("@PersonID", instructorDTO.PersonID);
                        if (instructorDTO.Qualification != null && instructorDTO.Qualification.ToString() != string.Empty)
                            Command.Parameters.AddWithValue("@Qualification", instructorDTO.Qualification);
                        else
                            Command.Parameters.AddWithValue("@Qualification", DBNull.Value);


                        SqlParameter outputIdParam = new SqlParameter("@InstructorID", SqlDbType.Int)
                        {
                            Direction = ParameterDirection.Output
                        };
                        Command.Parameters.Add(outputIdParam);


                        connection.Open();
                        Command.ExecuteNonQuery();

                        InstructorID = (int)outputIdParam.Value;

                    }
                }
            }
            catch (Exception ex)
            {
                clsLoggingEvent.LoogingEvent("Error: " + ex.Message);
            }
            return InstructorID;

        }
        public static bool UpdateRow(InstructorDTO instructorDTO)
        {

            int RowsAffected = 0;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_UpdateInstructor", connection))
                    {

                        Command.CommandType = CommandType.StoredProcedure;
                        Command.Parameters.AddWithValue("@InstructorID", instructorDTO.InstructorID);
                        Command.Parameters.AddWithValue("@PersonID", instructorDTO.PersonID);

                        if (instructorDTO.Qualification != null && instructorDTO.Qualification.ToString() != string.Empty)
                            Command.Parameters.AddWithValue("@Qualification", instructorDTO.Qualification);
                        else
                            Command.Parameters.AddWithValue("@Qualification", DBNull.Value);
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
        public static List<ViewInstructorDTO> GetAllRows()
        {

            var InstructorList = new List<ViewInstructorDTO>();
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_GetAllInstructors", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;

                        connection.Open();

                        using (SqlDataReader reader = Command.ExecuteReader())
                        {

                            while (reader.Read())
                            {
                                InstructorList.Add(new ViewInstructorDTO
                                (
                                reader.GetInt32(reader.GetOrdinal("InstructorID")),
                                reader.IsDBNull(reader.GetOrdinal("Qualification")) ? null :
                                reader.GetString(reader.GetOrdinal("Qualification")), reader.GetString(reader.GetOrdinal("Name")),
                                reader.GetString(reader.GetOrdinal("Gender")),
                                reader.GetDateTime(reader.GetOrdinal("DateOfBirth")),
                                reader.GetString(reader.GetOrdinal("Phone"))

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


            return InstructorList;

        }
        public static List<ViewInstructorDTO> GetAllRows(int? PageNumber, int? RowsPerPage)
        {

            var InstructorList = new List<ViewInstructorDTO>();
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_FetchInstructors", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;

                        Command.Parameters.AddWithValue("@PageNumber", (object)PageNumber ?? DBNull.Value);
                        Command.Parameters.AddWithValue("@RowsPerPage", (object)RowsPerPage ?? DBNull.Value);
                        connection.Open();

                        using (SqlDataReader reader = Command.ExecuteReader())
                        {

                            while (reader.Read())
                            {
                                InstructorList.Add(new ViewInstructorDTO
                                (
                                reader.GetInt32(reader.GetOrdinal("InstructorID")),
                                reader.IsDBNull(reader.GetOrdinal("Qualification")) ? null :
                                reader.GetString(reader.GetOrdinal("Qualification")), reader.GetString(reader.GetOrdinal("Name")),
                                reader.GetString(reader.GetOrdinal("Gender")),
                                reader.GetDateTime(reader.GetOrdinal("DateOfBirth")),
                                reader.GetString(reader.GetOrdinal("Phone"))

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


            return InstructorList;

        }
        public static List<ViewInstructorDTO> GetAllRows(string? Culomn, string? ValueSearch)
        {

            var InstructorList = new List<ViewInstructorDTO>();
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_FetchSearchInstructors", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;

                        Command.Parameters.AddWithValue("@Culomn", (object)Culomn ?? DBNull.Value);
                        Command.Parameters.AddWithValue("@ValueSearch", (object)@ValueSearch ?? DBNull.Value);

                        connection.Open();

                        using (SqlDataReader reader = Command.ExecuteReader())
                        {

                            while (reader.Read())
                            {
                                InstructorList.Add(new ViewInstructorDTO
                                (
                                reader.GetInt32(reader.GetOrdinal("InstructorID")),
                                reader.IsDBNull(reader.GetOrdinal("Qualification")) ? null :
                                reader.GetString(reader.GetOrdinal("Qualification")), reader.GetString(reader.GetOrdinal("Name")),
                                reader.GetString(reader.GetOrdinal("Gender")),
                                reader.GetDateTime(reader.GetOrdinal("DateOfBirth")),
                                reader.GetString(reader.GetOrdinal("Phone"))

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


            return InstructorList;

        }

        public static bool DeleteRow(int? InstructorID)
        {

            int RowsAffected = 0;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_DeleteInstructors", connection))
                    {

                        Command.CommandType = CommandType.StoredProcedure;

                        Command.Parameters.AddWithValue("@InstructorID", (object)InstructorID ?? DBNull.Value);

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
        public static bool DoesRowExist(int? InstructorID)
        {
            bool IsFound = false;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_CheckInstructorsExiste", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;

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
            int countInstructors = 0;

            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand command = new SqlCommand("dbo.CountInstructors", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        connection.Open();
                        SqlParameter returnParameter = new SqlParameter(@"ReturnVal", SqlDbType.TinyInt)
                        {
                            Direction = ParameterDirection.ReturnValue
                        };
                        command.Parameters.Add(returnParameter);

                        command.ExecuteNonQuery();

                        countInstructors = (int)returnParameter.Value;

                    }
                }
            }
            catch (Exception ex)
            {
                clsLoggingEvent.LoogingEvent("Error: " + ex.Message);
            }
            return countInstructors;
        }

    }
}
