using app.clientesChGio.services.Implementations;
using app.ecCliente.dataAccess.context;
using app.ecCliente.dataAccess.repositories;
using app.ecCliente.services.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


//LA CADENA DE CONEXION ESTA EN EL appsettings.json
//CON EL SIGUIENTA LINEA OBTENEMOS LA CADENA DE CONEXION A SQL SERVER
var conSqlServer = builder.Configuration.GetConnectionString("BDDSqlServer")!;
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(conSqlServer);
    options.LogTo(Console.WriteLine, LogLevel.Information).EnableSensitiveDataLogging();
});


//declarar servicio y repositorios
builder.Services.AddScoped<IClienteRepository, ClienteRepository>();
builder.Services.AddScoped<IClienteService, ClienteService>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
