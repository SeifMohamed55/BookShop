namespace AspireApp.Web.Requests;

public class RegisterRequest
{
    public required string Fullname { get; init; }
    public required string Email { get; init; }
    public required string Password { get; init; }
    public required string ConfirmPassword { get; init; }
    public required IFormFile Image { get; init; }
}
