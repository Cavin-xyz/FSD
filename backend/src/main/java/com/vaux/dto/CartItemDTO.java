package com.vaux.dto;

public class CartItemDTO {
    private Long id;
    private Long productId;
    private String productName;
    private String emoji;
    private Integer quantity;
    private Double price;
    private Double totalPrice;

    public CartItemDTO() {}
    public CartItemDTO(Long id, Long productId, String productName, String emoji,
                       Integer quantity, Double price, Double totalPrice) {
        this.id = id;
        this.productId = productId;
        this.productName = productName;
        this.emoji = emoji;
        this.quantity = quantity;
        this.price = price;
        this.totalPrice = totalPrice;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }
    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }
    public String getEmoji() { return emoji; }
    public void setEmoji(String emoji) { this.emoji = emoji; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public Double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(Double totalPrice) { this.totalPrice = totalPrice; }
}
