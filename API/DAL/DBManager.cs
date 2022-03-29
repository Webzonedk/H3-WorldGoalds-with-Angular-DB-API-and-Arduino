using Npgsql;
using System.Diagnostics;
using System.Data;

namespace API.DAL
{
    public class DBManager
    {
        //The List to store data
       // static public List<SensorData> DataCollection = new List<SensorData>();

        private readonly IConfiguration configuration;
        private readonly string connectionString;

        //constructor setting connectionstrings to databases
        public DBManager(IConfiguration _configuration)
        {
            configuration = _configuration;
            connectionString = configuration.GetConnectionString("DBContext");
        }


        /// <summary>
        /// Method to retreive data from Database
        /// </summary>
        /// <returns></returns>
        internal List<SensorData> GetData()
        {
            //List to keep the data collected from DB
                List<SensorData> data = new List<SensorData>();
            try
            {
                NpgsqlConnection connection = new NpgsqlConnection(connectionString);
                NpgsqlCommand cmd = new NpgsqlCommand("SELECT * FROM tempData", connection); //Query way a function way did not work
                //NpgsqlCommand cmd = new NpgsqlCommand("SELECT getdata()", connection); //Could not get the function to work in DB
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



        /// <summary>
        /// Method to post Data to database
        /// </summary>
        /// <param name="value"></param>
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
                //Sending data to DB
                connection.Open();
                cmd.ExecuteNonQuery();
                connection.Close();
            }
            catch (Exception error)
            {
                Debug.WriteLine(error.Message);
                throw;
            }
        }
    }
}

