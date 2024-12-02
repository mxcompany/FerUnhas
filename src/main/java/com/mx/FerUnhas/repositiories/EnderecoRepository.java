package com.mx.FerUnhas.repositiories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mx.FerUnhas.entities.Endereco;
import com.mx.FerUnhas.entities.Usuario;

public interface EnderecoRepository extends JpaRepository<Endereco, Long>{
	List<Endereco> findByUsuario(Usuario usuario);  
}
