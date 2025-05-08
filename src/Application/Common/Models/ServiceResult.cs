using System.Diagnostics.CodeAnalysis;
using System.Net;
using AspireApp.Application.Common.Models;

namespace GraduationProject.Application.Services
{

    public class ServiceResult<T>
    {
        public bool IsSuccess { get; }
        public T? Data { get; }  // Data is only available for success
        public string Message { get; } 
        public HttpStatusCode StatusCode { get; }

        public string[] Errors { get; } = Array.Empty<string>();

        private ServiceResult(bool isSuccess, T? data, string message, HttpStatusCode code, string[]? errors = null)
        {
            IsSuccess = isSuccess;
            Data = data;
            Message = message;
            StatusCode = code;
            if(errors != null)
                Errors = errors;
        }


        public static ServiceResult<T> Success(T data, string message, HttpStatusCode code = HttpStatusCode.OK) 
            => new(true, data, message, code, null);

        public static ServiceResult<T> Failure(string message, ApplicationIdentityResult result, HttpStatusCode code = HttpStatusCode.BadRequest)
        {
            return new(false, default, message, code, result.Errors);
        }
            

        public static ServiceResult<T> Failure(string message, HttpStatusCode code = HttpStatusCode.BadRequest) 
            => new(false, default, message, code, null);

        public bool TryGetData([NotNullWhen(true)] out T? data)
        {
            data = Data;
            return IsSuccess && data != null;
        }

        public bool TryGetErrors([NotNullWhen(true)] out string[]? errors)
        {
            errors = Errors;
            return !IsSuccess && errors.Length != 0;
        }

    }


}
