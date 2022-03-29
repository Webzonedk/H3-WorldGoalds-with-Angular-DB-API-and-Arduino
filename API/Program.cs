using API.DataHubConfig;

var builder = WebApplication.CreateBuilder(args);

/// <summary>
/// Adding Cors, to be able to share data over multiple IP's and instances
/// Cors is added as a nugget
/// </summary>
var _corsPolicy = "CorsPolicy";
//Adding Cors
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: _corsPolicy,
        builder =>
        {
            builder
            .WithOrigins(
            "http://192.168.2.0:4200",
            "http://192.168.2.102:4200",
            "http://192.168.2.102:8001",
            "http://localhost:4200",
            "http://localhost:80",
            "http://192.168.2.24:4200",
            "http://192.168.2.24:80",
            "http://192.168.2.105:4200",
            "http://192.168.2.105:80",
            "http://192.168.2.108:8001"
            )
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
        });
});


/// <summary>
/// Adding signalR to be able to send live data to the website
/// </summary>
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

/// <summary>
/// Needed for signalR to be able to send handshakes
/// </summary>
app.UseRouting();

/// <summary>
/// Applying the Cors
/// </summary>
app.UseCors(_corsPolicy);

//app.UseHttpsRedirection();

app.UseAuthorization();



/// <summary>
/// Adding andpont to be used by SignalR
/// </summary>
app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<SensorDataHub>("/sensorData");
});

app.MapControllers();

app.Run();
