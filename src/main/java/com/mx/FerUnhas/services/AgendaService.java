package com.mx.FerUnhas.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mx.FerUnhas.entities.Agenda;
import com.mx.FerUnhas.repositiories.AgendaRepository;

@Service
public class AgendaService {

	@Autowired
    private AgendaRepository agendaRepository;
	
	public AgendaService(AgendaRepository agendaRepository) {
		this.agendaRepository = agendaRepository;
	}

    // Método para salvar agenda
    public Agenda saveAgenda(Agenda agenda) {
        return agendaRepository.save(agenda);
    }

    // Método para buscar agenda por ID
    public Agenda getAgendaById(Long id) {
        return agendaRepository.findById(id).orElse(null);
    }

    // Método para buscar todos os agendas
    public List<Agenda> getAllAgendas() {
        return agendaRepository.findAll();
    }

    // Método para deletar agenda
    public void deleteAgenda(Long id) {
        agendaRepository.deleteById(id);
    }
}
