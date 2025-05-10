using System.Collections.ObjectModel;

namespace AspireApp.Application.Common.Models;

public abstract class ApiResponse
{
    public ApiResponse(string message)
    {
        Message = message;
    }
    public bool Success { get; set; }
    public string Message { get; set; }
}

public class SuccessResponse<T> : ApiResponse
{
    public SuccessResponse(T data, string message) : base(message)
    {
        Data = data;
        Success = true;
    }
    public T Data { get; set; }
}


public class ErrorResponse : ApiResponse
{
    public ErrorResponse(string message, string[]? errors = null) : base(message)
    {
        Message = message;
        Success = false;
        if (errors != null)
            Errors = errors.AsReadOnly();
    }

    public IReadOnlyCollection<string> Errors { get; set; } = ReadOnlyCollection<string>.Empty;
}
