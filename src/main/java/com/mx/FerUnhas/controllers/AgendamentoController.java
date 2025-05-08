package com.mx.FerUnhas.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mx.FerUnhas.entities.Agenda;
import com.mx.FerUnhas.entities.Agendamento;
import com.mx.FerUnhas.entities.Usuario;
import com.mx.FerUnhas.services.AgendaService;
import com.mx.FerUnhas.services.AgendamentoService;

@RestController
@RequestMapping("/agendamento")
public class AgendamentoController {

    @Autowired
    private AgendamentoService agendamentoService;

    @Autowired
    private AgendaService agendaService; // Usar o AgendaService para manipular Agenda
/*
    @PostMapping
    public Agendamento createAgendamento(@RequestBody Agendamento agendamento) {
        // Salva o agendamento
        Agendamento agendamentoSalvo = agendamentoService.saveAgendamento(agendamento);
        
        // Agora, temos que marcar a agenda como não disponível
        Agenda agenda = agendamento.getAgenda(); // Presumo que a agenda esteja associada ao agendamento

        if (agenda != null) {
            // Atualiza o campo "disponivel" para false
            agenda.setDisponivel(false);

            // Salva a agenda atualizada
            agendaService.saveAgenda(agenda);
        }

        return agendamentoSalvo;
    }
   */ 
    @PostMapping
    public Agendamento createAgendamento(@RequestBody Agendamento agendamento) {
        // Verificar se o id_usuario e id_servico estão presentes
        if (agendamento.getUsuario() == null || agendamento.getUsuario().getId_usuario() == null 
            || agendamento.getId_servico() == null) {
            throw new IllegalArgumentException("Usuário e Serviço são obrigatórios.");
        }

        // Salva o agendamento
        Agendamento agendamentoSalvo = agendamentoService.saveAgendamento(agendamento);
        
        // Agora, temos que marcar a agenda como não disponível
        Agenda agenda = agendamento.getAgenda(); // Presumo que a agenda esteja associada ao agendamento

        if (agenda != null) {
            // Aqui garantimos que a data e o horário não sejam alterados
            Agenda agendaAtualizada = agendaService.getAgendaById(agenda.getId_agenda());
            if (agendaAtualizada != null) {
                // Atualiza apenas o campo 'disponivel', mantendo 'data' e 'horario'
                agendaAtualizada.setDisponivel(false);

                // Salva a agenda atualizada
                agendaService.saveAgenda(agendaAtualizada);
            }
        }

        return agendamentoSalvo;
    }



    @GetMapping("/{id}")
    public ResponseEntity<Agendamento> getAgendamento(@PathVariable("id") Long id) {
        Agendamento agendamento = agendamentoService.getAgendamentoById(id);
        if (agendamento != null) {
            return ResponseEntity.ok(agendamento);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public List<Agendamento> getAllAgendamentos() {
        return agendamentoService.getAllAgendamentos();
    }

    @DeleteMapping("/{id}")
    public void deleteAgendamento(@PathVariable Long id) {
        agendamentoService.deleteAgendamento(id);
    }
    
    @GetMapping("/usuario/{usuario}")
   	public ResponseEntity<List<Agendamento>> getAgendamentoByUsuario(@PathVariable("usuario") Usuario usuario) {
   		List<Agendamento> agendamento = agendamentoService.getAgendamentoByUsuario(usuario); // Ajuste o método no serviço
   		if (agendamento != null) {
   			return ResponseEntity.ok(agendamento);
   		} else {
   			return ResponseEntity.notFound().build(); // Retorna 404 se não encontrar
   		}
   	}
}
