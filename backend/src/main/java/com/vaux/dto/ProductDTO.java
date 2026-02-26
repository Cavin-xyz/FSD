package com.vaux.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
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
}
