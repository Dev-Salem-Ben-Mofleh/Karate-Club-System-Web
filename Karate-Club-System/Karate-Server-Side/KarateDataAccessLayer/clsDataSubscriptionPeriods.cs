using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using static clsKarateDataAccesse.clsDataBeltTests;
using static clsKarateDataAccesse.clsDataMembers;
using static clsKarateDataAccesse.clsDataPayments;
using static clsKarateDataAccesse.clsDataPayments.PaymentDTO;
using static clsKarateDataAccesse.clsDataSubscriptionPeriods.SubscriptionPeriodDTO;
using static clsKarateDataAccesseLayer.clsDataPerson;


namespace clsKarateDataAccesse
{
    public class clsDataSubscriptionPeriods
    {
        public class SubscriptionPeriodDTO
        {
            public enum enIssueReason { FirstTime = 1, Renew = 2 };

            public SubscriptionPeriodDTO(int? PeriodID,  DateTime? StartDate,  DateTime? EndDate,
             decimal? Fees,  bool? Paid,  int? MemberID,
             int? PaymentID,  byte? issueReason,  byte? subscrpitonDays,  bool? IsActive)
            {
                this.PeriodID = PeriodID;
                this.StartDate = StartDate;
                this.EndDate = EndDate;
                this.Fees = Fees;
                this.Paid = Paid;
                this.MemberID = MemberID;
                memberDTO = clsDataMembers.GetRowInfoByMemberID(this.MemberID);
                this.PaymentID = PaymentID;
                paymentDTO = clsDataPayments.GetRowInfoByPaymentID(this.PaymentID);
                this.issueReason = issueReason;
                this.subscrpitonDays = subscrpitonDays;
                this.IsActive = IsActive;
            }

            public int? PeriodID { get; set; }
            public DateTime? StartDate { get; set; }
            public DateTime? EndDate { get; set; }

            public decimal? Fees { get; set; }
            public bool? Paid { get; set; }
            public int? MemberID { get; set; }
            public MemberDTO? memberDTO;

            public int? PaymentID { get; set; }
            public PaymentDTO? paymentDTO;

            public byte? issueReason { get; set; }
            public byte? subscrpitonDays { get; set; }
            public bool? IsActive { get; set; }
            public string? IssueReasonText { get; set; }


        }
        public class ViewSubscriptionPeriodDTO
        {
            public ViewSubscriptionPeriodDTO(int? PeriodID, DateTime? StartDate, DateTime? EndDate,
             decimal? Fees, bool? Paid,
             int? PaymentID, byte? subscrpitonDays, bool? IsActive, string? Name)
            {
                this.PeriodID = PeriodID;
                this.StartDate = StartDate;
                this.EndDate = EndDate;
                this.Fees = Fees;
                this.Paid = Paid;
                this.PaymentID = PaymentID;
                paymentDTO = clsDataPayments.GetRowInfoByPaymentID(this.PaymentID);
                this.subscrpitonDays = subscrpitonDays;
                this.IsActive = IsActive;
                this.Name = Name;
            }

            public int? PeriodID { get; set; }
            public DateTime? StartDate { get; set; }
            public DateTime? EndDate { get; set; }

            public decimal? Fees { get; set; }
            public bool? Paid { get; set; }

            public int? PaymentID { get; set; }
            public PaymentDTO? paymentDTO;

            public byte? subscrpitonDays { get; set; }
            public bool? IsActive { get; set; }
            public string? Name { get; set; }


        }
        public static SubscriptionPeriodDTO GetRowInfoByPeriodID(int? PeriodID)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_GetSubscriptionPeriodsByID", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;
                        Command.Parameters.AddWithValue("@PeriodID", (object)PeriodID ?? DBNull.Value);

                        connection.Open();

