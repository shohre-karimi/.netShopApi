using ShopApi.DTOs;
using ShopApi.Models;
using ShopApi.Repositories;

namespace ShopApi.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _repository;

    public ProductService(IProductRepository repository)
    {
        _repository = repository;
    }

    public async Task<PagedResultDto<ProductResponseDto>> GetAllAsync(ProductQueryParams queryParams)
    {
        var (items, totalCount) = await _repository.GetAllAsync(queryParams);

        return new PagedResultDto<ProductResponseDto>
        {
            Items = items.Select(MapToDto).ToList(),
            TotalCount = totalCount,
            Page = queryParams.Page,
            PageSize = queryParams.PageSize
        };
    }

    public async Task<ProductResponseDto?> GetByIdAsync(int id)
    {
        var product = await _repository.GetByIdAsync(id);
        return product == null ? null : MapToDto(product);
    }

    public async Task<ProductResponseDto> CreateAsync(CreateProductDto dto)
    {
        var product = new Product
        {
            Name = dto.Name,
            Stock = dto.Stock,
            Price = dto.Price
        };

        await _repository.AddAsync(product);
        return MapToDto(product);
    }

    public async Task<bool> UpdateAsync(int id, UpdateProductDto dto)
    {
        var product = await _repository.GetByIdAsync(id);

        if (product == null)
        {
            return false;
        }

        product.Name = dto.Name;
        product.Stock = dto.Stock;
        product.Price = dto.Price;

        await _repository.UpdateAsync(product);
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var product = await _repository.GetByIdAsync(id);

        if (product == null)
        {
            return false;
        }

        await _repository.DeleteAsync(product);
        return true;
    }

    // متد کمکی برای تبدیل Product (مدل دیتابیس) به ProductResponseDto
    private static ProductResponseDto MapToDto(Product product)
    {
        return new ProductResponseDto
        {
            Id = product.Id,
            Name = product.Name,
            Stock = product.Stock,
            Price = product.Price
        };
    }
}