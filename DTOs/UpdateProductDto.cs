namespace ShopApi.DTOs;

public class UpdateProductDto
{
    public string Name { get; set; } = string.Empty;
    public int Stock { get; set; }
    public double Price { get; set; }
}