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
using SixLabors.ImageSharp.Formats;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp;
using Azure.Core;

namespace AspireApp.Infrastructure.FileStorage;
public class ImageStorageService : IImageStorageService
{
    private readonly ILogger<ImageStorageService> _logger;
    public ImageStorageService(ILogger<ImageStorageService> logger)
    {
        _logger = logger;

        if (!Directory.Exists(IImageStorageService.PhysicalUserImageDirectory))
        {
            Directory.CreateDirectory(IImageStorageService.PhysicalUserImageDirectory); // Create the folder if it doesn't exist
        }

    }

    private (byte[], string, string) Base64ToImage(string base64String)
    {
        // Check if it contains "base64,"
        var base64Parts = base64String.Split(',');
        if (base64Parts.Length > 1)
        {
            base64String = base64Parts[1]; // Get only the Base64 part
        }
        // data:image/jpeg;base64,<base64Image>
        var contentType = base64Parts[0].Split(':')[1].Split(';')[0];

        byte[] imageBytes = Convert.FromBase64String(base64String);

        if (imageBytes.Length > 2 * 1024 * 1024)
            throw new FileLoadException("File Size can't exceed 2MB.");

        var extension = $".{contentType.Split('/')[1]}"; // Get the file extension from the content type

        return (imageBytes, contentType, extension);

    }

    public async Task<string> SaveImageAsync(string base64Image)
    {
        try
        {
            (byte[] imageBytes, string contentType, string extension) = Base64ToImage(base64Image);

            // Generate a unique filename using a GUID
            var fileName = Guid.NewGuid().ToString() + extension;
            var filePath = IImageStorageService.PhysicalUserImageDirectory + fileName;

            // Save the file to the specified path in wwwroot
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await stream.WriteAsync(imageBytes, 0, imageBytes.Length);
            }

            return filePath; // Return the file path to store in the database (relative path)
        }
        catch (Exception ex)
        {
            // Handle exceptions (e.g., log the error)
            _logger.LogError($"Error saving image: {ex.Message}");
            return IImageStorageService.DefaultUserImageRelativePath; // Return a default image path in case of an error
        }
    }

    public bool DeleteImageAsync(string dbRelativeFilePath)
    {
        try
        {
            // Check if the file path is valid and not the default image
            if (string.IsNullOrWhiteSpace(dbRelativeFilePath))
            {
                return false;
            }

            if (dbRelativeFilePath.Equals(IImageStorageService.DefaultUserImageRelativePath, StringComparison.OrdinalIgnoreCase))
            {
                return true; // Do not delete the default image
            }

            dbRelativeFilePath = IImageStorageService.PhysicalUserImageDirectory + dbRelativeFilePath.Split('/').Last();

            if (File.Exists(dbRelativeFilePath))
            {
                File.Delete(dbRelativeFilePath);
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

