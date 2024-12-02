package com.mx.FerUnhas.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mx.FerUnhas.entities.Telefone;
import com.mx.FerUnhas.entities.Usuario;
import com.mx.FerUnhas.repositiories.TelefoneRepository;

@Service
public class TelefoneService {

	@Autowired
	private final TelefoneRepository telefoneRepository;

	public TelefoneService(TelefoneRepository telefoneRepository) {
		this.telefoneRepository = telefoneRepository;
	}

	// Método para buscar todos os usuários
	public List<Telefone> getAllTelefones() {
		return telefoneRepository.findAll(); // Retorna todos os usuários do banco de dados
	}

	// Método para buscar um usuário pelo id
	public Telefone getUsuarioById(Long id) {
		return telefoneRepository.findById(id).orElse(null); // Retorna null se não encontrar
	}

	// Método para salvar um novo usuário
	public Telefone saveUsuario(Telefone telefone) {
		return telefoneRepository.save(telefone); // Salva o usuário no banco
	}

	public void deletarTelefone(Long id) {
		telefoneRepository.deleteById(id); // Exclui o telefone pelo ID
	}

	public List<Telefone> getTelefoneByUsuario(Usuario usuario) {
		return telefoneRepository.findByUsuario(usuario); // Retorna um telefone por USUARIO
	}

	@Transactional
	public Telefone saveTelefone(Telefone telefone) {
		if (telefone.getNumero() == null || telefone.getNumero().isEmpty()) {
			throw new IllegalArgumentException("O campo 'numero' não pode ser vazio.");
		}
		return telefoneRepository.save(telefone);
	}

	public Telefone getTelefoneById(Long id) {
		return telefoneRepository.findById(id).orElse(null);
	}

}
