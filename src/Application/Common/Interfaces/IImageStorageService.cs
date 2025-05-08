using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AspireApp.Application.Common.Interfaces;
public interface IImageStorageService
{
    public static string PhysicalUserImageDirectory =>
                    Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", UserImageRelativePath);

    public static string UserImageRelativePath => "uploadedImages/users/";

    public static string DefaultUserImageRelativePath => UserImageRelativePath +  "default.jpg";

    Task<string> SaveImageAsync(string base64Image);
    bool DeleteImageAsync(string filePath);
}
