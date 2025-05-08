package com.mx.FerUnhas.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mx.FerUnhas.entities.Feedback;
import com.mx.FerUnhas.entities.Usuario;
import com.mx.FerUnhas.services.FeedbackService;

@RestController
@RequestMapping("/feedback")
public class FeedbackController {

	private final FeedbackService feedbackService;
	
	public FeedbackController(FeedbackService feedbackService) {
		this.feedbackService = feedbackService;
	}
	
	// Criar ou atualizar um Feedback
		@PostMapping
		public ResponseEntity<Feedback> createFeedback(@RequestBody Feedback feedback) {
			Feedback feedbackSalvo = feedbackService.saveFeedback(feedback);
			return ResponseEntity.status(HttpStatus.CREATED).body(feedbackSalvo);
		}

		// Buscar Feedback por ID
		@GetMapping("/{id}")
		public ResponseEntity<Feedback> getFeedback(@PathVariable("id") Long id) {
			Feedback feedback = feedbackService.getFeedbackById(id);
			if (feedback != null) {
				return ResponseEntity.ok(feedback);
			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
			}
		}

		@GetMapping
		public ResponseEntity<List<Feedback>> getAllFeedbacks() {
			List<Feedback> feedbacks = feedbackService.getAllFeedbacks();
			return ResponseEntity.ok(feedbacks); // Retorna a lista de usuários
		}
		
		@GetMapping("/usuario/{usuario}")
		public ResponseEntity<List<Feedback>> getFeedbackByUsuario(@PathVariable("usuario") Usuario usuario) {
			List<Feedback> feedback = feedbackService.getFeedbackByUsuario(usuario); // Ajuste o método no serviço
			if (feedback != null) {
				return ResponseEntity.ok(feedback);
			} else {
				return ResponseEntity.notFound().build(); // Retorna 404 se não encontrar
			}
		}

		// Deletar usuário
		@DeleteMapping("/{id}")
		public ResponseEntity<Void> deleteFeedback(@PathVariable Long id) {
			if (feedbackService.getFeedbackById(id) != null) {
				feedbackService.deletarFeedback(id);
				return ResponseEntity.noContent().build(); // Retorna 204 sem conteúdo
			} else {
				return ResponseEntity.notFound().build(); // Retorna 404 se não encontrar
			}
		}
}
