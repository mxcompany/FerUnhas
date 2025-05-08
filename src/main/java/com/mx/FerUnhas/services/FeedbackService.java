package com.mx.FerUnhas.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mx.FerUnhas.entities.Feedback;
import com.mx.FerUnhas.entities.Usuario;
import com.mx.FerUnhas.repositiories.FeedbackRepository;

@Service
public class FeedbackService {
	
	@Autowired
	private final FeedbackRepository feedbackRepository;
	
	public FeedbackService(FeedbackRepository feedbackRepository) {
		this.feedbackRepository = feedbackRepository;
	}

	public List<Feedback> getAllFeedbacks(){
		return feedbackRepository.findAll();
	}
	
	// Método para buscar um usuário pelo id
		public Feedback getUsuarioById(Long id) {
			return feedbackRepository.findById(id).orElse(null); // Retorna null se não encontrar
		}

		// Método para salvar um novo usuário
		public Feedback saveUsuario(Feedback feedback) {
			return feedbackRepository.save(feedback); // Salva o usuário no banco
		}

		public void deletarFeedback(Long id) {
			feedbackRepository.deleteById(id); // Exclui o feedback pelo ID
		}

		public List<Feedback> getFeedbackByUsuario(Usuario usuario) {
			return feedbackRepository.findByUsuario(usuario); // Retorna um feedback por USUARIO
		}

		@Transactional
		public Feedback saveFeedback(Feedback feedback) {
			if (feedback.getDescricao() == null || feedback.getDescricao().isEmpty()) {
				throw new IllegalArgumentException("O campo 'numero' não pode ser vazio.");
			}
			return feedbackRepository.save(feedback);
		}

		public Feedback getFeedbackById(Long id) {
			return feedbackRepository.findById(id).orElse(null);
		}
}
