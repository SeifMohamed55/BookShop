using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AspireApp.Application.Common.Models;
public class BookPageDto
{
    public int TotalPages { get; set; }
    public int CurrentPage { get; set; }
    public byte[] Content { get; set; } = null!;
}
