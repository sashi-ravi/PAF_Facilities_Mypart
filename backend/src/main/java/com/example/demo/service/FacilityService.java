package com.example.demo.service;

import com.example.demo.model.Facility;
import com.example.demo.repository.FacilityRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FacilityService {

    private final FacilityRepository facilityRepository;

    public FacilityService(FacilityRepository facilityRepository) {
        this.facilityRepository = facilityRepository;
    }

    public Facility createFacility(Facility facility) {
        normalizeFacility(facility);
        return facilityRepository.save(facility);
    }

    public List<Facility> getAllFacilities() {
        return facilityRepository.findAll();
    }

    public Optional<Facility> getFacilityById(String id) {
        return facilityRepository.findById(id);
    }

    public Facility updateFacility(String id, Facility updatedFacility) {
        normalizeFacility(updatedFacility);

        Facility existing = facilityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Facility not found with id: " + id));

        existing.setCode(updatedFacility.getCode());
        existing.setName(updatedFacility.getName());
        existing.setType(updatedFacility.getType());
        existing.setCapacity(updatedFacility.getCapacity());
        existing.setLocation(updatedFacility.getLocation());
        existing.setStatus(updatedFacility.getStatus());
        existing.setAvailableFrom(updatedFacility.getAvailableFrom());
        existing.setAvailableTo(updatedFacility.getAvailableTo());
        existing.setCategory(updatedFacility.getCategory());
        existing.setDescription(updatedFacility.getDescription());

        return facilityRepository.save(existing);
    }

    public void deleteFacility(String id) {
        facilityRepository.deleteById(id);
    }

    public List<Facility> searchFacilities(
            String search,
            String type,
            String status,
            String location,
            Integer minCapacity,
            String sort
    ) {
        List<Facility> facilities = facilityRepository.findAll();

        List<Facility> filtered = facilities.stream()
                .filter(f -> search == null || search.isBlank() ||
                        f.getName().toLowerCase(Locale.ROOT).contains(search.toLowerCase(Locale.ROOT)) ||
                        f.getCode().toLowerCase(Locale.ROOT).contains(search.toLowerCase(Locale.ROOT)))
                .filter(f -> type == null || type.isBlank() || f.getType().equalsIgnoreCase(type))
                .filter(f -> status == null || status.isBlank() || f.getStatus().equalsIgnoreCase(status))
                .filter(f -> location == null || location.isBlank() ||
                        f.getLocation().toLowerCase(Locale.ROOT).contains(location.toLowerCase(Locale.ROOT)))
                .filter(f -> minCapacity == null || f.getCapacity() >= minCapacity)
                .collect(Collectors.toList());

        if (sort != null && !sort.isBlank()) {
            switch (sort) {
                case "nameAsc" -> filtered.sort(Comparator.comparing(Facility::getName, String.CASE_INSENSITIVE_ORDER));
                case "nameDesc" -> filtered.sort(Comparator.comparing(Facility::getName, String.CASE_INSENSITIVE_ORDER).reversed());
                case "capacityAsc" -> filtered.sort(Comparator.comparingInt(Facility::getCapacity));
                case "capacityDesc" -> filtered.sort(Comparator.comparingInt(Facility::getCapacity).reversed());
                case "typeAsc" -> filtered.sort(Comparator.comparing(Facility::getType, String.CASE_INSENSITIVE_ORDER));
            }
        }

        return filtered;
    }

    private void normalizeFacility(Facility facility) {
        if (facility.getType() != null) {
            facility.setType(facility.getType().toUpperCase(Locale.ROOT));
        }
        if (facility.getStatus() != null) {
            facility.setStatus(facility.getStatus().toUpperCase(Locale.ROOT));
        }
    }
}