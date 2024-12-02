package com.mx.FerUnhas.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mx.FerUnhas.entities.Servico;
import com.mx.FerUnhas.services.ServicoService;

@RestController
@RequestMapping("/servico")
public class ServicoController {
	@Autowired
	private final ServicoService servicoService;

	public ServicoController(ServicoService servicoService) {
		this.servicoService = servicoService;
	}
	
	 @PostMapping
	    public Servico createServico(@RequestBody Servico servico) {
		 return servicoService.saveServico(servico);
	    }
	

	@GetMapping("/{id}")
	public ResponseEntity<Servico> getServico(@PathVariable("id") Long id) {
		Servico servico = servicoService.getServicoById(id);
		if (servico != null) {
			return ResponseEntity.ok(servico);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping
	public List<Servico> getAllServicos() {
		return servicoService.getAllServicos();
	}

	@DeleteMapping("/{id}")
	public void deleteServico(@PathVariable Long id) {
		servicoService.deleteServico(id);
	}
	
	@PutMapping("/{id}")
    public ResponseEntity<Servico> atualizarServico(@PathVariable("id") Long id, @RequestBody Servico servicoAtualizado) {
        // Verifica se o serviço existe
        Optional<Servico> servicoExistente = servicoService.findById(id);
        if (!servicoExistente.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Retorna 404 se não encontrar o serviço
        }

        // Atualiza os dados do serviço
        Servico servico = servicoExistente.get();
        servico.setTipo(servicoAtualizado.getTipo());
        servico.setValor(servicoAtualizado.getValor());

        // Salva o serviço atualizado
        Servico servicoSalvo = servicoService.saveServico(servico);

        // Retorna o serviço atualizado com status 200
        return ResponseEntity.ok(servicoSalvo);
    }

}
