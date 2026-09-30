using ShopApi.DTOs;
using ShopApi.Models;

namespace ShopApi.Repositories;

public interface IProductRepository
{
    Task<(List<Product> Items, int TotalCount)> GetAllAsync(ProductQueryParams queryParams);
    Task<Product?> GetByIdAsync(int id);
    Task AddAsync(Product product);
    Task UpdateAsync(Product product);
    Task DeleteAsync(Product product);
}