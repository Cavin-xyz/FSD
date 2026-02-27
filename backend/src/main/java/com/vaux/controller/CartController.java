package com.vaux.controller;

import com.vaux.dto.CartItemDTO;
import com.vaux.repository.UserRepository;
import com.vaux.service.CartService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserRepository userRepository;

    private Long getUserId(UserDetails userDetails) {
        return userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getId();
    }

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody AddToCartRequest request) {
        try {
            CartItemDTO item = cartService.addToCart(
                    getUserId(userDetails),
                    request.getProductId(),
                    request.getQuantity());
            return ResponseEntity.ok(item);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<?> getCart(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            Long userId = getUserId(userDetails);
            List<CartItemDTO> items = cartService.getCartItems(userId);
            Double total = cartService.getCartTotal(userId);
            return ResponseEntity.ok(new CartResponse(items, total));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @PutMapping("/{itemId}")
    public ResponseEntity<?> updateCartItem(
            @PathVariable Long itemId,
            @RequestBody UpdateCartRequest request) {
        try {
            CartItemDTO item = cartService.updateCartItem(itemId, request.getQuantity());
            return ResponseEntity.ok(item);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<?> removeFromCart(@PathVariable Long itemId) {
        try {
            cartService.removeFromCart(itemId);
            return ResponseEntity.ok(new SuccessResponse("Item removed from cart"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @DeleteMapping("/clear")
    public ResponseEntity<?> clearCart(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            cartService.clearCart(getUserId(userDetails));
            return ResponseEntity.ok(new SuccessResponse("Cart cleared"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    static class AddToCartRequest {
        private Long productId;
        private Integer quantity;

        public AddToCartRequest() {}
        public AddToCartRequest(Long productId, Integer quantity) {
            this.productId = productId;
            this.quantity = quantity;
        }

        public Long getProductId() { return productId; }
        public void setProductId(Long productId) { this.productId = productId; }
        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
    }

    static class UpdateCartRequest {
        private Integer quantity;

        public UpdateCartRequest() {}
        public UpdateCartRequest(Integer quantity) {
            this.quantity = quantity;
        }

        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
    }

    static class CartResponse {
        private List<CartItemDTO> items;
        private Double total;

        public CartResponse() {}
        public CartResponse(List<CartItemDTO> items, Double total) {
            this.items = items;
            this.total = total;
        }

        public List<CartItemDTO> getItems() { return items; }
        public void setItems(List<CartItemDTO> items) { this.items = items; }
        public Double getTotal() { return total; }
        public void setTotal(Double total) { this.total = total; }
    }

    static class ErrorResponse {
        private String error;

        public ErrorResponse() {}
        public ErrorResponse(String error) {
            this.error = error;
        }

        public String getError() { return error; }
        public void setError(String error) { this.error = error; }
    }

    static class SuccessResponse {
        private String message;

        public SuccessResponse() {}
        public SuccessResponse(String message) {
            this.message = message;
        }

        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
    }
}
