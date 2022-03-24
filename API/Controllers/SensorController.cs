using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Text.Json;
using System.Diagnostics;
using API.DAL;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SensorController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private DBManager DBContext;
        public SensorController(IConfiguration config)
        {
            DBContext = new DBManager(configuration);
            configuration = config;
        }

        //List<SensorData> dataList = new List<SensorData>();


        // GET: api/<sensorController>
        [Route("get")]
        [HttpGet]
        public List<SensorData> Get()
        {
            return DBContext.GetData();
            //dataList.Add(new SensorData { Humidity = 28.10, Temperature = 25.45 });
           // string data = JsonSerializer.Serialize(dataList);
          //  return data;
        }

        //// GET api/<sensorController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST api/<sensorController>
        [Route("post")]
        [HttpPost]
        public void Post([FromBody] SensorData value)
        {
            try
            {
                DBContext.PostData(value);
            }
            catch (Exception)
            {

            }
        }

        //// PUT api/<sensorController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<sensorController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
