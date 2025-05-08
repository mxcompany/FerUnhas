package com.mx.FerUnhas.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mx.FerUnhas.entities.Agendamento;
import com.mx.FerUnhas.entities.Usuario;
import com.mx.FerUnhas.repositiories.AgendamentoRepository;

@Service
public class AgendamentoService {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    // Método para salvar agendamento
    public Agendamento saveAgendamento(Agendamento agendamento) {
        return agendamentoRepository.save(agendamento);
    }

    // Método para buscar agendamento por ID
    public Agendamento getAgendamentoById(Long id) {
        return agendamentoRepository.findById(id).orElse(null);
    }

    // Método para buscar todos os agendamentos
    public List<Agendamento> getAllAgendamentos() {
        return agendamentoRepository.findAll();
    }

    // Método para deletar agendamento
    public void deleteAgendamento(Long id) {
        agendamentoRepository.deleteById(id);
    }
    
    public List<Agendamento> getAgendamentoByUsuario(Usuario usuario) {
		return agendamentoRepository.findByUsuario(usuario); // Retorna um agendamento por USUARIO
	}

   
}
