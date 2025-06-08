package tmtalyp.backend.hero;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "heroes")
public class Hero {
    @Id
    private String id;
    private String header;
    private String description;
    private String backgroundImage;
    private String backgroundImageFileName;
    private String iconImage;
    private String iconImageFileName;
    private Integer order;
    private Boolean active;

    public Hero() {
    }

    public Hero(String header, String description, String backgroundImage, String iconImage, Integer order, Boolean active) {
        this.header = header;
        this.description = description;
        this.backgroundImage = backgroundImage;
        this.iconImage = iconImage;
        this.order = order;
        this.active = active;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getHeader() {
        return header;
    }

    public void setHeader(String header) {
        this.header = header;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBackgroundImage() {
        return backgroundImage;
    }

    public void setBackgroundImage(String backgroundImage) {
        this.backgroundImage = backgroundImage;
    }

    public String getBackgroundImageFileName() {
        return backgroundImageFileName;
    }

    public void setBackgroundImageFileName(String backgroundImageFileName) {
        this.backgroundImageFileName = backgroundImageFileName;
    }

    public String getIconImage() {
        return iconImage;
    }

    public void setIconImage(String iconImage) {
        this.iconImage = iconImage;
    }

    public String getIconImageFileName() {
        return iconImageFileName;
    }

    public void setIconImageFileName(String iconImageFileName) {
        this.iconImageFileName = iconImageFileName;
    }

    public Integer getOrder() {
        return order;
    }

    public void setOrder(Integer order) {
        this.order = order;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}