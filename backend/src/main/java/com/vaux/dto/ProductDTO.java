package com.vaux.dto;

public class ProductDTO {
    private Long id;
    private String name;
    private String category;
    private Double price;
    private Double originalPrice;
    private String emoji;
    private Double rating;
    private Integer reviews;
    private String badge;
    private String description;
    private Integer stock;

    public ProductDTO() {}
    public ProductDTO(Long id, String name, String category, Double price, Double originalPrice,
                      String emoji, Double rating, Integer reviews, String badge,
                      String description, Integer stock) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.originalPrice = originalPrice;
        this.emoji = emoji;
        this.rating = rating;
        this.reviews = reviews;
        this.badge = badge;
        this.description = description;
        this.stock = stock;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public Double getOriginalPrice() { return originalPrice; }
    public void setOriginalPrice(Double originalPrice) { this.originalPrice = originalPrice; }
    public String getEmoji() { return emoji; }
    public void setEmoji(String emoji) { this.emoji = emoji; }
    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
    public Integer getReviews() { return reviews; }
    public void setReviews(Integer reviews) { this.reviews = reviews; }
    public String getBadge() { return badge; }
    public void setBadge(String badge) { this.badge = badge; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }
}
