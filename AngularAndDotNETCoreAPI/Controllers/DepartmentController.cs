using AngularAndDotNETCoreAPI.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using System.Linq;

namespace AngularAndDotNETCoreAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DepartmentController : ControllerBase
    {
        private readonly ApiContext _db;

        public DepartmentController(ApiContext db)
        {
            _db = db;
        }

        [HttpGet]
        public JsonResult Get()
        {
            IOrderedQueryable<Department> query = _db.Departments.OrderBy(x => x.DepartmentId);

            return new JsonResult(query);
        }

        [HttpPost]
        public JsonResult Post(Department department)
        {
            _db.Departments.Add(department);
            _db.SaveChanges();

            return new JsonResult("Add successesfully");
        }

        [HttpPut]
        public JsonResult Put(Department department)
        {
            _db.Entry(department).State = EntityState.Modified;
            _db.SaveChanges();

            return new JsonResult("Update successesfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            Department query = _db.Departments.Find(id);

            _db.Departments.Remove(query);

            _db.SaveChanges();

            return new JsonResult("Deleted successesfully");
        }
    }
}