                        using (SqlDataReader reader = Command.ExecuteReader())
                        {

                            if (reader.Read())
                            {
                                return new SubscriptionPeriodDTO
                                 (
                                    
                                reader.GetInt32(reader.GetOrdinal("PeriodID")),
                                reader.GetDateTime(reader.GetOrdinal("StartDate")),
                                 reader.GetDateTime(reader.GetOrdinal("EndDate")),
                                 reader.GetDecimal(reader.GetOrdinal("Fees")),
                                 reader.GetBoolean(reader.GetOrdinal("Paid")),
                                 reader.GetInt32(reader.GetOrdinal("MemberID")),
                                 reader.IsDBNull(reader.GetOrdinal("PaymentID")) ? null :
                                 reader.GetInt32(reader.GetOrdinal("PaymentID")),
                                 reader.GetByte(reader.GetOrdinal("IssueReason")),
                                 reader.GetByte(reader.GetOrdinal("SubscrpitonDays")),
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

        public static int AddNewRow(SubscriptionPeriodDTO subscriptionPeriodDTO)
        {
            int PeriodID = -1;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))

                {
                    using (SqlCommand Command = new SqlCommand("sp_AddNewSubscriptionPeriods", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;

                        Command.Parameters.AddWithValue("@StartDate", subscriptionPeriodDTO.StartDate);
                        Command.Parameters.AddWithValue("@EndDate", subscriptionPeriodDTO.EndDate);
                        Command.Parameters.AddWithValue("@Fees", subscriptionPeriodDTO.Fees);
                        Command.Parameters.AddWithValue("@Paid", subscriptionPeriodDTO.Paid);
                        Command.Parameters.AddWithValue("@MemberID", subscriptionPeriodDTO.MemberID);
                        Command.Parameters.AddWithValue("@IssueReason", subscriptionPeriodDTO.issueReason);
                        Command.Parameters.AddWithValue("@SubscrpitonDays", subscriptionPeriodDTO.subscrpitonDays);
                        Command.Parameters.AddWithValue("@IsActive", subscriptionPeriodDTO.IsActive);


                        if (subscriptionPeriodDTO.PaymentID.HasValue)
                            Command.Parameters.AddWithValue("@PaymentID", subscriptionPeriodDTO.PaymentID);
                        else
                            Command.Parameters.AddWithValue("@PaymentID", DBNull.Value);


                        SqlParameter outputIdParam = new SqlParameter("@PeriodID", SqlDbType.Int)
                        {
                            Direction = ParameterDirection.Output
                        };
                        Command.Parameters.Add(outputIdParam);


                        connection.Open();
                        Command.ExecuteNonQuery();

                        PeriodID = (int)outputIdParam.Value;

                    }
                }
            }
            catch (Exception ex)
            {
                clsLoggingEvent.LoogingEvent("Error: " + ex.Message);
            }
            return PeriodID;

        }
        public static bool UpdateRow(SubscriptionPeriodDTO subscriptionPeriodDTO)
        {

            int RowsAffected = 0;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_UpadteSubscriptionPeriods", connection))
                    {

                        Command.CommandType = CommandType.StoredProcedure;
                        Command.Parameters.AddWithValue("@PeriodID", subscriptionPeriodDTO.PeriodID);
                        Command.Parameters.AddWithValue("@StartDate", subscriptionPeriodDTO.StartDate);
                        Command.Parameters.AddWithValue("@EndDate", subscriptionPeriodDTO.EndDate);
                        Command.Parameters.AddWithValue("@Fees", subscriptionPeriodDTO.Fees);
                        Command.Parameters.AddWithValue("@Paid", subscriptionPeriodDTO.Paid);
                        Command.Parameters.AddWithValue("@MemberID", subscriptionPeriodDTO.MemberID);
                        Command.Parameters.AddWithValue("@IssueReason", subscriptionPeriodDTO.issueReason);
                        Command.Parameters.AddWithValue("@SubscrpitonDays", subscriptionPeriodDTO.subscrpitonDays);
                        Command.Parameters.AddWithValue("@IsActive", subscriptionPeriodDTO.IsActive);


                        if (subscriptionPeriodDTO.PaymentID.HasValue)
                            Command.Parameters.AddWithValue("@PaymentID", subscriptionPeriodDTO.PaymentID);
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
        public static List<ViewSubscriptionPeriodDTO> GetAllRows()
        {

            var SubscriptionPeriodList = new List<ViewSubscriptionPeriodDTO>();
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_GetALLSubscriptionPeriods", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;

                        connection.Open();

                        using (SqlDataReader reader = Command.ExecuteReader())
                        {

                            while (reader.Read())
                            {
                                SubscriptionPeriodList.Add(new ViewSubscriptionPeriodDTO
                                (
                                reader.GetInt32(reader.GetOrdinal("PeriodID")),
                                reader.GetDateTime(reader.GetOrdinal("StartDate")),
                                reader.GetDateTime(reader.GetOrdinal("EndDate")),
                                reader.GetDecimal(reader.GetOrdinal("Fees")),
                                reader.GetBoolean(reader.GetOrdinal("Paid")),
                                reader.IsDBNull(reader.GetOrdinal("PaymentID")) ? null :
                                reader.GetInt32(reader.GetOrdinal("PaymentID")),
                                reader.GetByte(reader.GetOrdinal("SubscrpitonDays")),
                                reader.GetBoolean(reader.GetOrdinal("IsActive")),
                                reader.GetString(reader.GetOrdinal("Name"))
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


            return SubscriptionPeriodList;

        }
        public static List<ViewSubscriptionPeriodDTO> GetAllRows(int? MemberID, int? PageNumber, int? RowsPerPage)
        {

            var SubscriptionPeriodList = new List<ViewSubscriptionPeriodDTO>();
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_FetchAllSubscriptionPeriodsByMemberID", connection))
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
                                SubscriptionPeriodList.Add(new ViewSubscriptionPeriodDTO
                                (
                                reader.GetInt32(reader.GetOrdinal("PeriodID")),
                                reader.GetDateTime(reader.GetOrdinal("StartDate")),
                                reader.GetDateTime(reader.GetOrdinal("EndDate")),
                                reader.GetDecimal(reader.GetOrdinal("Fees")),
                                reader.GetBoolean(reader.GetOrdinal("Paid")),
                                reader.IsDBNull(reader.GetOrdinal("PaymentID")) ? null :
                                reader.GetInt32(reader.GetOrdinal("PaymentID")),
                                reader.GetByte(reader.GetOrdinal("SubscrpitonDays")),
                                reader.GetBoolean(reader.GetOrdinal("IsActive")),
                                reader.GetString(reader.GetOrdinal("Name"))
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


            return SubscriptionPeriodList;

        }
        public static List<ViewSubscriptionPeriodDTO> GetAllRows(int? PageNumber, int? RowsPerPage, string? filter)
        {

            var SubscriptionPeriodList = new List<ViewSubscriptionPeriodDTO>();
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_FetchSubscriptionPeriods", connection))
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
                                SubscriptionPeriodList.Add(new ViewSubscriptionPeriodDTO
                                (
                                reader.GetInt32(reader.GetOrdinal("PeriodID")),
                                reader.GetDateTime(reader.GetOrdinal("StartDate")),
                                reader.GetDateTime(reader.GetOrdinal("EndDate")),
                                reader.GetDecimal(reader.GetOrdinal("Fees")),
                                reader.GetBoolean(reader.GetOrdinal("Paid")),
                                reader.IsDBNull(reader.GetOrdinal("PaymentID")) ? null :
                                reader.GetInt32(reader.GetOrdinal("PaymentID")),
                                reader.GetByte(reader.GetOrdinal("SubscrpitonDays")),
                                reader.GetBoolean(reader.GetOrdinal("IsActive")),
                                reader.GetString(reader.GetOrdinal("Name"))
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


            return SubscriptionPeriodList;

        }
        public static List<ViewSubscriptionPeriodDTO> GetAllRows(string? Culomn, string? ValueSearch)
        {

            var SubscriptionPeriodList = new List<ViewSubscriptionPeriodDTO>();
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_FetchSearchSubscriptionPeriods", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;
                        Command.Parameters.AddWithValue("@Culomn", (object)Culomn ?? DBNull.Value);
                        Command.Parameters.AddWithValue("@ValueSearch", (object)ValueSearch ?? DBNull.Value);



                        connection.Open();

                        using (SqlDataReader reader = Command.ExecuteReader())
                        {

                            while (reader.Read())
                            {
                                SubscriptionPeriodList.Add(new ViewSubscriptionPeriodDTO
                                (
                                reader.GetInt32(reader.GetOrdinal("PeriodID")),
                                reader.GetDateTime(reader.GetOrdinal("StartDate")),
                                reader.GetDateTime(reader.GetOrdinal("EndDate")),
                                reader.GetDecimal(reader.GetOrdinal("Fees")),
                                reader.GetBoolean(reader.GetOrdinal("Paid")),
                                reader.IsDBNull(reader.GetOrdinal("PaymentID")) ? null :
                                reader.GetInt32(reader.GetOrdinal("PaymentID")),
                                reader.GetByte(reader.GetOrdinal("SubscrpitonDays")),
                                reader.GetBoolean(reader.GetOrdinal("IsActive")),
                                reader.GetString(reader.GetOrdinal("Name"))
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


            return SubscriptionPeriodList;

        }

        public static List<ViewSubscriptionPeriodDTO> GetAllRows(DateTime? ToDate)
        {

            var SubscriptionPeriodList = new List<ViewSubscriptionPeriodDTO>();
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_GetSubscriptionPeriodsToDate", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;
                        Command.Parameters.AddWithValue("@ToDate", (object)ToDate ?? DBNull.Value);


                        connection.Open();

                        using (SqlDataReader reader = Command.ExecuteReader())
                        {

                            while (reader.Read())
                            {
                                SubscriptionPeriodList.Add(new ViewSubscriptionPeriodDTO
                                (
                                reader.GetInt32(reader.GetOrdinal("PeriodID")),
                                reader.GetDateTime(reader.GetOrdinal("StartDate")),
                                reader.GetDateTime(reader.GetOrdinal("EndDate")),
                                reader.GetDecimal(reader.GetOrdinal("Fees")),
                                reader.GetBoolean(reader.GetOrdinal("Paid")),
                                reader.IsDBNull(reader.GetOrdinal("PaymentID")) ? null :
                                reader.GetInt32(reader.GetOrdinal("PaymentID")),
                                reader.GetByte(reader.GetOrdinal("SubscrpitonDays")),
                                reader.GetBoolean(reader.GetOrdinal("IsActive")),
                                reader.GetString(reader.GetOrdinal("Name"))
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


            return SubscriptionPeriodList;

        }


        public static List<ViewSubscriptionPeriodDTO> GetAllRowsAndActive(DateTime? ToDate)
        {

            var SubscriptionPeriodList = new List<ViewSubscriptionPeriodDTO>();
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_GetSubscriptionPeriodsToDateAndActive", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;
                        Command.Parameters.AddWithValue("@ToDate", (object)ToDate ?? DBNull.Value);


                        connection.Open();

                        using (SqlDataReader reader = Command.ExecuteReader())
                        {

                            while (reader.Read())
                            {
                                SubscriptionPeriodList.Add(new ViewSubscriptionPeriodDTO
                                 (
                                reader.GetInt32(reader.GetOrdinal("PeriodID")),
                                reader.GetDateTime(reader.GetOrdinal("StartDate")),
                                reader.GetDateTime(reader.GetOrdinal("EndDate")),
                                reader.GetDecimal(reader.GetOrdinal("Fees")),
                                reader.GetBoolean(reader.GetOrdinal("Paid")),
                                reader.IsDBNull(reader.GetOrdinal("PaymentID")) ? null :
                                reader.GetInt32(reader.GetOrdinal("PaymentID")),
                                reader.GetByte(reader.GetOrdinal("SubscrpitonDays")),
                                reader.GetBoolean(reader.GetOrdinal("IsActive")),
                                reader.GetString(reader.GetOrdinal("Name"))
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


            return SubscriptionPeriodList;

        }

        public static bool DeleteRow(int? PeriodID)
        {

            int RowsAffected = 0;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_DELETESubscriptionPeriods", connection))
                    {

                        Command.CommandType = CommandType.StoredProcedure;

                        Command.Parameters.AddWithValue("@PeriodID", (object)PeriodID ?? DBNull.Value);

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
        public static bool DoesRowExist(int? PeriodID)
        {
            bool IsFound = false;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_CheckSubscriptionPeriodsExite", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;

                        Command.Parameters.AddWithValue("@PeriodID", (object)PeriodID ?? DBNull.Value);

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
        public static int CountPeriods(string? filter)
        {
            int countSubscriptionPeriods = 0;

            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand command = new SqlCommand("sp_CountSubscriptionPeriods", connection))
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

                        countSubscriptionPeriods = (int)returnParameter.Value;

                    }
                }
            }
            catch (Exception ex)
            {
                clsLoggingEvent.LoogingEvent("Error: " + ex.Message);
            }
            return countSubscriptionPeriods;
        }

        public static int Count(int? MemberID)
        {
            int countSubscriptionPeriods = 0;

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

                        countSubscriptionPeriods = (int)returnParameter.Value;

                    }
                }
            }
            catch (Exception ex)
            {
                clsLoggingEvent.LoogingEvent("Error: " + ex.Message);
            }
            return countSubscriptionPeriods;
        }

        public static bool CheckSubscriptionsIsNotPaid(int? MemberID)
        {
            bool IsFound = false;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("SP_CheckSubscriptionsIsNotPaid", connection))
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
        public static bool CheckIsActiveAndIsPaid(int? MemberID)
        {
            bool IsFound = false;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("SP_CheckIsActiveAndIsPaid", connection))
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
        public static bool CheckForDeletePeriod(int? PeriodID)
        {
            bool IsFound = false;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("SP_CheckForDeletePeriod", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;

                        Command.Parameters.AddWithValue("@PeriodID", (object)PeriodID ?? DBNull.Value);


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
        public static bool CheckForPayPeriod(int? PeriodID)
        {
            bool IsFound = false;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("SP_CheckForPayPeriod", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;

                        Command.Parameters.AddWithValue("@PeriodID", (object)PeriodID ?? DBNull.Value);


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
        public static bool CheckForRenewPeriod(int? PeriodID)
        {
            bool IsFound = false;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("SP_CheckForRenewPeriod", connection))
                    {
                        Command.CommandType = CommandType.StoredProcedure;

                        Command.Parameters.AddWithValue("@PeriodID", (object)PeriodID ?? DBNull.Value);


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
        public static bool CheckMemberHasPeriod(int? MemberID)
        {
            bool IsFound = false;
            try
            {
                using (SqlConnection connection = new SqlConnection(clsAccesseSetting.ConnectionString))
                {
                    using (SqlCommand Command = new SqlCommand("sp_CheckMemberHasPeriod", connection))
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
