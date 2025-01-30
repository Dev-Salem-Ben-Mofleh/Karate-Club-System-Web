using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Security;
using System.Text;
using System.Threading.Tasks;
using clsKarateDataAccesseLayer;
using Microsoft.Data.SqlClient;
using static clsKarateDataAccesseLayer.clsDataPerson;

namespace clsKarateDataAccesse
{
    public class clsDataUsers
    {
        public class UserDTO
        {
            public UserDTO(int? UserID,int? PersonID, string UserName, string Password, bool? IsActive,
                             byte? Permission)
            {
                this.UserID = UserID;
                this.PersonID = PersonID;
                personDTO = clsDataPerson.GetRowInfoByPersonID(this.PersonID);
                this.UserName = UserName;
                this.Password = Password;
                this.IsActive = IsActive;
                this.Permission = Permission;
            }

            public int? UserID { get; set; }
            public int? PersonID { get; set; }
            public PersonDTO personDTO;
            public string? UserName { get; set; }
            public string? Password { get; set; }
            public bool? IsActive { get; set; }
            public byte? Permission { get; set; }


        }

        public class ViewUserDTO
        {
            public ViewUserDTO(int? UserID, string UserName, bool? IsActive,
                              string? Name, string? Gneder, DateTime? DateOfBirth, string? Phone)
            {
                this.UserID = UserID;
                this.UserName = UserName;
                this.IsActive = IsActive;
                this.Name = Name;
                this.Gneder = Gneder;
                this.DateOfBirth = DateOfBirth;
                this.Phone = Phone;
            }

            public int? UserID { get; set; }
    
            public string? UserName { get; set; }
            public bool? IsActive { get; set; }
            public string? Name { get; set; }
            public string? Gneder { get; set; }
            public DateTime? DateOfBirth { get; set; }
            public string? Phone { get; set; }


        }

        public static UserDTO GetRowInfoByUserID(int? UserID)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_GetUserByID", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;
                        Command.Parameters.AddWithValue("@UserID", (object)UserID ?? DBNull.Value);

                        connection.Open();

