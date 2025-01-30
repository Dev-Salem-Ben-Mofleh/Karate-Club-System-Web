using clsKarateDataAccesse;
using clsKarateDataAccesseLayer;

var builder = WebApplication.CreateBuilder(args);

clsAccesseSetting.Initialize(builder.Configuration);
builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", policy =>
    {
        policy.WithOrigins("https://karate-club-system.netlify.app")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting(); 

app.UseCors("AllowSpecificOrigin");

app.UseAuthorization(); 

app.MapControllers();

app.Run();
