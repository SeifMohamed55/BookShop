using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AspireApp.Application.Common.Interfaces;
public interface IImageStorageService
{
    Task<string> SaveImageAsync(byte[] image, string extension);
    bool DeleteImageAsync(string filePath);
}
