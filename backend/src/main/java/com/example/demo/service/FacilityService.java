package com.example.demo.service;

import com.example.demo.model.Facility;
import com.example.demo.repository.FacilityRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FacilityService {

    private final FacilityRepository facilityRepository;

    public FacilityService(FacilityRepository facilityRepository) {
        this.facilityRepository = facilityRepository;
    }

    public Facility createFacility(Facility facility) {
        return facilityRepository.save(facility);
    }

    public List<Facility> getAllFacilities() {
        return facilityRepository.findAll();
    }

    public Optional<Facility> getFacilityById(String id) {
        return facilityRepository.findById(id);
    }

    public Facility updateFacility(String id, Facility updatedFacility) {
        return facilityRepository.findById(id).map(existingFacility -> {
            existingFacility.setName(updatedFacility.getName());
            existingFacility.setType(updatedFacility.getType());
            existingFacility.setCapacity(updatedFacility.getCapacity());
            existingFacility.setLocation(updatedFacility.getLocation());
            existingFacility.setStatus(updatedFacility.getStatus());
            existingFacility.setAvailableFrom(updatedFacility.getAvailableFrom());
            existingFacility.setAvailableTo(updatedFacility.getAvailableTo());
            existingFacility.setDescription(updatedFacility.getDescription());
            return facilityRepository.save(existingFacility);
        }).orElseThrow(() -> new RuntimeException("Facility not found with id: " + id));
    }

    public void deleteFacility(String id) {
        if (!facilityRepository.existsById(id)) {
            throw new RuntimeException("Facility not found with id: " + id);
        }
        facilityRepository.deleteById(id);
    }
}