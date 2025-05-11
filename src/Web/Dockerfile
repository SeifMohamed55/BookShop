# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Install Node.js and npm
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get update && \
    apt-get install -y nodejs && \
    npm install -g npm@latest

# Copy the solution and project files
COPY ["BookShop.sln", "./"]
COPY ["Directory.Build.props", "./"]
COPY ["Directory.Packages.props", "./"]
COPY ["src/Web/Web.csproj", "src/Web/"]
COPY ["src/Application/Application.csproj", "src/Application/"]
COPY ["src/Domain/Domain.csproj", "src/Domain/"]
COPY ["src/Infrastructure/Infrastructure.csproj", "src/Infrastructure/"]
COPY ["src/ServiceDefaults/ServiceDefaults.csproj", "src/ServiceDefaults/"]

# Create a temporary solution file without test projects
RUN dotnet new sln -n BookShop.Docker && \
    dotnet sln BookShop.Docker.sln add src/Web/Web.csproj && \
    dotnet sln BookShop.Docker.sln add src/Application/Application.csproj && \
    dotnet sln BookShop.Docker.sln add src/Domain/Domain.csproj && \
    dotnet sln BookShop.Docker.sln add src/Infrastructure/Infrastructure.csproj && \
    dotnet sln BookShop.Docker.sln add src/ServiceDefaults/ServiceDefaults.csproj

# Restore dependencies using the Docker-specific solution
RUN dotnet restore "BookShop.Docker.sln" --property:TargetFramework=net9.0

# Copy the rest of the code
COPY . .

# Build and publish each project separately
WORKDIR /src/src/Domain
RUN dotnet build -c Release --property:TargetFramework=net9.0

WORKDIR /src/src/Application
RUN dotnet build -c Release --property:TargetFramework=net9.0

WORKDIR /src/src/Infrastructure
RUN dotnet build -c Release --property:TargetFramework=net9.0

WORKDIR /src/src/ServiceDefaults
RUN dotnet build -c Release --property:TargetFramework=net9.0

# Build and publish Web project with SPA
WORKDIR /src/src/Web
RUN dotnet build -c Release --property:TargetFramework=net9.0
RUN dotnet publish -c Release -o /app/publish --property:TargetFramework=net9.0

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app

# Copy the published output
COPY --from=build /app/publish .

# Verify the files are copied
RUN ls -la /app

# Set environment variables
ENV ASPNETCORE_URLS=http://+:80
ENV ASPNETCORE_ENVIRONMENT=Production

EXPOSE 80
ENTRYPOINT ["dotnet", "Web.dll"] 