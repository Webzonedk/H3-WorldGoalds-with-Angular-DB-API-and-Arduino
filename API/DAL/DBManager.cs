using Npgsql;
using System.Diagnostics;
using System.Data;

namespace API.DAL
{
    public class DBManager
    {
        static public List<SensorData> DataCollection = new List<SensorData>();
        private readonly IConfiguration configuration;
        private readonly string connectionString;
        //constructor setting connectionstrings to databases
        public DBManager(IConfiguration _configuration)
        {
            configuration = _configuration;
            connectionString = configuration.GetConnectionString("DBContext");
        }

        internal List<SensorData> GetData()
        {

                List<SensorData> data = new List<SensorData>();
            try
            {
                NpgsqlConnection connection = new NpgsqlConnection(connectionString);
                NpgsqlCommand cmd = new NpgsqlCommand("SELECT * FROM tempData", connection);
                //NpgsqlCommand cmd = new NpgsqlCommand("SELECT getdata()", connection);
                cmd.CommandType = CommandType.Text;
                connection.Open();

                NpgsqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    SensorData sensorData = new SensorData
                    {
                        Humidity = (double)reader["humidity"],
                        Temperature = (double)reader["temperature"],
                        LogTime = (DateTime)reader["logtime"]
                    };

                    data.Add(sensorData);
                }
                connection.Close();

            }
            catch (Exception error)
            {
                Debug.WriteLine(error.Message);
                throw;
            }
                return data;
        }



        internal void PostData(SensorData value)
        {
            try
            {
                NpgsqlConnection connection = new NpgsqlConnection(connectionString);
                NpgsqlCommand cmd = new NpgsqlCommand("CALL insertdata(@humidity,@temperature,@logtime)", connection);
                cmd.CommandType = CommandType.Text;
                cmd.Parameters.Add("@humidity", NpgsqlTypes.NpgsqlDbType.Double).Value = value.Humidity;
                cmd.Parameters.Add("@temperature", NpgsqlTypes.NpgsqlDbType.Double).Value = value.Temperature;
                cmd.Parameters.Add("@logtime", NpgsqlTypes.NpgsqlDbType.Timestamp).Value = value.LogTime;
                
                connection.Open();
                cmd.ExecuteNonQuery();
                connection.Close();

            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw;
            }
        }
    }
}

