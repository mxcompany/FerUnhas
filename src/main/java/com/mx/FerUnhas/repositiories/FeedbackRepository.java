package com.mx.FerUnhas.repositiories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mx.FerUnhas.entities.Feedback;
import com.mx.FerUnhas.entities.Usuario;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
	List<Feedback> findByUsuario(Usuario usuario);  
}
