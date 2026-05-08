using app.clientesChGio.services.Implementations;
using app.ecCliente.common.EventMQ;
using app.ecCliente.dataAccess.context;
using app.ecCliente.dataAccess.repositories;
using app.ecCliente.services.EventMQ;
using app.ecCliente.services.Implementations;
using app.ecCliente.services.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();


// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});


// SQL SERVER
var conSqlServer = builder.Configuration.GetConnectionString("BDDSqlServer")!;

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(conSqlServer);
    options.LogTo(Console.WriteLine, LogLevel.Information)
           .EnableSensitiveDataLogging();
});


// RabbitMQ
builder.Services.Configure<RabbitMQSettings>(
    builder.Configuration.GetSection("rabbitmq")
);


// Servicios
builder.Services.AddScoped<IClienteRepository, ClienteRepository>();
builder.Services.AddScoped<IClienteService, ClienteService>();

builder.Services.AddScoped<IDireccionClienteRepository, DireccionClienteRepository>();
builder.Services.AddScoped<IDireccionClienteService, DireccionClienteService>();

builder.Services.AddSingleton<IRabbitMQService, RabbitMQService>();


var app = builder.Build();


// Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();


// CORS
app.UseCors("ReactPolicy");


app.UseAuthorization();

app.MapControllers();

app.Run();