using System;
using System.ComponentModel.DataAnnotations;

namespace AngularAndDotNETCoreAPI.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string Department { get; set; }
        [DataType(DataType.Date)]
        public DateTime DateOfJoining { get; set; }
        public string PhotoFileName { get; set; }
    }
}