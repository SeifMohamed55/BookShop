using System.Net;
using AspireApp.Application.Common.Interfaces;
using AspireApp.Application.Common.Models;
using AspireApp.Domain.Entities;
using GraduationProject.Application.Services;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AspireApp.Application.BookClubs.Queries.GetPopularBookClubs;

public record GetReadingRatioQuery : IRequest<ServiceResult<IEnumerable<ReadingStatsDto>>> { }

public class GetReadingRatioQueryValidator : AbstractValidator<GetReadingRatioQuery>
{
    public GetReadingRatioQueryValidator()
    {
    }
}

public class GetReadingRatioQueryHandler :
IRequestHandler<GetReadingRatioQuery, ServiceResult<IEnumerable<ReadingStatsDto>>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

public GetReadingRatioQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<ServiceResult<IEnumerable<ReadingStatsDto>>> Handle(GetReadingRatioQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var historyItems = await _context.BookProgressHistories
            .Include(h => h.Book)
            .ToListAsync(cancellationToken);

            var readingStats = historyItems
            .GroupBy(h => new { h.BookProgressId, h.BookId })
            .Select(g =>
            {
                var stat = _mapper.Map<ReadingStatsDto>(g.Last());
                stat.DailyReadingProgress = g.Select(h => new DailyReadingRecordDto
                {
                    Date = h.Created.Date,
                    ReadPages = h.EndPage - h.StartPage + 1
                }).ToList();
                return stat;
            }).ToList();

            return ServiceResult<IEnumerable<ReadingStatsDto>>.Success(
                readingStats,
                "Successfully retrieved reading statistics.");
        }
        catch
        {
            return ServiceResult<IEnumerable<ReadingStatsDto>>.Failure(
                "An error occurred while retrieving reading statistics.",
                HttpStatusCode.InternalServerError);
        }
    }
}
