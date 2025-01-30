using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using clsKarateDataAccesse;
using static System.Runtime.InteropServices.JavaScript.JSType;
using static clsKarateBussinse.clsSubscriptionPeriods;
using static clsKarateDataAccesse.clsDataMembers;
using static clsKarateDataAccesse.clsDataPayments;
using static clsKarateDataAccesse.clsDataSubscriptionPeriods;
using static clsKarateDataAccesse.clsDataSubscriptionPeriods.SubscriptionPeriodDTO;

namespace clsKarateBussinse
{
    public class clsSubscriptionPeriods
    {
        public enum enMode { eAddNew = 0, eUpdate = 1 }
        public enMode mode = enMode.eAddNew;
        public enum enIssueReason { FirstTime = 1, Renew = 2 };
        public int? PeriodID { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public decimal? Fees { get; set; }
        public bool? Paid { get; set; }
        public int? MemberID { get; set; }
        public MemberDTO memberDTO;

        public int? PaymentID { get; set; }
        public PaymentDTO paymentDTO;

        public byte? issueReason { get; set; }
        public byte? subscrpitonDays { get; set; }
        public bool? IsActive { get; set; }
        public string? Name { get; set; }
        public SubscriptionPeriodDTO SDTO
        {
            get
            {
                return (new SubscriptionPeriodDTO(this.PeriodID, this.StartDate, this.EndDate,
                    this.Fees, this.Paid, this.MemberID, this.PaymentID,this.issueReason,this.subscrpitonDays, this.IsActive
                    ));
            }
        }
        public ViewSubscriptionPeriodDTO VSDTO
        {
            get
            {
                return (new ViewSubscriptionPeriodDTO(this.PeriodID, this.StartDate, this.EndDate,
                    this.Fees, this.Paid, this.PaymentID, this.subscrpitonDays, this.IsActive,
                    this.Name));
            }
        }

    
        public clsSubscriptionPeriods(SubscriptionPeriodDTO subscriptionPeriodDTO, enMode cMode = enMode.eAddNew)
        {

            this.PeriodID = subscriptionPeriodDTO.PeriodID;
            this.StartDate = subscriptionPeriodDTO.StartDate;
            this.EndDate = subscriptionPeriodDTO.EndDate;
            this.Fees = subscriptionPeriodDTO.Fees;
            this.Paid = subscriptionPeriodDTO.Paid;
            this.MemberID = subscriptionPeriodDTO.MemberID;
            this.PaymentID = subscriptionPeriodDTO.PaymentID;
            this.issueReason = subscriptionPeriodDTO.issueReason;
            this.subscrpitonDays = subscriptionPeriodDTO.subscrpitonDays;
            this.IsActive = subscriptionPeriodDTO.IsActive;

            mode = cMode;

        }
        bool _AddNewRow()
        {

            this.PeriodID = clsDataSubscriptionPeriods.AddNewRow(SDTO);

            return this.PeriodID != -1;

        }
         bool _UpdateRow() => clsDataSubscriptionPeriods.UpdateRow(SDTO);
         public static clsSubscriptionPeriods FindByPeriodID(int? PeriodID)
        {


            SubscriptionPeriodDTO SDTO = clsDataSubscriptionPeriods.GetRowInfoByPeriodID(PeriodID);

            if (SDTO != null)
            {

                return new clsSubscriptionPeriods(SDTO, enMode.eUpdate);
            }
            else
                return null;
            ;
        }
         public static List<ViewSubscriptionPeriodDTO> GetAllRows() => clsDataSubscriptionPeriods.GetAllRows();
         public static List<ViewSubscriptionPeriodDTO> GetAllRows(int? MemberID, int? PageNumber, int? RowsPerPage) => clsDataSubscriptionPeriods.GetAllRows(MemberID, PageNumber, RowsPerPage);
        public static List<ViewSubscriptionPeriodDTO> GetAllRows(int? PageNumber, int? RowsPerPage, string? filter) => clsDataSubscriptionPeriods.GetAllRows(PageNumber, RowsPerPage, filter);
        public static List<ViewSubscriptionPeriodDTO> GetAllRows(string? Culomn, string? ValueSearch) => clsDataSubscriptionPeriods.GetAllRows(Culomn, ValueSearch);

        public static List<ViewSubscriptionPeriodDTO> GetSubscriptionPeriodsAfterDate(DateTime date) => clsDataSubscriptionPeriods.GetAllRows(date);
        public static List<ViewSubscriptionPeriodDTO> GetSubscriptionPeriodsAfterDateAndActive(DateTime date) => clsDataSubscriptionPeriods.GetAllRowsAndActive(date);

        public static int CountSubscriptionPeriodsForMember(int? MemberID) => clsDataSubscriptionPeriods.Count(MemberID);
        public static int CountSubscriptionPeriods(string? filter) => clsDataSubscriptionPeriods.CountPeriods(filter);

        public static bool DeleteRow(int? PeriodID) => clsDataSubscriptionPeriods.DeleteRow(PeriodID);
         public static bool DoesRowExist(int? PeriodID) => clsDataSubscriptionPeriods.DoesRowExist(PeriodID);
        public static bool CheckSubscriptionsIsNotPaid(int? MemberID) => clsDataSubscriptionPeriods.CheckSubscriptionsIsNotPaid(MemberID);
        public static bool CheckMemberHasPeriod(int? MemberID) => clsDataSubscriptionPeriods.CheckMemberHasPeriod(MemberID);
        public static bool CheckIsActiveAndIsPaid(int? MemberID) => clsDataSubscriptionPeriods.CheckIsActiveAndIsPaid(MemberID);
        public static bool CheckForDeletePeriod(int? PeriodID) => clsDataSubscriptionPeriods.CheckForDeletePeriod(PeriodID);
        public static bool CheckForPayPeriod(int? PeriodID) => clsDataSubscriptionPeriods.CheckForPayPeriod(PeriodID);
        public static bool CheckForRenewPeriod(int? PeriodID) => clsDataSubscriptionPeriods.CheckForRenewPeriod(PeriodID);


        public int? SavePayment(decimal fees)
        {
            if (this.mode == enMode.eAddNew || this.PaymentID == null)
            {

                clsPayments payments = new clsPayments(new PaymentDTO(
                  null,
                  fees,
                  DateTime.Now,
                 this.SDTO.MemberID,
                 (byte)clsPayments.enPaymentFoer.SubscriptionPeriod
                 ));

                if (payments.Save())
                    return payments.PDTO.PaymentID;
                else
                    return -1;
            }
            else
            {
                clsPayments payments = clsPayments.FindByPaymentID((int)this.PaymentID);
                payments.PDTO.Amount = this.SDTO.Fees;
                payments.PDTO.Date = DateTime.Now;

                if (payments.Save())
                    return payments.PDTO.PaymentID;
                else
                    return -1;
            }
        }

        public bool Save()
        {
            switch (mode)
            {
                case enMode.eAddNew:
                    {
                        if (_AddNewRow())
                        {
                            mode = enMode.eUpdate;
                            return true;
                        }
                        else
                            return false;

                    }
                case enMode.eUpdate:

                    return _UpdateRow();

            }

            return false;
        }


    }
}
