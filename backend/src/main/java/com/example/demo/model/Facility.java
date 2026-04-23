package com.example.demo.model;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "facilities")
public class Facility {

    @Id
    private String id;

    @NotBlank(message = "Resource name is required")
    private String name;

    @NotBlank(message = "Type is required")
    @Pattern(
            regexp = "LAB|HALL|ROOM|PROJECTOR|CAMERA|MICROPHONE|LAPTOP",
            message = "Type must be LAB, HALL, ROOM, PROJECTOR, CAMERA, MICROPHONE, or LAPTOP"
    )
    private String type;

    @NotNull(message = "Capacity is required")
    @Min(value = 1, message = "Capacity must be greater than 0")
    private Integer capacity;

    @NotBlank(message = "Location is required")
    private String location;

    @NotBlank(message = "Status is required")
    @Pattern(
            regexp = "ACTIVE|OUT_OF_SERVICE",
            message = "Status must be ACTIVE or OUT_OF_SERVICE"
    )
    private String status;

    @NotBlank(message = "Available from time is required")
    private String availableFrom;

    @NotBlank(message = "Available to time is required")
    private String availableTo;

    @NotBlank(message = "Description is required")
    private String description;

    public Facility() {
    }

    public Facility(String name, String type, Integer capacity, String location,
                    String status, String availableFrom, String availableTo, String description) {
        this.name = name;
        this.type = type;
        this.capacity = capacity;
        this.location = location;
        this.status = status;
        this.availableFrom = availableFrom;
        this.availableTo = availableTo;
        this.description = description;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAvailableFrom() {
        return availableFrom;
    }

    public void setAvailableFrom(String availableFrom) {
        this.availableFrom = availableFrom;
    }

    public String getAvailableTo() {
        return availableTo;
    }

    public void setAvailableTo(String availableTo) {
        this.availableTo = availableTo;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}