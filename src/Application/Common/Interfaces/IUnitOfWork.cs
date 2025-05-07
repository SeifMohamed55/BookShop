using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AspireApp.Application.Common.Interfaces;
public interface IUnitOfWork
{
    TRepo GetRepository<TRepo>() where TRepo : class, IRepository;
    Task SaveChangesAsync();
    Task BeginTransactionAsync();
    Task CommitTransactionAsync();
    Task RollbackTransactionAsync();

}
