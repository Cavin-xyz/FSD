package com.task10.controller;

import com.task10.entity.Student;
import com.task10.exception.ResourceNotFoundException;
import com.task10.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for managing Student resources.
 * Exposes Create, Read, Update, and Delete endpoints.
 */
@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentRepository studentRepository;

    @Autowired
    public StudentController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
        
        // Seed some initial data for testing right away
        studentRepository.save(new Student("Jane", "Doe", "jane.doe@example.com", "Computer Science"));
        studentRepository.save(new Student("John", "Smith", "john.s@example.com", "Mathematics"));
    }

    // 1. CREATE: Add a new student
    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        Student savedStudent = studentRepository.save(student);
        return new ResponseEntity<>(savedStudent, HttpStatus.CREATED);
    }

    // 2. READ: Get all students
    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // 3. READ: Get student by ID
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable("id") long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not exist with id: " + id));
        return ResponseEntity.ok(student);
    }

    // 4. UPDATE: Update an existing student
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable("id") long id, @RequestBody Student studentDetails) {
        Student updateStudent = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not exist with id: " + id));

        updateStudent.setFirstName(studentDetails.getFirstName());
        updateStudent.setLastName(studentDetails.getLastName());
        updateStudent.setEmail(studentDetails.getEmail());
        updateStudent.setCourse(studentDetails.getCourse());

        studentRepository.save(updateStudent);

        return ResponseEntity.ok(updateStudent);
    }

    // 5. DELETE: Delete a student
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteStudent(@PathVariable("id") long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not exist with id: " + id));

        studentRepository.delete(student);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
