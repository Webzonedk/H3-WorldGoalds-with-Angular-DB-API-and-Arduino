using Npgsql;

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

            try
            {
                NpgsqlConnection connection = new NpgsqlConnection(connectionString);
                connection.Open();
                NpgsqlCommand cmd = new NpgsqlCommand("CALL getdata()", connection);
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.ExecuteNonQuery();

                NpgsqlDataReader reader = cmd.ExecuteReader();
                List<SensorData> data = new List<SensorData>();

                while (reader.Read())
                {
                    SensorData sensorData = new SensorData
                    {
                        Humidity = (double)reader["humidity"],
                        Temperature = (double)reader["temperature"],
                        LogTime = (DateTime)reader["logTime"]
                    };

                    data.Add(sensorData);
                }
                connection.Close();
                return data;

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                throw;
            }
        }

        internal void PostData(SensorData value)
        {
            try
            {
                NpgsqlConnection connection = new NpgsqlConnection(connectionString);
                connection.Open();
                NpgsqlCommand cmd = new NpgsqlCommand("CALL @insertdata(@humidity, @temperature)", connection);
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.Parameters.Add("@humidity", NpgsqlTypes.NpgsqlDbType.Double).Value = value.Humidity;
                cmd.Parameters.Add("@temperature", NpgsqlTypes.NpgsqlDbType.Double).Value = value.Temperature;
                cmd.ExecuteNonQuery();

                connection.Close();

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                throw;
            }
        }


        //DataCollection.Add(value);
    }
}

