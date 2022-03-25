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
        public SensorController(IConfiguration _config)
        {
            configuration = _config;
            DBContext = new DBManager(configuration);
        }

        //List<SensorData> dataList = new List<SensorData>();


        // GET: api/<sensorController>
        [Route("get")]
        [HttpGet]
        public List<SensorData> Get()
        {
            try
            {
                List<SensorData> tempList = DBContext.GetData();
                return tempList;
            }
            catch (Exception error)
            {
                Debug.WriteLine(error.Message);
                throw;
            }
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
        public void Post(SensorData value)
        {
            try
            {
                SensorData sensorData = new SensorData()
                {
                    Humidity = value.Humidity,
                    Temperature = value.Temperature,
                    LogTime = DateTime.Now
                };
               //SensorData sensorData = new SensorData() { Humidity = 23.25, Temperature = 25.45, LogTime = DateTime.Now };
                DBContext.PostData(sensorData);
            }
            catch (Exception error)
            {
                Debug.WriteLine(error.Message);
                throw;
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
