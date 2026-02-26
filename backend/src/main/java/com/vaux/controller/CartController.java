package com.vaux.controller;

import com.vaux.dto.CartItemDTO;
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
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody AddToCartRequest request) {
        try {
            CartItemDTO item = cartService.addToCart(
                    userDetails.getUsername().hashCode(),
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
            List<CartItemDTO> items = cartService.getCartItems(
                    userDetails.getUsername().hashCode());
            Double total = cartService.getCartTotal(
                    userDetails.getUsername().hashCode());
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
            cartService.clearCart(userDetails.getUsername().hashCode());
            return ResponseEntity.ok(new SuccessResponse("Cart cleared"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    static class AddToCartRequest {
        private Long productId;
        private Integer quantity;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    static class UpdateCartRequest {
        private Integer quantity;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    static class CartResponse {
        private List<CartItemDTO> items;
        private Double total;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    static class ErrorResponse {
        private String error;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    static class SuccessResponse {
        private String message;
    }
}
