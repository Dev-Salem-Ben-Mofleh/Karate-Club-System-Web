using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using clsKarateDataAccesse;
using static clsKarateDataAccesse.clsDataBeltRanks;
using static clsKarateDataAccesse.clsDataInstructors;
using static clsKarateDataAccesse.clsDataMembers;
using static clsKarateDataAccesseLayer.clsDataPerson;

namespace clsKarateBussinse
{
    public class clsBeltRanks
    { 

        public enum enMode { eAddNew = 0, eUpdate = 1 }
        public enMode mode = enMode.eAddNew;


        public BeltRankDTO BDTO
        {
            get
            {
                return (new BeltRankDTO(this.RankID, this.RankName, this.TestFees));
            }
        }

        public int? RankID { get; set; }
        public string RankName { get; set; }
        public decimal TestFees { get; set; }


        public clsBeltRanks(BeltRankDTO beltRankDTO, enMode cMode = enMode.eAddNew)
        {

            this.RankID = beltRankDTO.RankID;
            this.RankName = beltRankDTO.RankName;
            this.TestFees = beltRankDTO.TestFees;

            mode = cMode;

        }
        bool _AddNewRow()
        {

            this.RankID = clsDataBeltRanks.AddNewRow(BDTO);

            return this.RankID != -1;

        }
        bool _UpdateRow() => clsDataBeltRanks.UpdateRow(BDTO);
        public static clsBeltRanks FindByRankID(int? RankID)
        {


            BeltRankDTO BDTO = clsDataBeltRanks.GetRowInfoByRankID(RankID);

            if (BDTO != null)
            {

                return new clsBeltRanks(BDTO, enMode.eUpdate);
            }
            else
                return null;
            ;
        }
        public static List<BeltRankDTO> GetAllRows() => clsDataBeltRanks.GetAllRows();

        public static List<BeltRankDTO> GetAllRows(int? PageNumber, int? RowsPerPage) => clsDataBeltRanks.GetAllRows(PageNumber, RowsPerPage);
        public static List<BeltRankDTO> GetAllRows(string? Culomn, string? ValueSearch) => clsDataBeltRanks.GetAllRows(Culomn, ValueSearch);
        public static int CountBeltRanks() => clsDataBeltRanks.Count();

        public static bool DeleteRow(int? RankID) => clsDataBeltRanks.DeleteRow(RankID);
        public static bool DoesRowExist(int? RankID) => clsDataBeltRanks.DoesRowExist(RankID);

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
