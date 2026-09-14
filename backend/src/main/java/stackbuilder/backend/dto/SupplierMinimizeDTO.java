package stackbuilder.backend.dto;

import stackbuilder.backend.entity.Product;

import java.util.List;

public class SupplierMinimizeDTO {

    private Long id;

    private String companyName;

    private String city;

    private String address;

    private String description;

    private List<Product> products;


    public SupplierMinimizeDTO ( Long id, String companyName,String city, String address, String description, List<Product> products) {
        this.id = id;
        this.companyName = companyName;
        this.city = city;
        this.address = address;
        this.description = description;
        this.products = products;
    }


//    ------- Getters && Setters -----------

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}
