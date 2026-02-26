package com.vaux;

import com.vaux.entity.Product;
import com.vaux.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final ProductRepository productRepository;

    public DataSeeder(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) {
        // Only seed if the table is empty — idempotent
        if (productRepository.count() > 0) {
            System.out.println("[DataSeeder] Products already seeded, skipping.");
            return;
        }

        List<Product> products = List.of(
            product("Leather Weekend Bag",     "fashion",     320.0, "👜", 4.8, 124, "new",  null),
            product("Signature Eau de Parfum", "beauty",      148.0, "🧴", 4.9,  89, null,   null),
            product("Minimal Gold Watch",      "accessories", 540.0, "⌚", 4.7,  52, null,   null),
            product("Cashmere Throw Blanket",  "home",        195.0, "🧣", 4.6,  78, "sale", 265.0),
            product("Structured Blazer",       "fashion",     420.0, "🧥", 4.8,  63, null,   null),
            product("Facial Serum Set",        "beauty",       88.0, "✨", 4.9, 210, "sale", 120.0),
            product("Ceramic Vase Trio",       "home",        145.0, "🏺", 4.5,  34, "new",  null),
            product("Silk Scarf",              "accessories", 210.0, "🎀", 4.7,  91, null,   null),
            product("Merino Turtleneck",       "fashion",     185.0, "👕", 4.6, 147, null,   null),
            product("Linen Candle Duo",        "home",         65.0, "🕯️", 4.8, 203, null,   null),
            product("Pearl Drop Earrings",     "accessories", 290.0, "💎", 4.9,  68, "new",  null),
            product("Hand Cream Collection",   "beauty",       55.0, "🫙", 4.7, 312, "sale",  78.0)
        );

        productRepository.saveAll(products);
        System.out.println("[DataSeeder] Seeded " + products.size() + " products.");
    }

    private Product product(String name, String category, Double price,
                            String emoji, Double rating, Integer reviews,
                            String badge, Double originalPrice) {
        Product p = new Product();
        p.setName(name);
        p.setCategory(category);
        p.setPrice(price);
        p.setEmoji(emoji);
        p.setRating(rating);
        p.setReviews(reviews);
        p.setBadge(badge);
        p.setOriginalPrice(originalPrice);
        return p;
    }
}
