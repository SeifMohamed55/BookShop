using AspireApp.Application.Common.Interfaces;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Hosting;
using PdfSharp.Pdf.IO;
using AspireApp.Application.Common.Models;
using PdfSharp.Pdf;

namespace AspireApp.Infrastructure.FileStorage;

public class StorageService : IStorageService
{
    private readonly ILogger<StorageService> _logger;
    private readonly string _rootUploadPath;

    public StorageService(ILogger<StorageService> logger, IWebHostEnvironment env)
    {
        _logger = logger;
        _rootUploadPath = Path.Combine(env.WebRootPath, "uploadedFiles");        
        EnsureDirectoriesExist();
    }

    private void EnsureDirectoriesExist()
    {
        foreach (var folder in new[] { "users", "books", "pdfs" })
        {
            var path = Path.Combine(_rootUploadPath, folder);
            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);
        }
    }

    private static (byte[] Bytes, string ContentType, string Extension) ParseBase64(string base64String)
    {
        var parts = base64String.Split(',');
        if (parts.Length > 1)
            base64String = parts[1];

        var meta = parts[0].Split(':')[1].Split(';')[0];
        var extension = "." + meta.Split('/')[1];

        var bytes = Convert.FromBase64String(base64String);
        if (bytes.Length > 2 * 1024 * 1024)
            throw new FileLoadException("File Size can't exceed 2MB.");

        return (bytes, meta, extension);
    }

    private static int GetPdfPageCount(byte[] pdfBytes)
    {
        using var stream = new MemoryStream(pdfBytes);
        using var doc = PdfReader.Open(stream, PdfDocumentOpenMode.Import);
        return doc.PageCount;
    }

    private async Task<string> SaveFileAsync(byte[] bytes, string fileName, string subfolder)
    {
        var path = Path.Combine(_rootUploadPath, subfolder, fileName);
        await File.WriteAllBytesAsync(path, bytes);
        return path;
    }

    public async Task<string> SaveImageAsync(string base64Image, FileType type)
    {
        try
        {
            var (bytes, _, extension) = ParseBase64(base64Image);
            var fileName = $"{Guid.NewGuid()}{extension}";

            var subfolder = type switch
            {
                FileType.UserImage => "users",
                FileType.BookImage => "books",
                _ => throw new ArgumentException("Invalid image type", nameof(type))
            };

            await SaveFileAsync(bytes, fileName, subfolder);
            return BuildRelativeUrl(fileName, subfolder);
        }
        catch (Exception ex)
        {
            var subfolder = type switch
            {
                FileType.UserImage => "users",
                FileType.BookImage => "books",
                _ => ""
            };

            _logger.LogError(ex, "Error saving image");
            return BuildRelativeUrl("default.jpg", subfolder);
        }
    }

    public async Task<(string Path, int Pages)> SavePdfAsync(string base64Pdf)
    {
        try
        {
            var (bytes, _, extension) = ParseBase64(base64Pdf);
            var fileName = $"{Guid.NewGuid()}{extension}";

            await SaveFileAsync(bytes, fileName, "pdfs");

            int pages = GetPdfPageCount(bytes);

            return (BuildRelativeUrl(fileName, "pdfs"), pages);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error saving PDF");
            return ("", 0);
        }
    }

    private static string BuildRelativeUrl(string fileName, string folder)
    {
        var backendUrl = Environment.GetEnvironmentVariable("BackendUrl")?.TrimEnd('/') ?? "";
        return $"{backendUrl}/uploadedFiles/{folder}/{fileName}";
    }

    public byte[] GetBookPage(string filePath, int page)
    {
        try
        {
            var segments = filePath.Split('/');
            if (segments.Length < 3) 
                return Array.Empty<byte>();

            var subfolder = segments[^2];
            var fileName = segments[^1];
            var fullPath = Path.Combine(_rootUploadPath, subfolder, fileName);

            if (!File.Exists(fullPath))
                return Array.Empty<byte>();

            using var stream = new MemoryStream(File.ReadAllBytes(fullPath));
            using var inputDocument = PdfReader.Open(stream, PdfDocumentOpenMode.Import);

            if (page < 1 || page > inputDocument.PageCount)
                return Array.Empty<byte>();

            using var outputDocument = new PdfDocument();
            outputDocument.AddPage(inputDocument.Pages[page - 1]);

            using var outputStream = new MemoryStream();
            outputDocument.Save(outputStream, false); // 'false' to leave stream open after save
            return outputStream.ToArray();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting book page");
            return Array.Empty<byte>();
        }

    }

    public bool DeleteImageAsync(string dbRelativePath)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(dbRelativePath) ||
                dbRelativePath.EndsWith(IStorageService.DefaultUserImageRelativePath, StringComparison.OrdinalIgnoreCase))
                return true;

            var segments = dbRelativePath.Split('/');
            if (segments.Length < 3) return false;

            var subfolder = segments[^2];
            var fileName = segments[^1];

            var fullPath = Path.Combine(_rootUploadPath, subfolder, fileName);

            if (File.Exists(fullPath))
            {
                File.Delete(fullPath);
                return true;
            }

            return false;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting file");
            return false;
        }
    }
}
