package com.example.demo.dto;

import com.example.demo.constant.PaymentStatus;
import com.example.demo.entity.Member;
import com.example.demo.entity.Product;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class PaymentDTO {
    private Long paymentId;
    private Long memberId;
    private Product product;
    private Member member;
    private int price;
    private int quantity;
    private String tid;
    private int tax_free_amount;
    private LocalDateTime create_date;
    private PaymentStatus paymentStatus;
    private LocalDateTime cancel_date;
}
