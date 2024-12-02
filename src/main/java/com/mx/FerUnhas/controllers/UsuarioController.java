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

import com.mx.FerUnhas.entities.LoginRequest;
import com.mx.FerUnhas.entities.LoginResponse;
import com.mx.FerUnhas.entities.ResponseMessage;
import com.mx.FerUnhas.entities.Usuario;
import com.mx.FerUnhas.services.UsuarioService;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

	private final UsuarioService usuarioService;

	public UsuarioController(UsuarioService usuarioService) {
		this.usuarioService = usuarioService;
	}
	
	// Criar novo usuário
	@PostMapping
	public ResponseEntity<Usuario> createUsuario(@RequestBody Usuario usuario) {
		// Certifique-se de que a senha está criptografada antes de salvar
		Usuario novoUsuario = usuarioService.saveUsuario(usuario);
		return ResponseEntity.ok(novoUsuario); // Retorna 200 OK com o novo usuário
	}

	// Buscar usuário por id
	@GetMapping("/{id}")
	public ResponseEntity<Usuario> getUsuario(@PathVariable("id") Long id) {
		Usuario usuario = usuarioService.getUsuarioById(id);
		if (usuario != null) {
			return ResponseEntity.ok(usuario);
		} else {
			return ResponseEntity.notFound().build(); // Retorna 404 se não encontrar
		}
	}

	// Buscar todos os usuários
	@GetMapping
	public ResponseEntity<List<Usuario>> getAllUsuarios() {
		List<Usuario> usuarios = usuarioService.getAllUsuarios();
		return ResponseEntity.ok(usuarios); // Retorna a lista de usuários
	}

	// Deletar usuário
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteUsuario(@PathVariable Long id) {
		if (usuarioService.getUsuarioById(id) != null) {
			usuarioService.deleteUsuario(id);
			return ResponseEntity.noContent().build(); // Retorna 204 sem conteúdo
		} else {
			return ResponseEntity.notFound().build(); // Retorna 404 se não encontrar
		}
	}

	// Buscar usuário por CPF
	@GetMapping("/cpf/{cpf}")
	public ResponseEntity<Usuario> getUsuarioByCpf(@PathVariable("cpf") String cpf) {
		Usuario usuario = usuarioService.getUsuarioByCpf(cpf); // Ajuste o método no serviço
		if (usuario != null) {
			return ResponseEntity.ok(usuario);
		} else {
			return ResponseEntity.notFound().build(); // Retorna 404 se não encontrar
		}
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
		String cpfOuEmail = loginRequest.getCpfOuEmail(); // Campo genérico que pode ser CPF ou email
		String senha = loginRequest.getSenha(); // Senha do usuário

		// Tenta autenticar o usuário com CPF ou Email
		Usuario usuario = null;

		// Verifica se o valor informado tem 11 caracteres numéricos (CPF)
		if (cpfOuEmail.length() == 11 && cpfOuEmail.matches("[0-9]+")) {
			// Tentativa de autenticação por CPF
			usuario = usuarioService.autenticarPorCpf(cpfOuEmail, senha);
		}
		// Verifica se o valor contém '@' e '.' para ser considerado um email
		else if (cpfOuEmail.contains("@") && cpfOuEmail.contains(".")) {
			// Tentativa de autenticação por Email
			usuario = usuarioService.autenticarPorEmail(cpfOuEmail, senha);
		}

		// Se o usuário for encontrado
		if (usuario != null) {
			// Obter as descrições formatadas de telefones e endereços
			//List<String> telefones = usuario.getTelefonesDescricao(); // Método que retorna a descrição dos telefones
			//List<String> enderecos = usuario.getEnderecosDescricao(); // Método que retorna a descrição dos endereços

			// Cria uma resposta com informações do usuário
			return ResponseEntity
					.ok(new LoginResponse(true, "Login bem-sucedido", usuario.getId_usuario(), usuario.getFname(),
							usuario.getLname(), usuario.getEmail(), usuario.getCpf(), usuario.getTipos()/*, telefones, // Lista
																														// de
																														// telefones
																														// formatados
							enderecos // Lista de endereços formatados*/
					));
		} else {
			// Retorna resposta em JSON com erro
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(new ResponseMessage(false, "Credenciais inválidas"));
		}
	}

}
