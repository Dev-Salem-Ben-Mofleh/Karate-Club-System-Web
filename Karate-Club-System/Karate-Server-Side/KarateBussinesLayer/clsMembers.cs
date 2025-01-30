using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using clsKarateBussinseLayer;
using clsKarateDataAccesse;
using KarateBussinesLayer;
using static clsKarateDataAccesse.clsDataBeltRanks;
using static clsKarateDataAccesse.clsDataMembers;
using static clsKarateDataAccesse.clsDataUsers;
using static clsKarateDataAccesseLayer.clsDataPerson;

namespace clsKarateBussinse
{
    public class clsMembers
    {
        public enum enMode { eAddNew = 0, eUpdate = 1 }
        public enMode mode = enMode.eAddNew;

        public MemberDTO MDTO
        {
            get
            {
                return (new MemberDTO(this.MemberID, this.PersonID, this.EmergencyContactInfo, this.LastBeltRankID,
                    this.IsActive));
            }
        }
        public ViewMemberDTO VMDTO
        {
            get
            {
                return (new ViewMemberDTO(this.MemberID, this.Name,this.BeltRankName, this.Gneder,this.DateOfBirth,this.Phone,
                    this.IsActive));
            }
        }

        public int? MemberID { get; set; }
        public int? PersonID { get; set; }
        public PersonDTO personDTO;
        public string? EmergencyContactInfo { get; set; }
        public int? LastBeltRankID { get; set; }
        public BeltRankDTO beltRankDTO;

        public bool? IsActive { get; set; }
        public string? Name { get; set; }
        public string? BeltRankName { get; set; }
        public string? Gneder { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Phone { get; set; }

        public clsMembers(MemberDTO memberDTO,enMode cMode = enMode.eAddNew)
        {

            this.MemberID = memberDTO.MemberID;
            this.PersonID = memberDTO.PersonID;
            personDTO = memberDTO.personDTO;
            this.EmergencyContactInfo = memberDTO.EmergencyContactInfo;
            this.LastBeltRankID = memberDTO.LastBeltRankID;
            beltRankDTO = memberDTO.beltRankDTO;
            this.IsActive = memberDTO.IsActive;
            mode = cMode;

        }
        bool _AddNewRow()
        {

            this.MemberID = clsDataMembers.AddNewRow(MDTO);

            return this.MemberID != -1;

        }
        bool _UpdateRow() => clsDataMembers.UpdateRow(MDTO);
        public static clsMembers FindByMemberID(int? MemberID)
        {


            MemberDTO MDTO = clsDataMembers.GetRowInfoByMemberID(MemberID);

            if (MDTO != null)
            {

                return new clsMembers(MDTO, enMode.eUpdate);
            }
            else
                return null;
            ;
        }

        public static List<ViewMemberDTO> GetAllRows() => clsDataMembers.GetAllRows();
        public static List<ViewMemberDTO> GetAllRows(int? PageNumber, int? RowsPerPage, string? filter) => clsDataMembers.GetAllRows(PageNumber, RowsPerPage, filter);
        public static List<ViewMemberDTO> GetAllRows( string? Culomn, string? ValueSearch) =>clsDataMembers.GetAllRows( Culomn, ValueSearch);
        public static List<ViewMemberDTO> GetAllRows(int? InstructorID, int? PageNumber, int? RowsPerPage) => clsDataMembers.GetAllRows(InstructorID,  PageNumber, RowsPerPage);
        public static int CountMembers(int? InstructorID) =>clsDataMembers.Count(InstructorID);
        public static int CountMembers(string? filter) => clsDataMembers.Count(filter);
        public  static bool DeleteRow(int? MemberID)
        {

            clsPersons.DeleteImage(clsDataMembers.GetRowInfoByMemberID(MemberID).PersonID);
            return clsDataMembers.DeleteRow(MemberID); 
        }
        public static bool DoesRowExist(int? MemberID) => clsDataMembers.DoesRowExist(MemberID);
        public static bool CheckMemberIsActive(int? MemberID) => clsDataMembers.CheckMemberIsActive(MemberID);
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
