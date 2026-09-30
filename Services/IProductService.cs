using ShopApi.DTOs;

namespace ShopApi.Services;

public interface IProductService
{
    Task<PagedResultDto<ProductResponseDto>> GetAllAsync(ProductQueryParams queryParams);
    Task<ProductResponseDto?> GetByIdAsync(int id);
    Task<ProductResponseDto> CreateAsync(CreateProductDto dto);
    Task<bool> UpdateAsync(int id, UpdateProductDto dto);
    Task<bool> DeleteAsync(int id);
}