package stackbuilder.backend.dto;

import java.math.BigDecimal;

public class ProductOptimizeDTO {

    private Long id;
    private String name;
    private BigDecimal price;
    private String unit;
    private String imageUrl;

    public ProductOptimizeDTO() {}

    public ProductOptimizeDTO(Long id,String name, BigDecimal price, String unit, String imageUrl){
        this.id =id;
        this.name =name;
        this.price =price;
        this.unit =unit;
        this.imageUrl =imageUrl;
    }


//    ----- Getters && Setters ---------

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
