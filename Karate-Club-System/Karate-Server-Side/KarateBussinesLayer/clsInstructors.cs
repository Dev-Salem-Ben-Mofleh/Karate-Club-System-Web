using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using clsKarateBussinseLayer;
using clsKarateDataAccesse;
using static clsKarateDataAccesse.clsDataInstructors;
using static clsKarateDataAccesse.clsDataMembers;
using static clsKarateDataAccesseLayer.clsDataPerson;

namespace clsKarateBussinse
{
    public class clsInstructors
    {
        public enum enMode { eAddNew = 0, eUpdate = 1 }
        public enMode mode = enMode.eAddNew;

        public InstructorDTO IDTO
        {
            get
            {
                return (new InstructorDTO(this.InstructorID, this.PersonID, this.Qualification));
            }
        }

        public ViewInstructorDTO VIDTO
        {
            get
            {
                return (new ViewInstructorDTO(this.InstructorID, this.Qualification,
                    this.Name, this.Gneder, this.DateOfBirth, this.Phone));
            }
        }

        public int? InstructorID { get; set; }
        public int? PersonID { get; set; }
        public PersonDTO personDTO;
        public string? Qualification { get; set; }
        public string? Name { get; set; }
        public string? Gneder { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Phone { get; set; }
        
        public clsInstructors(InstructorDTO instructorDTO, enMode cMode = enMode.eAddNew)
        {

            this.InstructorID = instructorDTO.InstructorID;
            this.PersonID = instructorDTO.PersonID;
            personDTO = instructorDTO.personDTO;
            this.Qualification = instructorDTO.Qualification;
            mode = cMode;

        }
        bool _AddNewRow()
        {

            this.InstructorID = clsDataInstructors.AddNewRow(IDTO);

            return this.InstructorID != -1;

        }
         bool _UpdateRow() => clsDataInstructors.UpdateRow(IDTO);
         public static clsInstructors FindByInstructorID(int? InstructorID)
        {


            InstructorDTO IDTO = clsDataInstructors.GetRowInfoByInstructorID(InstructorID);

            if (IDTO != null)
            {

                return new clsInstructors(IDTO, enMode.eUpdate);
            }
            else
                return null;
            ;
        }
         public static List<ViewInstructorDTO> GetAllRows() => clsDataInstructors.GetAllRows();
        public static List<ViewInstructorDTO> GetAllRows(int? PageNumber, int? RowsPerPage) => clsDataInstructors.GetAllRows(PageNumber, RowsPerPage );
        public static List<ViewInstructorDTO> GetAllRows(string? Culomn, string? ValueSearch) => clsDataInstructors.GetAllRows(Culomn, ValueSearch);
        public static int CountInstructors() => clsDataInstructors.Count();
        public static bool DeleteRow(int? InstructorID)
        {

            clsPersons.DeleteImage(clsDataInstructors.GetRowInfoByInstructorID(InstructorID).PersonID);
            return clsDataInstructors.DeleteRow(InstructorID);
        }
        public static bool DoesRowExist(int? InstructorID) => clsDataInstructors.DoesRowExist(InstructorID);

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
