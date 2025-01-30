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
using static clsKarateDataAccesse.clsDataMembers;
using static clsKarateDataAccesseLayer.clsDataPerson;


namespace clsKarateDataAccesse
{
    public class clsDataPayments
    {
        public class PaymentDTO
        {
            public enum enPaymentFoer { SubscriptionPeriod = 1, BeltTest = 2 };

            public PaymentDTO(int? PaymentID, decimal? Amount, DateTime? Date, int? MemberID, byte? PaymentFor
                              )
            {
                this.PaymentID = PaymentID;
                this.MemberID = MemberID;
                memberDTO = clsDataMembers.GetRowInfoByMemberID(this.MemberID);
                this.Amount = Amount;
                this.PaymentFor = PaymentFor;
                this.Date = Date;
            }

            public int? PaymentID { get; set; }
            public decimal? Amount { get; set; }
            public DateTime? Date { get; set; }
            public int? MemberID { get; set; }
            public MemberDTO? memberDTO;

            public byte? PaymentFor { get; set; }
            public PaymentDTO? paymentDTO;

            public string? MemberName { get; set; }


        }
        public class ViewPaymentDTO
        {
            public enum enPaymentFoer { SubscriptionPeriod = 1, BeltTest = 2 };

            public ViewPaymentDTO(int? PaymentID, decimal? Amount, DateTime? Date,
                              string? MemberName)
            {
                this.PaymentID = PaymentID;
                this.Amount = Amount;
                this.Date = Date;
                this.MemberName = MemberName;

            }

            public int? PaymentID { get; set; }
            public decimal? Amount { get; set; }
            public DateTime? Date { get; set; }

            public string? MemberName { get; set; }

        }
        public static PaymentDTO GetRowInfoByPaymentID(int? PaymentID)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_GetPaymentsByID", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;
                        Command.Parameters.AddWithValue("@PaymentID", (object)PaymentID ?? DBNull.Value);

                        connection.Open();

