package com.mx.FerUnhas.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mx.FerUnhas.entities.Endereco;
import com.mx.FerUnhas.entities.Usuario;
import com.mx.FerUnhas.services.EnderecoService;

import java.util.List;

@RestController
@RequestMapping("/endereco")
public class EnderecoController {

    private final EnderecoService enderecoService;

    public EnderecoController(EnderecoService enderecoService) {
        this.enderecoService = enderecoService;
    }

    // Criar ou atualizar um Endereço
    @PostMapping
    public Endereco createEndereco(@RequestBody Endereco endereco) {
        return enderecoService.saveEndereco(endereco);
    }

    // Buscar Endereço por ID
    @GetMapping("/{id}")
    public ResponseEntity<Endereco> getEndereco(@PathVariable("id") Long id) {
        Endereco endereco = enderecoService.getEnderecoById(id);
        if (endereco != null) {
            return ResponseEntity.ok(endereco);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    
    @GetMapping("/usuario/{usuario}")
	public ResponseEntity<List<Endereco>> getEnderecoByUsuario(@PathVariable("usuario") Usuario usuario) {
		List<Endereco> endereco = enderecoService.getEnderecoByUsuario(usuario); // Ajuste o método no serviço
		if (endereco != null) {
			return ResponseEntity.ok(endereco);
		} else {
			return ResponseEntity.notFound().build(); // Retorna 404 se não encontrar
		}
	}

    // Buscar todos os Endereços
    @GetMapping
    public List<Endereco> getAllEnderecos() {
        return enderecoService.getAllEnderecos();
    }

    // Excluir Endereço
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEndereco(@PathVariable Long id) {
        try {
            enderecoService.deleteEndereco(id);
            return ResponseEntity.ok("Endereço excluído com sucesso.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
