namespace AspireApp.Application.Accounts.Commands.Register;

public class RegisterCommandValidator : AbstractValidator<RegisterCommand>
{
    private readonly HashSet<string> allowedMimeTypes = new HashSet<string>
    {
        "image/jpeg", "image/png", "image/gif", "image/bmp",
        "image/webp", "image/tiff"
    };

    private readonly HashSet<string> allowedExtensions = new HashSet<string>
    {
        ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp", ".tiff"
    };

    public RegisterCommandValidator()
    {
        RuleFor(x => x.Fullname)
            .NotEmpty()
            .WithMessage("Full name is required.");
        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress()
            .WithMessage("A valid email address is required.");
        RuleFor(x => x.Password)
            .NotEmpty()
            .MinimumLength(6)
            .WithMessage("Password must be at least 6 characters long.");
        RuleFor(x => x.ConfirmPassword)
            .Equal(x => x.Password)
            .WithMessage("Passwords do not match.");

        RuleFor(x => x.Image)
            .NotNull()
            .WithMessage("Image is required.")
            .Must(file => file.Length <= 2 * 1024 * 1024) // 2MB
            .WithMessage("Image size must not exceed 2MB.");

        RuleFor(x => x.ContentType)
            .NotEmpty()
            .WithMessage("Content type is required.")
            .Must(IsSupportedContentType)
            .WithMessage("Unsupported image format. Supported formats are: jpeg, png, gif, bmp, webp, tiff.");

        RuleFor(x => x.Extension)
            .NotEmpty()
            .WithMessage("File extension is required.")
            .Must(ext => allowedExtensions.Contains(ext.ToLower()))
            .WithMessage("Unsupported file extension. Supported extensions are: jpg, jpeg, png, gif, bmp, webp, tiff.");

    }

    private bool IsSupportedContentType(string contentType)
    {
        return allowedMimeTypes.Contains(contentType);
    }
}
