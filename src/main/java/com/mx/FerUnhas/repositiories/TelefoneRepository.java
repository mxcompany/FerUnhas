package com.mx.FerUnhas.repositiories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mx.FerUnhas.entities.Telefone;
import com.mx.FerUnhas.entities.Usuario;

public interface TelefoneRepository extends JpaRepository<Telefone, Long> {
	List<Telefone> findByUsuario(Usuario usuario);  
}

