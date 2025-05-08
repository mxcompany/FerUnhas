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

import com.mx.FerUnhas.entities.Telefone;
import com.mx.FerUnhas.entities.Usuario;
import com.mx.FerUnhas.services.TelefoneService;

@RestController
@RequestMapping("/telefone")
public class TelefoneController {

	private final TelefoneService telefoneService;

	public TelefoneController(TelefoneService telefoneService) {
		this.telefoneService = telefoneService;
	}

	// Criar ou atualizar um Telefone
	@PostMapping
	public ResponseEntity<Telefone> createTelefone(@RequestBody Telefone telefone) {
		Telefone telefoneSalvo = telefoneService.saveTelefone(telefone);
		return ResponseEntity.status(HttpStatus.CREATED).body(telefoneSalvo);
	}

	// Buscar Telefone por ID
	@GetMapping("/{id}")
	public ResponseEntity<Telefone> getTelefone(@PathVariable("id") Long id) {
		Telefone telefone = telefoneService.getTelefoneById(id);
		if (telefone != null) {
			return ResponseEntity.ok(telefone);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}

	@GetMapping
	public ResponseEntity<List<Telefone>> getAllTelefones() {
		List<Telefone> telefones = telefoneService.getAllTelefones();
		return ResponseEntity.ok(telefones); // Retorna a lista de usuários
	}
	
	@GetMapping("/usuario/{usuario}")
	public ResponseEntity<List<Telefone>> getTelefoneByUsuario(@PathVariable("usuario") Usuario usuario) {
		List<Telefone> telefone = telefoneService.getTelefoneByUsuario(usuario); // Ajuste o método no serviço
		if (telefone != null) {
			return ResponseEntity.ok(telefone);
		} else {
			return ResponseEntity.notFound().build(); // Retorna 404 se não encontrar
		}
	}

	// Deletar usuário
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteTelefone(@PathVariable Long id) {
		if (telefoneService.getTelefoneById(id) != null) {
			telefoneService.deletarTelefone(id);
			return ResponseEntity.noContent().build(); // Retorna 204 sem conteúdo
		} else {
			return ResponseEntity.notFound().build(); // Retorna 404 se não encontrar
		}
	}

}
