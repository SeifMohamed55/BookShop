using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AspireApp.Application.Common.Interfaces;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace AspireApp.Infrastructure.FileStorage;
public class ImageStorageService : IImageStorageService
{
    internal static string UserImageDirectory => 
                        Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploadedImages", "users");

    internal static string DefaultUserImagePath => Path.Combine(UserImageDirectory, "default.jpg");

    private readonly ILogger<ImageStorageService> _logger;
    public ImageStorageService(ILogger<ImageStorageService> logger)
    {
        _logger = logger;

        if (!Directory.Exists(UserImageDirectory))
        {
            Directory.CreateDirectory(UserImageDirectory); // Create the folder if it doesn't exist
        }

    }

    public async Task<string> SaveImageAsync(byte[] file, string extension)
    {
        try
        {
            // Generate a unique filename using a GUID
            var fileName = Guid.NewGuid().ToString() + extension;
            var filePath = Path.Combine(UserImageDirectory, fileName);

            // Save the file to the specified path in wwwroot
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await stream.WriteAsync(file, 0, file.Length);
            }

            return filePath; // Return the file path to store in the database (relative path)
        }
        catch (Exception ex)
        {
            // Handle exceptions (e.g., log the error)
            _logger.LogError($"Error saving image: {ex.Message}");
            return DefaultUserImagePath; // Return a default image path in case of an error
        }
    }

    public bool DeleteImageAsync(string filePath)
    {
        try
        {
            // Check if the file path is valid and not the default image
            if (string.IsNullOrWhiteSpace(filePath))
            {
                return false;
            }

            if (filePath.Equals(DefaultUserImagePath, StringComparison.OrdinalIgnoreCase))
            {
                return true; // Do not delete the default image
            }

            if (File.Exists(filePath))
            {
                File.Delete(filePath);
                return true;
            }
            return false; // File not found
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error deleting image: {ex.Message}");
            return false;
        }
            
    }
}

