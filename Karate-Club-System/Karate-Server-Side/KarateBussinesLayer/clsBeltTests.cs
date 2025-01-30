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
using static clsKarateDataAccesse.clsDataSubscriptionPeriods;
using static clsKarateDataAccesseLayer.clsDataPerson;

namespace clsKarateBussinse
{
    public class clsBeltTests
    {
        public enum enMode { eAddNew = 0, eUpdate = 1 }
        public enMode mode = enMode.eAddNew;

        public BeltTestDTO BDTO
        {
            get
            {
                return (new BeltTestDTO(this.TestID, this.MemberID, this.RankID,
                    this.Result, this.Date, this.TestedByInstructorID, this.PaymentID));
            }
        }
        public ViewBeltTestDTO VBDTO
        {
            get
            {
                return (new ViewBeltTestDTO(this.TestID,
                    this.Result, this.Date, this.PaymentID, this.InstructorName, this.MemberName, this.RankName));
            }
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
        public string? InstructorName { get; set; }
        public string? MemberName { get; set; }
        public string? RankName { get; set; }
        public clsBeltTests(BeltTestDTO beltTestDTO, enMode cMode = enMode.eAddNew)
        {

            this.TestID = beltTestDTO.TestID;
            this.MemberID = beltTestDTO.MemberID;
            memberDTO = beltTestDTO.memberDTO;
            this.RankID = beltTestDTO.RankID;
            beltRankDTO = beltTestDTO.beltRankDTO;
            this.Result = beltTestDTO.Result;
            this.Date = beltTestDTO.Date;
            this.TestedByInstructorID = beltTestDTO.TestedByInstructorID;
            this.PaymentID = beltTestDTO.PaymentID;

            mode = cMode;

        }

        bool _AddNewRow()
        {

            this.TestID = clsDataBeltTests.AddNewRow(BDTO);

            return this.TestID != -1;

        }
         bool _UpdateRow() => clsDataBeltTests.UpdateRow(BDTO);
         public static clsBeltTests FindByTestID(int? TestID)
        {


            BeltTestDTO BDTO = clsDataBeltTests.GetRowInfoByTestID(TestID);

            if (BDTO != null)
            {

                return new clsBeltTests(BDTO, enMode.eUpdate);
            }
            else
                return null;
            ;
        }
         public static List<ViewBeltTestDTO> GetAllRows() => clsDataBeltTests.GetAllRows();
        public static List<ViewBeltTestDTO> GeBeltTestsAfterDate(DateTime date) => clsDataBeltTests.GetAllRows(date);

        public static List<ViewBeltTestDTO> GetAllRows(int? MemberID, int? PageNumber, int? RowsPerPage) => clsDataBeltTests.GetAllRows(MemberID,PageNumber, RowsPerPage);
        public static List<ViewBeltTestDTO> GetAllRows(int? PageNumber, int? RowsPerPage) => clsDataBeltTests.GetAllRows(PageNumber, RowsPerPage);
        public static List<ViewBeltTestDTO> GetAllRows(string? Culomn, string? ValueSearch) => clsDataBeltTests.GetAllRows(Culomn, ValueSearch);

        public static int CountBeltTests() => clsDataBeltTests.Count();
        public static int CountBeltTestsForMember(int? MemberID) => clsDataBeltTests.Count(MemberID);

        public static bool DeleteRow(int? TestID) => clsDataBeltTests.DeleteRow(TestID);
         public static bool DoesRowExist(int? TestID) => clsDataBeltTests.DoesRowExist(TestID);
         public static bool GetPassLastRankNameForTests(int? MemberID, int? RankID) => clsDataBeltTests.GetPassLastRankNameForTests(MemberID, RankID);

        public int? SavePayment(decimal fees)
        {
            if (this.mode == enMode.eAddNew || this.PaymentID == null)
            {

              clsPayments payments = new clsPayments(new PaymentDTO(
                null,
                fees,
                DateTime.Now,
               this.BDTO.MemberID,
               (byte)clsPayments.enPaymentFoer.BeltTest
                ));

                if (payments.Save())
                    return payments.PDTO.PaymentID;
                else
                    return -1;
            }
            else
            {
                clsPayments payments = clsPayments.FindByPaymentID((int)this.PaymentID);
                payments.PDTO.Amount = this.beltRankDTO.TestFees;
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
