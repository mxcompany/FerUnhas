package com.mx.FerUnhas.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="tipos_user")
public class Tiposuser {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id_tipos;
	
	@Column(name = "nome")
	private String nome;

	public Long getId_tipos() {
		return id_tipos;
	}

	public void setId_tipos(Long id_tipos) {
		this.id_tipos = id_tipos;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
	
	
}
