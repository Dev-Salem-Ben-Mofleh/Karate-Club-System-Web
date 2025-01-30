using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using clsKarateDataAccesse;
using static clsKarateDataAccesse.clsDataBeltRanks;
using static clsKarateDataAccesse.clsDataBeltTests;
using static clsKarateDataAccesse.clsDataInstructors;
using static clsKarateDataAccesse.clsDataMembers;
using static clsKarateDataAccesse.clsDataPayments;

namespace clsKarateBussinse
{
    public class clsPayments
    {
        public enum enMode { eAddNew = 0, eUpdate = 1 }
        public enMode mode = enMode.eAddNew;
        public enum enPaymentFoer { SubscriptionPeriod = 1, BeltTest = 2 };

        public int? PaymentID { get; set; }
        public decimal? Amount { get; set; }
        public DateTime? Date { get; set; }
        public byte? PaymentFor { get; set; }

        public int? MemberID { get; set; }
        public MemberDTO memberDTO;
        public string? MemberName { get; set; }



        public PaymentDTO PDTO
        {
            get
            {
                return (new PaymentDTO(this.PaymentID, this.Amount, this.Date,
                    this.MemberID,this.PaymentFor));
            }
        }

        public ViewPaymentDTO VPDTO
        {
            get
            {
                return (new ViewPaymentDTO(this.PaymentID, this.Amount, this.Date,
                   this.MemberName));
            }
        }


        public clsPayments(PaymentDTO paymentDTO, enMode cMode = enMode.eAddNew)
        {

            this.PaymentID = paymentDTO.PaymentID;
            this.Amount = paymentDTO.Amount;
            this.Date = paymentDTO.Date;
            this.MemberID = paymentDTO.MemberID;
            memberDTO = paymentDTO.memberDTO;
            this.PaymentFor =paymentDTO.PaymentFor;
            this.MemberName = paymentDTO.MemberName;

            mode = cMode;

        }

        bool _AddNewRow()
        {

            this.PaymentID = clsDataPayments.AddNewRow(PDTO);

            return this.PaymentID != -1;

        }
         bool _UpdateRow() => clsDataPayments.UpdateRow(PDTO);
         public static clsPayments FindByPaymentID(int? PaymentID)
        {


            PaymentDTO PDTO = clsDataPayments.GetRowInfoByPaymentID(PaymentID);

            if (PDTO != null)
            {

                return new clsPayments(PDTO, enMode.eUpdate);
            }
            else
                return null;
            ;
        }
         public static int CountPayments() => clsDataPayments.Count();
        public static int CountPaymentsForMember(int? MemberID) => clsDataPayments.Count(MemberID);

        public static int GetPaymentPayForWhat(int? PaymentID,byte Choose)=>clsDataPayments.GetPaymentPayForWhat(PaymentID, Choose);
         public static List<ViewPaymentDTO> GetAllRows() => clsDataPayments.GetAllRows();
        public static List<ViewPaymentDTO> GetAllRows(int? PageNumber, int? RowsPerPage) => clsDataPayments.GetAllRows(PageNumber, RowsPerPage);
        public static List<ViewPaymentDTO> GetAllRows(string? Culomn, string? ValueSearch) => clsDataPayments.GetAllRows(Culomn, ValueSearch);

        public static List<ViewPaymentDTO> GetAllRows(int? MemberID, int? PageNumber, int? RowsPerPage) => clsDataPayments.GetAllRows(MemberID, PageNumber, RowsPerPage);
         public static bool DeleteRow(int? PaymentID) => clsDataPayments.DeleteRow(PaymentID);
         public static bool DoesRowExist(int? PaymentID) => clsDataPayments.DoesRowExist(PaymentID);

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
