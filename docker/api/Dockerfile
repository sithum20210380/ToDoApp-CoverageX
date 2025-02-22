# Use .NET SDK image for building
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy project files first to leverage Docker cache
COPY ["src/TodoApp.Api/TodoApp.Api.csproj", "TodoApp.Api/"]
COPY ["src/TodoApp.Core/TodoApp.Core.csproj", "TodoApp.Core/"]
COPY ["src/TodoApp.Infrastructure/TodoApp.Infrastructure.csproj", "TodoApp.Infrastructure/"]

# Restore NuGet packages
RUN dotnet restore "TodoApp.Api/TodoApp.Api.csproj"

# Copy the rest of the source code
COPY src/ .

# Build and publish the application
RUN dotnet publish "TodoApp.Api/TodoApp.Api.csproj" -c Release -o /app/publish

# Create the final runtime image
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "TodoApp.Api.dll"]