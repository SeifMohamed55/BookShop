﻿using AspireApp.Application.Common.Interfaces;
using AspireApp.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.DependencyInjection;

namespace GraduationProject.Infrastructure.Data
{

    // Under testing
    public class DictionaryUnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;
        private IDbContextTransaction? _transaction = null;
        private readonly IServiceProvider _serviceProvider;
        private readonly Dictionary<Type, object> _repositories;

        public DictionaryUnitOfWork(ApplicationDbContext context, IServiceProvider serviceProvider)
        {
            _context = context;
            _serviceProvider = serviceProvider;
            _repositories = new Dictionary<Type, object>();
        }

        public TRepo GetRepository<TRepo>() where TRepo : class, IRepository 
        {
            var type = typeof(TRepo);
            if (!_repositories.TryGetValue(type, out var repo))
            {
                repo = _serviceProvider.GetRequiredService<TRepo>();
                _repositories[type] = repo;
            }
            return (TRepo)repo;
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task BeginTransactionAsync()
        {
            if (_transaction != null)
            {
                throw new InvalidOperationException("A transaction is already in progress.");
            }

            _transaction = await _context.Database.BeginTransactionAsync();
        }

        public async Task CommitTransactionAsync()
        {
            if (_transaction == null)
                throw new InvalidOperationException("No transaction is available.");

            await _context.SaveChangesAsync();
            await _transaction.CommitAsync();

            await _transaction.DisposeAsync();
            _transaction = null;
        }

        public async Task RollbackTransactionAsync()
        {
            if (_transaction != null)
            {
                await _transaction.RollbackAsync();
                await _transaction.DisposeAsync();
                _transaction = null;
            }
        }
    }
}
