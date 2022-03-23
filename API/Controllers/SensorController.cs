using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class sensorController : ControllerBase
    {

        List<SensorData> dataList = new List<SensorData>();

        // GET: api/<sensorController>
        [HttpGet]
        public string Get()
        {
            string data = JsonSerializer.Serialize(dataList);
            return data;
        }

        //// GET api/<sensorController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST api/<sensorController>
        [Route("SendData")]
        [HttpPost]
        public void Post([FromBody] SensorData value)
        {
            if (value != null)
            {
                dataList.Add(value);
            }
        }

        // PUT api/<sensorController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<sensorController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
