using GraduationProject.Application.Services;

namespace AspireApp.Application.UseCases.Accounts.Commands.Register;

public record RegisterCommand : IRequest<ServiceResult<bool>>
{
    public required string Fullname { get; init; }
    public required string Email { get; init; }
    public required string Password { get; init; }
    public required string ConfirmPassword { get; init; }
    public string? Image { get; init; }

}
