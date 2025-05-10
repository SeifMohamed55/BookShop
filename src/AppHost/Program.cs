using Projects;

var builder = DistributedApplication.CreateBuilder(args);

builder.AddProject<Web>("web");

builder.Build().Run();
