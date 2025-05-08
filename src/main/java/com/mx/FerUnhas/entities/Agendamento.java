package com.mx.FerUnhas.entities;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@Entity
@Table(name="agendamento")
public class Agendamento {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id_agendamento;
	
	@OneToOne
	@JoinColumn(name = "id_agenda")
	private Agenda agenda;
	
	@ManyToOne
	@JoinColumn(name = "USUARIO_id_usuario")
	private Usuario usuario;
	
	@ManyToOne
	@JoinColumn(name = "SERVICO_id_servico")
	private Servico id_servico;
	
	@ManyToOne
    @JoinColumn(name = "id_endereco")
    private Endereco endereco;
	
	public Agendamento() {}
	
	@JsonCreator
	public Agendamento(@JsonProperty("id_usuario") Long id_usuario) {
		this.usuario = new Usuario();
		this.usuario.setId_usuario(id_usuario);
	}

	public Long getId_agendamento() {
		return id_agendamento;
	}

	public void setId_agendamento(Long id_agendamento) {
		this.id_agendamento = id_agendamento;
	}

	public Agenda getAgenda() {
		return agenda;
	}

	public void setAgenda(Agenda agenda) {
		this.agenda = agenda;
	}

	public Servico getId_servico() {
		return id_servico;
	}

	public void setId_servico(Servico id_servico) {
		this.id_servico = id_servico;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public Endereco getEndereco() {
		return endereco;
	}

	public void setEndereco(Endereco endereco) {
		this.endereco = endereco;
	}
	
	
	
}
