using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using clsKarateDataAccesse;
using static clsKarateDataAccesse.clsDataInstructors;
using static clsKarateDataAccesse.clsDataMemberInstructors;
using static clsKarateDataAccesse.clsDataMembers;

namespace clsKarateBussinse
{
    public class clsMemberInstructors
    {
        public enum enMode { eAddNew = 0, eUpdate = 1 }
        public enMode mode = enMode.eAddNew;
        public MemberInstructorDTO MIDTO
        {
            get
            {
                return (new MemberInstructorDTO(this.MemberInstructorID, this.MemberID, this.InstructorID,
                    this.AssignDate));
            }
        }

        public ViewMemberInstructorDTO VMIDTO
        {
            get
            {
                return (new ViewMemberInstructorDTO(this.MemberInstructorID,
                    this.AssignDate, this.InstructorName, this.MemberName));
            }
        }


        public int? MemberID { get; set; }
        public clsMembers MemberInfo;
        public int? InstructorID { get; set; }
        public clsInstructors InstructorInfo;
        public DateTime? AssignDate { get; set; }
        public int? MemberInstructorID { get; set; }
        public string? InstructorName { get; set; }
        public string? MemberName { get; set; }


        public clsMemberInstructors(MemberInstructorDTO memberInstructorDTO, enMode cMode = enMode.eAddNew)
        {
           this.MemberInstructorID= memberInstructorDTO.MemberInstructorID;
            this.MemberID = memberInstructorDTO.MemberID;
            MemberInfo = clsMembers.FindByMemberID(memberInstructorDTO.MemberID);
            this.InstructorID = memberInstructorDTO.InstructorID;
            InstructorInfo = clsInstructors.FindByInstructorID(memberInstructorDTO.InstructorID);
            this.AssignDate = memberInstructorDTO.AssignDate;
            mode = cMode;
        }


        bool _AddNewRow()
        {

            this.MemberInstructorID = clsDataMemberInstructors.AddNewRow(MIDTO);

            return this.MemberInstructorID != -1;

        }
        bool _UpdateRow()=>clsDataMemberInstructors.UpdateRow(MIDTO);


        public static clsMemberInstructors FindByMemberInsturctorID(int? MemberInstructorID)
        {

            MemberInstructorDTO MIDTO = clsDataMemberInstructors.GetRowInfoByMemberID(MemberInstructorID);

            if (MIDTO != null)
            {

                return new clsMemberInstructors(MIDTO, enMode.eUpdate);
            }
            else
                return null;

        }
        public static List<ViewMemberInstructorDTO> GetAllRows() => clsDataMemberInstructors.GetAllRows();
        public static List<ViewMemberInstructorDTO> GetAllRows(int? PageNumber, int? RowsPerPage) => clsDataMemberInstructors.GetAllRows(PageNumber, RowsPerPage);
        public static List<ViewMemberInstructorDTO> GetAllRows(string? Culomn, string? ValueSearch) => clsDataMemberInstructors.GetAllRows(Culomn, ValueSearch);

        public static bool DeleteRow(int? MemberInstructorID)=> clsDataMemberInstructors.DeleteRow(MemberInstructorID);
        
        public static bool DoesRowExist(int? MemberInstructorID) => clsDataMemberInstructors.DoesRowExist(MemberInstructorID);
        
        public static bool CheckMemberHasSameInstructor(int? MemberId,int? InstructorID) =>clsDataMemberInstructors.CheckMemberHasSameInstructor(MemberId, InstructorID);
        public static int CountMemberInstructors() => clsDataMemberInstructors.Count();

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
