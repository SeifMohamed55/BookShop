using AspireApp.Application.Common.Interfaces;
using AspireApp.Application.Common.Models;
using AspireApp.Application.UseCases.Accounts.Commands.Login;
using AspireApp.Application.UseCases.Accounts.Commands.Register;
using AutoMapper;
using GraduationProject.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace AspireApp.Infrastructure.Identity;
public class IdentityService : IIdentityService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IUserClaimsPrincipalFactory<ApplicationUser> _userClaimsPrincipalFactory;
    private readonly IAuthorizationService _authorizationService;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly IMapper _mapper;

    public IdentityService(
        UserManager<ApplicationUser> userManager,
        IUserClaimsPrincipalFactory<ApplicationUser> userClaimsPrincipalFactory,
        IAuthorizationService authorizationService,
        SignInManager<ApplicationUser> signInManager,
        IMapper mapper
        )
    {
        _userManager = userManager;
        _userClaimsPrincipalFactory = userClaimsPrincipalFactory;
        _authorizationService = authorizationService;
        _signInManager = signInManager;
        _mapper = mapper;
    }

    public async Task<string?> GetUserNameAsync(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);

        return user?.UserName;
    }


    public async Task<ServiceResult<UserDto>> CreateUserAsync(RegisterCommand model, string relativeUrl)
    {
        var user = new ApplicationUser
        {
            UserName = model.Email,
            Email = model.Email,
            FullName = model.Fullname,
            ImageUrl = relativeUrl
        };

        var result = await _userManager.CreateAsync(user, model.Password);
        if (!result.Succeeded)
        {
            return ServiceResult<UserDto>.Failure("Couldn't create user", result.ToApplicationResult());
        }

        var dto = _mapper.Map<UserDto>(user);
        return ServiceResult<UserDto>.Success(dto, "User created successfully");
    }

    public async Task<ServiceResult<bool>> UpdateUserImage(string userId, string url)
    {
        var user = await _userManager.FindByIdAsync(userId);

        if (user == null)
        {
            return ServiceResult<bool>.Failure("User doesn't exist");
        }

        user.ImageUrl = url;
        var result = await _userManager.UpdateAsync(user);
        if (!result.Succeeded)
        {
            return ServiceResult<bool>.Failure("Couldn't update user image", result.ToApplicationResult());
        }

        return ServiceResult<bool>.Success(true, "User image updated successfully");

    }

    public async Task<ServiceResult<bool>> SignOutAsync()
    {
        if(_signInManager.IsSignedIn(_signInManager.Context.User))
        {
            await _signInManager.SignOutAsync();
            return ServiceResult<bool>.Success(true, "User signed out successfully");
        }
        return ServiceResult<bool>.Success(false,"User is not signed in");

    }

    public async Task<ServiceResult<IDictionary<string, UserDto>>> GetUsersDtos(IEnumerable<string> ids)
    {
        var users = await _userManager.Users
            .Where(x => ids.Contains(x.Id))
            .ToListAsync();
        if (users.Count == 0)
        {
            return ServiceResult<IDictionary<string, UserDto>>.Failure("No users found");
        }
        var userDtos = users.ToDictionary(user => user.Id, _mapper.Map<UserDto>);
        return ServiceResult<IDictionary<string, UserDto>>.Success(userDtos, "Users retrieved successfully");
    }

    public async Task<ServiceResult<UserDto>> GetUserDtoById(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            return ServiceResult<UserDto>.Failure("User doesn't exist");
        }
        var userDto = _mapper.Map<UserDto>(user);
        return ServiceResult<UserDto>.Success(userDto, "User retrieved successfully");
    }


    public async Task<UserDto> GetRandomUser()
    {
        var users = await _userManager.Users.ToListAsync();

        var randomUser = users[new Random().Next(users.Count)];
        var userDto = _mapper.Map<UserDto>(randomUser);
        return userDto;
    }

    public async Task<bool> IsInRoleAsync(string userId, string role)
    {
        var user = await _userManager.FindByIdAsync(userId);

        return user != null && await _userManager.IsInRoleAsync(user, role);
    }

    public async Task<ServiceResult<UserDto>> SignInAsync(LoginCommand command)
    {
        var user = await _userManager.FindByEmailAsync(command.Email);
        if (user == null)
        {
            return ServiceResult<UserDto>.Failure("User doesn't exist");
        }

        var signin = await _signInManager.PasswordSignInAsync( 
            user,
            command.Password,
            command.RememberMe,
            false
        );

        if(signin.Succeeded)
        {
            var userDto = _mapper.Map<UserDto>(user);

            return ServiceResult<UserDto>.Success(userDto, "User signed in successfully");
        }

        return ServiceResult<UserDto>.Failure("Incorrect Password!");

    }

    public async Task<bool> AuthorizeAsync(string userId, string policyName)
    {
        var user = await _userManager.FindByIdAsync(userId);

        if (user == null)
        {
            return false;
        }

        var principal = await _userClaimsPrincipalFactory.CreateAsync(user);

        var result = await _authorizationService.AuthorizeAsync(principal, policyName);

        return result.Succeeded;
    }

    public async Task<ServiceResult<bool>> DeleteUserAsync(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);

        return user != null ? await DeleteUserAsync(user) : ServiceResult<bool>.Failure("Couldn't Delete User.");
    }

    public async Task<ServiceResult<bool>> DeleteUserAsync(ApplicationUser user)
    {
        var result = await _userManager.DeleteAsync(user);

        return ServiceResult<bool>.Success(true, "User deleted successfully.");
    }
}
