using System.Net;
using AspireApp.Application.Common.Interfaces;
using AspireApp.Application.Common.Models;
using GraduationProject.Application.Services;

namespace AspireApp.Application.Books.Queries.GetBookById;

public record GetBookByIdQuery(int id) : IRequest<ServiceResult<BookDto>>
{
}

public class GetBookByIdQueryValidator : AbstractValidator<GetBookByIdQuery>
{
    public GetBookByIdQueryValidator()
    {
    }
}

public class GetBookByIdQueryHandler : IRequestHandler<GetBookByIdQuery, ServiceResult<BookDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetBookByIdQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<ServiceResult<BookDto>> Handle(GetBookByIdQuery request, CancellationToken cancellationToken)
    {
       var bookDto = await _context.Books
            .ProjectTo<BookDto>(_mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(b => b.Id == request.id, cancellationToken);

        if (bookDto == null)
        {
            return ServiceResult<BookDto>.Failure("Book not found.", HttpStatusCode.NotFound);
        }
        
        return ServiceResult<BookDto>.Success(bookDto, "Book fetched successfully.");
    }
}
