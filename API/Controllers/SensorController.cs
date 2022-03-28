using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Text.Json;
using System.Diagnostics;
using API.DAL;
using Microsoft.AspNetCore.SignalR;
using API.DataHubConfig;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SensorController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private DBManager _dBContext;
        private IHubContext<SensorDataHub> _hub;
        public SensorController(IConfiguration config, IHubContext<SensorDataHub> hub)
        {
            configuration = config;
            _dBContext = new DBManager(configuration);
            _hub = hub;
        }

        //List<SensorData> dataList = new List<SensorData>();


        // GET: api/<sensorController>
        [Route("get")]
        [HttpGet]
        public List<SensorData> Get()
        {
            try
            {
                List<SensorData> tempList = _dBContext.GetData();
                return tempList;
            }
            catch (Exception)
            {
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
       //public void Post(SensorData value)
        public async Task<ActionResult> Post(SensorData value)
        {
            try
            {
                SensorData sensorData = new SensorData()
                {
                    Humidity = value.Humidity,
                    Temperature = value.Temperature,
                    LogTime = DateTime.Now
                };

                _dBContext.PostData(sensorData);
                await _hub.Clients.All.SendAsync("transferData", new List<SensorData>());
                return Ok();
            }
            catch (Exception)
            {
                return StatusCode(500, "The transfer to DB failed");
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
