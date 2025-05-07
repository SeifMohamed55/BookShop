using GraduationProject.Application.Services;

namespace AspireApp.Application.Accounts.Commands.Register;

public record RegisterCommand : IRequest<CommandHandlerResult<bool>>
{
    public required string Fullname { get; init; }
    public required string Email { get; init; }
    public required string Password { get; init; }
    public required string ConfirmPassword { get; init; }
    public required byte[] Image { get; init; }
    public required string ContentType { get; init; }
    public required string Extension { get; init; }
}
