package com.example.kamatiymm.users;

public class Users {
   private String county, email, password, phone, username;
   public Users(){}

    public Users(String county, String email, String password, String phone, String username) {
        this.county = county;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.username = username;
    }

    public String getCounty() {
        return county;
    }

    public void setCounty(String county) {
        this.county = county;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
