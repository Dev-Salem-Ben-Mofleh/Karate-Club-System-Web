using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using clsKarateDataAccesseLayer;
using Microsoft.Data.SqlClient;
using static clsKarateDataAccesse.clsDataBeltRanks;
using static clsKarateDataAccesse.clsDataUsers;
using static clsKarateDataAccesseLayer.clsDataPerson;

namespace clsKarateDataAccesse
{
    public class clsDataMembers
    {

        public class MemberDTO
        {
            public MemberDTO(int? MemberID, int? PersonID, string? EmergencyContactInfo, int? LastBeltRankID, bool? IsActive)
            {
                this.MemberID = MemberID;
                this.PersonID = PersonID;
                personDTO = clsDataPerson.GetRowInfoByPersonID(this.PersonID);
                this.EmergencyContactInfo = EmergencyContactInfo;
                this.LastBeltRankID = LastBeltRankID;
                beltRankDTO = clsDataBeltRanks.GetRowInfoByRankID(this.LastBeltRankID);
                this.IsActive = IsActive;
            }

            public int? MemberID { get; set; }
            public int? PersonID { get; set; }
            public PersonDTO personDTO;
            public string? EmergencyContactInfo { get; set; }
            public int? LastBeltRankID { get; set; }
            public BeltRankDTO beltRankDTO;
            public bool? IsActive { get; set; }


        }

        public class ViewMemberDTO
        {
           public ViewMemberDTO(int? MemberID, string? Name, string? BeltRankName, string? Gneder, DateTime? DateOfBirth, string? Phone, bool? IsActive)
            {
                this.MemberID = MemberID;
                this.Name = Name;
                this.BeltRankName = BeltRankName;
                this.Gneder = Gneder;
                this.DateOfBirth = DateOfBirth;
                this.Phone = Phone;
                this.IsActive = IsActive;

            }

            public int? MemberID { get; set; }
            public string? Name { get; set; }
            public string? BeltRankName { get; set; }
            public string? Gneder { get; set; }
            public DateTime? DateOfBirth { get; set; }
            public string? Phone { get; set; }
            public bool? IsActive { get; set; }



        }

        public static MemberDTO GetRowInfoByMemberID(int? MemberID)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_GetMemberByID", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;
                        Command.Parameters.AddWithValue("@MemberID", (object)MemberID ?? DBNull.Value);

                        connection.Open();

