using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Text.Json;
using System.Diagnostics;
using API.DAL;
using Microsoft.AspNetCore.SignalR;
using API.DataHubConfig;


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



        /// <summary>
        /// Method to get data from DB
        /// </summary>
        /// <returns></returns>
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



        /// <summary>
        /// Posting data to DB
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        ///
        [Route("post")]
        [HttpPost]
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
                //Sending dataupdate to Frontend, using signalR
                await _hub.Clients.All.SendAsync("transferData", new List<SensorData>());
                return Ok();
            }
            catch (Exception)
            {
                return StatusCode(500, "The transfer to DB failed");
            }
        }


        //Not implemented, but saved for future reference
        //// GET api/<sensorController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}


        //Not implemented, but saved for future reference
        //// PUT api/<sensorController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}


        //Not implemented, but saved for future reference
        //// DELETE api/<sensorController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
