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
            return DataCollection;
        }

        internal void PostData(SensorData value)
        {
            DataCollection.Add(value);
        }
    }
}
