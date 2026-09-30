namespace ShopApi.DTOs;

public class ProductQueryParams
{
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 10;
    public string? SearchTerm { get; set; }
    public double? MinPrice { get; set; }
    public double? MaxPrice { get; set; }
}