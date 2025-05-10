using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AspireApp.Application.Common.Models;

namespace AspireApp.Application.Common.Interfaces;
public interface IStorageService
{
    public static string PhysicalUserPdfDirectory =>
                    Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploadedImages", "pdfs");

    public static string PhysicalUserImageDirectory =>
                Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploadedImages", "users");

    public static string UserImageRelativePath => "uploadedImages/users/";
    public static string UserPdfRelativePath => "uploadedImages/pdfs/";
    public static string UserBookImageRelativePath => "uploadedImages/books/";

    public static string DefaultUserImageRelativePath => UserImageRelativePath +  "default.jpg";

    Task<string> SaveImageAsync(string base64Image, FileType type);
    Task<(string Path, int Pages)> SavePdfAsync(string base64Pdf);
    bool DeleteImageAsync(string filePath);
}
