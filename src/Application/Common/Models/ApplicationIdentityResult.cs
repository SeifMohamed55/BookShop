namespace AspireApp.Application.Common.Models;

public class ApplicationIdentityResult
{
    internal ApplicationIdentityResult(bool succeeded, IEnumerable<string> errors)
    {
        Succeeded = succeeded;
        Errors = errors.ToArray();
    }

    public bool Succeeded { get; init; }

    public string[] Errors { get; init; }

    public static ApplicationIdentityResult Success()
    {
        return new ApplicationIdentityResult(true, Array.Empty<string>());
    }

    public static ApplicationIdentityResult Failure(IEnumerable<string> errors)
    {
        return new ApplicationIdentityResult(false, errors);
    }
}