                        using (SqlDataReader reader = Command.ExecuteReader())
                        {

                            if (reader.Read())
                            {
                                return new MemberDTO
                                 (
                                  reader.GetInt32(reader.GetOrdinal("MemberID")),
                                 reader.GetInt32(reader.GetOrdinal("PersonID")),
                                 reader.GetString(reader.GetOrdinal("EmergencyContactInfo")),
                                 reader.GetInt32(reader.GetOrdinal("LastBeltRank")),
                                 reader.GetBoolean(reader.GetOrdinal("IsActive"))
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
        public static int AddNewRow(MemberDTO memberDTO)
        {
            int MemberID = -1;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))

                {
                    using (SqlCommand Command = new SqlCommand("sp_AddNewMember", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;

                        Command.Parameters.AddWithValue("@PersonID", memberDTO.PersonID);
                        Command.Parameters.AddWithValue("@EmergencyContactInfo", memberDTO.EmergencyContactInfo);
                        Command.Parameters.AddWithValue("@LastBeltRank", memberDTO.LastBeltRankID);
                        Command.Parameters.AddWithValue("@IsActive", memberDTO.IsActive);


                        SqlParameter outputIdParam = new SqlParameter("@MemberID", SqlDbType.Int)
                        {
                            Direction = ParameterDirection.Output
                        };
                        Command.Parameters.Add(outputIdParam);


                        connection.Open();
                        Command.ExecuteNonQuery();

                        MemberID = (int)outputIdParam.Value;

                    }
                }
            }
            catch (Exception ex)
            {
                clsLoggingEvent.LoogingEvent("Error: " + ex.Message);
            }
            return MemberID;

        }
        public static bool UpdateRow(MemberDTO memberDTO)
        {

            int RowsAffected = 0;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_UpdateMember", connection))
                    {

                        Command.CommandType = CommandType.StoredProcedure;
                        Command.Parameters.AddWithValue("@MemberID", memberDTO.MemberID);
                        Command.Parameters.AddWithValue("@PersonID", memberDTO.PersonID);
                        Command.Parameters.AddWithValue("@EmergencyContactInfo", memberDTO.EmergencyContactInfo);
                        Command.Parameters.AddWithValue("@LastBeltRank", memberDTO.LastBeltRankID);
                        Command.Parameters.AddWithValue("@IsActive", memberDTO.IsActive);

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
        public static List<ViewMemberDTO> GetAllRows()
        {

            var MemberList = new List<ViewMemberDTO>();
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_GetAllMember", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;

                        connection.Open();

                        using (SqlDataReader reader = Command.ExecuteReader())
                        {

                            while (reader.Read())
                            {
                                MemberList.Add(new ViewMemberDTO
                                (
                                reader.GetInt32(reader.GetOrdinal("MemberID")),
                                reader.GetString(reader.GetOrdinal("Name")),
                                reader.GetString(reader.GetOrdinal("RankName")),
                                reader.GetString(reader.GetOrdinal("Gender")),
                                reader.GetDateTime(reader.GetOrdinal("DateOfBirth")),
                                reader.GetString(reader.GetOrdinal("Phone")),
                                reader.GetBoolean(reader.GetOrdinal("IsActive"))
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


            return MemberList;

        }
        public static List<ViewMemberDTO> GetAllRows(int? PageNumber, int? RowsPerPage,string? filter)
        {

            var MemberList = new List<ViewMemberDTO>();
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_FetchMembers", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;

                        Command.Parameters.AddWithValue("@PageNumber", (object)PageNumber ?? DBNull.Value);
                        Command.Parameters.AddWithValue("@RowsPerPage", (object)RowsPerPage ?? DBNull.Value);
                        Command.Parameters.AddWithValue("@filter", (object)filter ?? DBNull.Value);


                        connection.Open();

                        using (SqlDataReader reader = Command.ExecuteReader())
                        {

                            while (reader.Read())
                            {
                                MemberList.Add(new ViewMemberDTO
                                (
                                reader.GetInt32(reader.GetOrdinal("MemberID")),
                                reader.GetString(reader.GetOrdinal("Name")),
                                reader.GetString(reader.GetOrdinal("RankName")),
                                reader.GetString(reader.GetOrdinal("Gender")),
                                reader.GetDateTime(reader.GetOrdinal("DateOfBirth")),
                                reader.GetString(reader.GetOrdinal("Phone")),
                                reader.GetBoolean(reader.GetOrdinal("IsActive"))
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


            return MemberList;

        }
        public static List<ViewMemberDTO> GetAllRows( string? Culomn, string? ValueSearch)
        {

            var MemberList = new List<ViewMemberDTO>();
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_FetchSearchMembers", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;

                        Command.Parameters.AddWithValue("@Culomn", (object)Culomn ?? DBNull.Value);
                        Command.Parameters.AddWithValue("@ValueSearch", (object)@ValueSearch ?? DBNull.Value);


                        connection.Open();

                        using (SqlDataReader reader = Command.ExecuteReader())
                        {

                            while (reader.Read())
                            {
                                MemberList.Add(new ViewMemberDTO
                                (
                                reader.GetInt32(reader.GetOrdinal("MemberID")),
                                reader.GetString(reader.GetOrdinal("Name")),
                                reader.GetString(reader.GetOrdinal("RankName")),
                                reader.GetString(reader.GetOrdinal("Gender")),
                                reader.GetDateTime(reader.GetOrdinal("DateOfBirth")),
                                reader.GetString(reader.GetOrdinal("Phone")),
                                reader.GetBoolean(reader.GetOrdinal("IsActive"))
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


            return MemberList;

        }
        public static List<ViewMemberDTO> GetAllRows(int? InstructorID,int? PageNumber, int? RowsPerPage)
        {

            var MemberList = new List<ViewMemberDTO>();
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_FetchAllMembersTrainedByInstructor", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;
                        Command.Parameters.AddWithValue("@InstructorID", (object)InstructorID ?? DBNull.Value);
                        Command.Parameters.AddWithValue("@PageNumber", (object)PageNumber ?? DBNull.Value);
                        Command.Parameters.AddWithValue("@RowsPerPage", (object)RowsPerPage ?? DBNull.Value);


                        connection.Open();

                        using (SqlDataReader reader = Command.ExecuteReader())
                        {

                            while (reader.Read())
                            {
                                MemberList.Add(new ViewMemberDTO
                                (
                                reader.GetInt32(reader.GetOrdinal("MemberID")),
                                reader.GetString(reader.GetOrdinal("Name")),
                                reader.GetString(reader.GetOrdinal("RankName")),
                                reader.GetString(reader.GetOrdinal("Gender")),
                                reader.GetDateTime(reader.GetOrdinal("DateOfBirth")),
                                reader.GetString(reader.GetOrdinal("Phone")),
                                reader.GetBoolean(reader.GetOrdinal("IsActive"))
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


            return MemberList;

        }
        public static bool DeleteRow(int? MemberID)
        {

            int RowsAffected = 0;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_DeleteMember", connection))
                    {

                        Command.CommandType = CommandType.StoredProcedure;

                        Command.Parameters.AddWithValue("@MemberID", (object)MemberID ?? DBNull.Value);

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
        public static bool DoesRowExist(int? MemberID)
        {
            bool IsFound = false;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_CheckMemberExite", connection))
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
        public static bool CheckMemberIsActive(int? MemberID)
        {
            bool IsFound = false;
            try
            {

                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    connection.Open();


                    using (SqlCommand Command = new SqlCommand("SP_CheckMemberIsActive", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;

                        Command.Parameters.AddWithValue("@MemberID", (object)MemberID ?? DBNull.Value);

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
        public static int Count(int? InstructorID)
        {
            int countMembers = 0;

            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand command = new SqlCommand("sp_CountTrainedMembers", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@InstructorID", (object)InstructorID ?? DBNull.Value);


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
        public static int Count(string? filter)
        {
            int countMembers = 0;

            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand command = new SqlCommand("sp_CountMembers", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@filter", (object)filter ?? DBNull.Value);

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
