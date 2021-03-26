using AngularAndDotNETCoreAPI.Models;

using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using System;
using System.IO;
using System.Linq;

namespace AngularAndDotNETCoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly ApiContext _db;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public EmployeeController(ApiContext db, IWebHostEnvironment webHostEnvironment)
        {
            _db = db;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpGet]
        public JsonResult Get()
        {
            IOrderedQueryable<Employee> query = _db.Employees.OrderBy(x => x.EmployeeId);

            return new JsonResult(query);
        }

        [HttpPost]
        public JsonResult Post(Employee employee)
        {
            _db.Employees.Add(employee);
            _db.SaveChanges();

            return new JsonResult("Add successesfully");
        }

        [HttpPut]
        public JsonResult Put(Employee employee)
        {
            _db.Entry(employee).State = EntityState.Modified;
            _db.SaveChanges();

            return new JsonResult("Update successesfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            Employee query = _db.Employees.Find(id);

            _db.Employees.Remove(query);

            _db.SaveChanges();

            return new JsonResult("Deleted successesfully");
        }

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                IFormCollection httpRequest = Request.Form;
                IFormFile postedFile = httpRequest.Files[0];
                string fileName = postedFile.FileName;
                string physicalPath = _webHostEnvironment.ContentRootPath + "/Photos/" + fileName;

                using FileStream stream = new FileStream(physicalPath, FileMode.Create);
                postedFile.CopyTo(stream);

                return new JsonResult(fileName);
            }
            catch (Exception)
            {
                return new JsonResult("immediately.jpg");
            }
        }

        [Route("GetAllDepartmentNames")]
        public JsonResult GetAllDepartmentNames()
        {
            IQueryable<string> query = _db.Departments.Select(x => x.DepartmentName);

            return new JsonResult(query);
        }
    }
}