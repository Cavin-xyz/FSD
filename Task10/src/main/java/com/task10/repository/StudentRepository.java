package com.task10.repository;

import com.task10.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA Repository for the Student entity.
 * JpaRepository provides out-of-the-box CRUD operations (save, findById, delete, etc.)
 */
@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    // Custom query methods can be defined here if needed, e.g.:
    // List<Student> findByCourse(String course);
}
