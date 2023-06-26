package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter @Setter
public class MemberDTO {
    private String email;
    private String userName;
    private String nickName;
    private String img;
    private int badges;
    private BigDecimal totalPrice;
    private String isDelete; // N: 사용유저, Y: 탈퇴유저
}