                        using (SqlDataReader reader = Command.ExecuteReader())
                        {

                            if (reader.Read())
                            {
                                return new PaymentDTO
                                 (
                                reader.GetInt32(reader.GetOrdinal("PaymentID")),
                                reader.GetDecimal(reader.GetOrdinal("Amount")),
                                reader.GetDateTime(reader.GetOrdinal("Date")),
                                reader.GetInt32(reader.GetOrdinal("MemberID")),
                                 reader.GetByte(reader.GetOrdinal("PaymentFor"))
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
        public static int AddNewRow(PaymentDTO paymentDTO)
        {
            int PaymentID = -1;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))

                {
                    using (SqlCommand Command = new SqlCommand("sp_AddNewPayment", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;

                        Command.Parameters.AddWithValue("@Amount", paymentDTO.Amount);
                        Command.Parameters.AddWithValue("@Date", paymentDTO.Date);
                        Command.Parameters.AddWithValue("@MemberID", paymentDTO.MemberID);
                        Command.Parameters.AddWithValue("@PaymentFor", paymentDTO.PaymentFor);


                        SqlParameter outputIdParam = new SqlParameter("@PaymentID", SqlDbType.Int)
                        {
                            Direction = ParameterDirection.Output
                        };
                        Command.Parameters.Add(outputIdParam);


                        connection.Open();
                        Command.ExecuteNonQuery();

                        PaymentID = (int)outputIdParam.Value;

                    }
                }
            }
            catch (Exception ex)
            {
                clsLoggingEvent.LoogingEvent("Error: " + ex.Message);
            }
            return PaymentID;

        }
        public static bool UpdateRow(PaymentDTO paymentDTO)
        {

            int RowsAffected = 0;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_UpdatePayment", connection))
                    {

                        Command.Parameters.AddWithValue("@PaymentID", paymentDTO.PaymentID);
                        Command.Parameters.AddWithValue("@Amount", paymentDTO.Amount);
                        Command.Parameters.AddWithValue("@Date", paymentDTO.Date);
                        Command.Parameters.AddWithValue("@MemberID", paymentDTO.MemberID);
                        Command.Parameters.AddWithValue("@PaymentFor", paymentDTO.PaymentFor);

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
        public static List<ViewPaymentDTO> GetAllRows()
        {

            var PaymentList = new List<ViewPaymentDTO>();
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_GetAllPayments", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;

                        connection.Open();

                        using (SqlDataReader reader = Command.ExecuteReader())
                        {

                            while (reader.Read())
                            {
                                PaymentList.Add(new ViewPaymentDTO
                                (
                                reader.GetInt32(reader.GetOrdinal("PaymentID")),
                                reader.GetDecimal(reader.GetOrdinal("Amount")),
                                reader.GetDateTime(reader.GetOrdinal("Date")),
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


            return PaymentList;

        }

        public static List<ViewPaymentDTO> GetAllRows(int? PageNumber, int? RowsPerPage)
        {

            var PaymentList = new List<ViewPaymentDTO>();
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_FetchPayments", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;
                        Command.Parameters.AddWithValue("@PageNumber", (object)PageNumber ?? DBNull.Value);
                        Command.Parameters.AddWithValue("@RowsPerPage", (object)RowsPerPage ?? DBNull.Value);

                        connection.Open();

                        using (SqlDataReader reader = Command.ExecuteReader())
                        {

                            while (reader.Read())
                            {
                                PaymentList.Add(new ViewPaymentDTO
                                (
                                reader.GetInt32(reader.GetOrdinal("PaymentID")),
                                reader.GetDecimal(reader.GetOrdinal("Amount")),
                                reader.GetDateTime(reader.GetOrdinal("Date")),
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


            return PaymentList;

        }

        public static List<ViewPaymentDTO> GetAllRows(string? Culomn, string? ValueSearch)
        {

            var PaymentList = new List<ViewPaymentDTO>();
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_FetchSearchPayments", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;
                        Command.Parameters.AddWithValue("@Culomn", (object)Culomn ?? DBNull.Value);
                        Command.Parameters.AddWithValue("@ValueSearch", (object)ValueSearch ?? DBNull.Value);

                        connection.Open();

                        using (SqlDataReader reader = Command.ExecuteReader())
                        {

                            while (reader.Read())
                            {
                                PaymentList.Add(new ViewPaymentDTO
                                (
                                reader.GetInt32(reader.GetOrdinal("PaymentID")),
                                reader.GetDecimal(reader.GetOrdinal("Amount")),
                                reader.GetDateTime(reader.GetOrdinal("Date")),
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


            return PaymentList;

        }

        public static List<ViewPaymentDTO> GetAllRows(int? MemberID, int? PageNumber, int? RowsPerPage)
        {

            var PaymentList = new List<ViewPaymentDTO>();
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_FetchAllPaymentsByMemberID", connection))
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
                                PaymentList.Add(new ViewPaymentDTO
                                (
                                reader.GetInt32(reader.GetOrdinal("PaymentID")),
                                reader.GetDecimal(reader.GetOrdinal("PaymentsAmount")),
                                reader.GetDateTime(reader.GetOrdinal("PaymentsDate")),
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


            return PaymentList;

        }
        public static bool DeleteRow(int? PaymentID)
        {

            int RowsAffected = 0;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_DeletePayments", connection))
                    {

                        Command.CommandType = CommandType.StoredProcedure;

                        Command.Parameters.AddWithValue("@PaymentID", (object)PaymentID ?? DBNull.Value);

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
        public static bool DoesRowExist(int? PaymentID)
        {
            bool IsFound = false;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_CheckPaymentExite", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;

                        Command.Parameters.AddWithValue("@PaymentID", (object)PaymentID ?? DBNull.Value);

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
            int CountPayments = 0;

            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand command = new SqlCommand("dbo.CountPayments", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        connection.Open();
                        SqlParameter returnParameter = new SqlParameter(@"ReturnVal", SqlDbType.TinyInt)
                        {
                            Direction = ParameterDirection.ReturnValue
                        };
                        command.Parameters.Add(returnParameter);

                        command.ExecuteNonQuery();

                        CountPayments = (int)returnParameter.Value;

                    }
                }
            }
            catch (Exception ex)
            {
                clsLoggingEvent.LoogingEvent("Error: " + ex.Message);
            }
            return CountPayments;
        }

        public static int Count(int? MemberID)
        {
            int CountPayments = 0;

            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand command = new SqlCommand("sp_CountPaymentsByMemberID", connection))
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

                        CountPayments = (int)returnParameter.Value;

                    }
                }
            }
            catch (Exception ex)
            {
                clsLoggingEvent.LoogingEvent("Error: " + ex.Message);
            }
            return CountPayments;
        }

        public static int GetPaymentPayForWhat(int? PaymentID, byte Choose)
        {
            int ID = -1;
            try
            {

                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    connection.Open();


                    using (SqlCommand Command = new SqlCommand("SP_GetPaymentPayForWhat", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;

                        Command.Parameters.AddWithValue("@PaymentID", (object)PaymentID ?? DBNull.Value);
                        Command.Parameters.AddWithValue("@Choose", Choose);


                        SqlParameter returnParameter = new SqlParameter(@"ReturnVal", SqlDbType.TinyInt)
                        {
                            Direction = ParameterDirection.ReturnValue
                        };
                        Command.Parameters.Add(returnParameter);

                        Command.ExecuteNonQuery();

                        ID = (int)returnParameter.Value;
                    }
                }
            }
            catch (Exception ex)
            {
                clsLoggingEvent.LoogingEvent("Error: " + ex.Message);
            }


            return ID;
        }


    }
}
