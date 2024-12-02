package com.mx.FerUnhas.controllers;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mx.FerUnhas.entities.Agenda;
import com.mx.FerUnhas.repositiories.AgendaRepository;
import com.mx.FerUnhas.services.AgendaService;

@RestController
@RequestMapping("/agenda")
public class AgendaController {

	@Autowired
	private final AgendaService agendaService;
	
	@Autowired
    private AgendaRepository agendaRepository;

	public AgendaController(AgendaService agendaService) {
		this.agendaService = agendaService;
	}

	@PostMapping
    public ResponseEntity<Agenda> createAgenda(@RequestBody Agenda agenda) {
        if (agenda.getData() == null) {
            return ResponseEntity.badRequest().body(null);  // Se 'data' estiver nula, retorna erro 400
        }
        Agenda createdAgenda = agendaService.saveAgenda(agenda);
        return ResponseEntity.status(201).body(createdAgenda);  // Retorna status 201 para criação
    }

	@GetMapping("/{id}")
	public ResponseEntity<Agenda> getAgendaById(@PathVariable("id") Long id) {
		Agenda agenda = agendaService.getAgendaById(id);
		if (agenda != null) {
			return ResponseEntity.ok(agenda);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@GetMapping("/disponibilidade")
	public ResponseEntity<?> buscarAgendaPorDataEHorario(
	        @RequestParam String id_data,
	        @RequestParam LocalTime horario) {

	    // Converte a string da data para LocalDate
	    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	    LocalDate data = LocalDate.parse(id_data, formatter);

	    List<Agenda> agendas = agendaRepository.findAllByDataAndHorario(data, horario);

	    // Retorna o primeiro item da lista se existir
	    if (!agendas.isEmpty()) {
	        return ResponseEntity.ok(agendas.get(0));  // Retorna o primeiro agendamento que corresponde aos parâmetros
	    }

	    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Agenda não encontrada");
	}


	@PutMapping("/{id}")
	public Agenda atualizarAgenda(@PathVariable("id") Long id, @RequestBody Agenda agendaAtualizada) {
		Agenda agenda = agendaService.getAgendaById(id);
		agenda.setDisponivel(false); // Alterando o status para 'agendado'
		return agendaService.saveAgenda(agenda);
	}

	@GetMapping
	public List<Agenda> getAllAgendas() {
		return agendaService.getAllAgendas();
	}

	@DeleteMapping("/{id}")
	public void deleteAgenda(@PathVariable Long id) {
		agendaService.deleteAgenda(id);
	}

}
