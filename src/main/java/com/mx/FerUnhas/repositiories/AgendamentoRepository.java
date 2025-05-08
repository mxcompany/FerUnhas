package com.mx.FerUnhas.repositiories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mx.FerUnhas.entities.Agendamento;
import com.mx.FerUnhas.entities.Usuario;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
	List<Agendamento> findByUsuario(Usuario usuario);  
}