                        using (SqlDataReader reader = Command.ExecuteReader())
                        {

                            if (reader.Read())
                            {
                                return new UserDTO
                                 (
                                  reader.GetInt32(reader.GetOrdinal("UserID")),
                                 reader.GetInt32(reader.GetOrdinal("PersonID")),
                                 reader.GetString(reader.GetOrdinal("UserName")),
                                 reader.GetString(reader.GetOrdinal("Password")),
                                 reader.GetBoolean(reader.GetOrdinal("IsActive")),
                                 reader.GetByte(reader.GetOrdinal("Permission"))
          
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
        public static UserDTO FindByUsernameAndPassword(string UserName, string Password)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_GetUserByUserNameAndPassword", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;
                        Command.Parameters.AddWithValue("@UserName", UserName);
                        Command.Parameters.AddWithValue("@Password", Password);

                        connection.Open();

                        using (SqlDataReader reader = Command.ExecuteReader())
                        {

                            if (reader.Read())
                            {
                                return new UserDTO
                                 (
                                  reader.GetInt32(reader.GetOrdinal("UserID")),
                                 reader.GetInt32(reader.GetOrdinal("PersonID")),
                                 reader.GetString(reader.GetOrdinal("UserName")),
                                 reader.GetString(reader.GetOrdinal("Password")),
                                 reader.GetBoolean(reader.GetOrdinal("IsActive")),
                                 reader.GetByte(reader.GetOrdinal("Permission"))

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
        public static int AddNewRow(UserDTO userDTO)
        {
            int UserID = -1;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))

                {
                    using (SqlCommand Command = new SqlCommand("sp_AddNewUserUser", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;

                        Command.Parameters.AddWithValue("@PersonID", userDTO.PersonID);
                        Command.Parameters.AddWithValue("@UserName", userDTO.UserName);
                        Command.Parameters.AddWithValue("@Password", userDTO.Password.Trim());
                        Command.Parameters.AddWithValue("@IsActive", userDTO.IsActive);
                        Command.Parameters.AddWithValue("@Permission", userDTO.Permission);


                        SqlParameter outputIdParam = new SqlParameter("@UserID", SqlDbType.Int)
                        {
                            Direction = ParameterDirection.Output
                        };
                        Command.Parameters.Add(outputIdParam);


                        connection.Open();
                        Command.ExecuteNonQuery();

                        UserID = (int)outputIdParam.Value;

                    }
                }
            }
            catch (Exception ex)
            {
                clsLoggingEvent.LoogingEvent("Error: " + ex.Message);
            }
            return UserID;

        }
        public static bool UpdateRow(UserDTO userDTO)
        {

            int RowsAffected = 0;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_UpdateUser", connection))
                    {

                        Command.CommandType = CommandType.StoredProcedure;
                        Command.Parameters.AddWithValue("@UserID", userDTO.UserID);
                        Command.Parameters.AddWithValue("@PersonID", userDTO.PersonID);
                        Command.Parameters.AddWithValue("@UserName", userDTO.UserName);
                        Command.Parameters.AddWithValue("@Password", userDTO.Password.Trim());
                        Command.Parameters.AddWithValue("@IsActive", userDTO.IsActive);
                        Command.Parameters.AddWithValue("@Permission", userDTO.Permission);

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
        public static List<ViewUserDTO> GetAllRows()
        {

            var UserList = new List<ViewUserDTO>();
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_GetAllUsers", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;

                        connection.Open();

                        using (SqlDataReader reader = Command.ExecuteReader())
                        {

                            while (reader.Read())
                            {
                                UserList.Add(new ViewUserDTO
                                (
                                reader.GetInt32(reader.GetOrdinal("UserID")),
                                reader.GetString(reader.GetOrdinal("UserName")),
                                reader.GetBoolean(reader.GetOrdinal("IsActive")),
                                reader.GetString(reader.GetOrdinal("Name")),
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


            return UserList;

        }

        public static List<ViewUserDTO> GetAllRows(int? PageNumber, int? RowsPerPage, string? filter)
        {

            var UserList = new List<ViewUserDTO>();
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_FetchUsers", connection))
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
                                UserList.Add(new ViewUserDTO
                                (
                                reader.GetInt32(reader.GetOrdinal("UserID")),
                                reader.GetString(reader.GetOrdinal("UserName")),
                                reader.GetBoolean(reader.GetOrdinal("IsActive")),
                                reader.GetString(reader.GetOrdinal("Name")),
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


            return UserList;

        }
        public static List<ViewUserDTO> GetAllRows(string? Culomn, string? ValueSearch)
        {

            var UserList = new List<ViewUserDTO>();
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_FetchSearchUsers", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;

                        Command.Parameters.AddWithValue("@Culomn", (object)Culomn ?? DBNull.Value);
                        Command.Parameters.AddWithValue("@ValueSearch", (object)@ValueSearch ?? DBNull.Value);

                        connection.Open();

                        using (SqlDataReader reader = Command.ExecuteReader())
                        {

                            while (reader.Read())
                            {
                                UserList.Add(new ViewUserDTO
                                (
                                reader.GetInt32(reader.GetOrdinal("UserID")),
                                reader.GetString(reader.GetOrdinal("UserName")),
                                reader.GetBoolean(reader.GetOrdinal("IsActive")),
                                reader.GetString(reader.GetOrdinal("Name")),
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


            return UserList;

        }

        public static bool DoesRowExist(string UserName)
        {
            bool IsFound = false;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_CheckUserNameExist", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;

                        Command.Parameters.AddWithValue("@UserName", UserName);

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
        public static bool DoesRowExist(int? UserID)
        
        {
            bool IsFound = false;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("SP_CheckUserExists", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;

                        Command.Parameters.AddWithValue("@UserID", (object)UserID ?? DBNull.Value);

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

        public static bool DeleteRow(int? UserID)
        {

            int RowsAffected = 0;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_DeleteUser", connection))
                    {

                        Command.CommandType = CommandType.StoredProcedure;

                        Command.Parameters.AddWithValue("@UserID", (object)UserID ?? DBNull.Value);

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

        public static int Count(string? filter)
        {
            int countPesrons = 0;

            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand command = new SqlCommand("sp_CountUsers", connection))
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

                        countPesrons = (int)returnParameter.Value;

                    }
                }
            }
            catch (Exception ex)
            {
                clsLoggingEvent.LoogingEvent("Error: " + ex.Message);
            }
            return countPesrons;
        }

    }
}
