using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Numerics;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using clsKarateBussinseLayer;
using clsKarateDataAccesse;
using clsKarateDataAccesseLayer;
using static clsKarateDataAccesse.clsDataMembers;
using static clsKarateDataAccesse.clsDataUsers;
using static clsKarateDataAccesseLayer.clsDataPerson;

namespace clsKarateBussinse
{
    public class clsUsers
    {
        public enum enMode { eAddNew = 0, eUpdate = 1 }
        public enMode mode = enMode.eAddNew;
        public UserDTO UDTO
        {
            get
            {
                return (new UserDTO(this.UserID, this.PersonID, this.UserName, this.Password, 
                    this.IsActive, this.Permission));
            }
        }
        public ViewUserDTO VUDTO
        {
            get
            {
                return (new ViewUserDTO(this.UserID, this.UserName,
                    this.IsActive, this.Name, this.Gneder, this.DateOfBirth, this.Phone));
            }
        }
        public int? UserID { get; set; }
        public int? PersonID { get; set; }

        public PersonDTO personDTO;

        public string? UserName { get; set; }
        public string? Password { get; set; }
        public bool? IsActive { get; set; }
        public byte? Permission { get; set; }
        public string? Name { get; set; }
        public string? Gneder { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Phone { get; set; }

        public clsUsers(UserDTO userDTO, enMode cMode = enMode.eAddNew)
      
        {
            this.UserID = userDTO.UserID;
            this.PersonID = userDTO.PersonID;
            personDTO = userDTO.personDTO;
            this.UserName = userDTO.UserName;
            this.Password = userDTO.Password;
            this.IsActive = userDTO.IsActive;
            this.Permission = userDTO.Permission;


            mode = cMode;
        }


        bool _AddNewRow()
        {

            this.UserID = clsDataUsers.AddNewRow(UDTO);

            return this.UserID != -1;

        }
        bool _UpdateRow() => clsDataUsers.UpdateRow(UDTO);

        public static clsUsers FindByUserID(int? UserID)
        {


            UserDTO  UDTO =clsDataUsers.GetRowInfoByUserID(UserID);

            if (UDTO!=null)
            {

                return new clsUsers(UDTO, enMode.eUpdate);
            }
            else
                return null;
            ;
        }
        public static clsUsers FindByUsernameAndPassword(string UserName, string Password)
        {


            UserDTO UDTO = clsDataUsers.FindByUsernameAndPassword(UserName, Password);

            if (UDTO != null)
            {

                return new clsUsers(UDTO, enMode.eUpdate);
            }
            else
                return null;

        }
        public static List<ViewUserDTO> GetAllRows() => clsDataUsers.GetAllRows();
        public static List<ViewUserDTO> GetAllRows(int? PageNumber, int? RowsPerPage, string? filter) => clsDataUsers.GetAllRows(PageNumber, RowsPerPage, filter);
        public static List<ViewUserDTO> GetAllRows(string? Culomn, string? ValueSearch) => clsDataUsers.GetAllRows(Culomn, ValueSearch);

        public static int CountUsers(string? filter) => clsDataUsers.Count(filter);
        public static bool DeleteRow(int? UserID)
        {
            clsPersons.DeleteImage(clsDataUsers.GetRowInfoByUserID(UserID).PersonID);
            return clsDataUsers.DeleteRow(UserID);
        }
        public static bool DoesRowExist(int? UserID) => clsDataUsers.DoesRowExist(UserID);

        public static bool DoesRowExist(string UserName) => clsDataUsers.DoesRowExist(UserName);

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

