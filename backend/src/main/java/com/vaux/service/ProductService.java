package com.vaux.service;

import com.vaux.dto.ProductDTO;
import com.vaux.entity.Product;
import com.vaux.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return convertToDTO(product);
    }

    public List<ProductDTO> getProductsByCategory(String category) {
        return productRepository.findByCategory(category)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ProductDTO> searchProducts(String name) {
        return productRepository.findByNameContainingIgnoreCase(name)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ProductDTO addProduct(ProductDTO productDTO) {
        Product product = convertToEntity(productDTO);
        product = productRepository.save(product);
        return convertToDTO(product);
    }

    private ProductDTO convertToDTO(Product product) {
        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getCategory(),
                product.getPrice(),
                product.getOriginalPrice(),
                product.getEmoji(),
                product.getRating(),
                product.getReviews(),
                product.getBadge(),
                product.getDescription(),
                product.getStock()
        );
    }

    private Product convertToEntity(ProductDTO dto) {
        return new Product(
                dto.getId(),
                dto.getName(),
                dto.getCategory(),
                dto.getPrice(),
                dto.getOriginalPrice(),
                dto.getEmoji(),
                dto.getRating(),
                dto.getReviews(),
                dto.getBadge(),
                dto.getDescription(),
                dto.getStock()
        );
    }
}
