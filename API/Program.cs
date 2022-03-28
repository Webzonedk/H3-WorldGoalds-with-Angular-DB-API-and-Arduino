using API.DataHubConfig;

var builder = WebApplication.CreateBuilder(args);


var _corsPolicy = "CorsPolicy";
//Adding Cors
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: _corsPolicy,
        builder =>
        {
            builder
            //.AllowAnyOrigin()
            .WithOrigins(
            "http://192.168.2.0:4200",
            "http://localhost:4200",
            "http://192.168.2.102:4200",
            "http://localhost:80",
            "http://192.168.2.24:4200",
            "http://192.168.2.24:80"
            )
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();


        });
});



//Adding signalR
builder.Services.AddSignalR();

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//Needed for signalR
app.UseRouting();
app.UseCors(_corsPolicy);

//app.UseHttpsRedirection();

app.UseAuthorization();


//Adding andpont to be used by SignalR
app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<SensorDataHub>("/sensorData");
});

app.MapControllers();

app.Run();
