package com.example.demo.controller;

import com.example.demo.model.Facility;
import com.example.demo.service.FacilityService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/facilities")
@CrossOrigin(origins = "http://localhost:5173")
public class FacilityController {

    private final FacilityService facilityService;

    public FacilityController(FacilityService facilityService) {
        this.facilityService = facilityService;
    }

    @PostMapping
    public ResponseEntity<Facility> createFacility(@Valid @RequestBody Facility facility) {
        Facility savedFacility = facilityService.createFacility(facility);
        return new ResponseEntity<>(savedFacility, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Facility>> getAllFacilities() {
        return ResponseEntity.ok(facilityService.getAllFacilities());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Facility> getFacilityById(@PathVariable String id) {
        return facilityService.getFacilityById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Facility> updateFacility(@PathVariable String id,
                                                   @Valid @RequestBody Facility facility) {
        Facility updatedFacility = facilityService.updateFacility(id, facility);
        return ResponseEntity.ok(updatedFacility);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFacility(@PathVariable String id) {
        facilityService.deleteFacility(id);
        return ResponseEntity.ok("Facility deleted successfully");
    }
}