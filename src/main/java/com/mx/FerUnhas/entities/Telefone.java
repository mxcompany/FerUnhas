package com.mx.FerUnhas.entities;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name="telefone")
public class Telefone {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_telefone;

    @NotNull
    @NotBlank
    @Column(name = "numero")
    private String numero;

    @ManyToOne
    @JoinColumn(name = "USUARIO_id_usuario")
    private Usuario usuario;

    // Construtor sem parâmetros
    public Telefone() {}

    // Construtor com parâmetros (caso necessário)
    public Telefone(String numero) {
        this.numero = numero;
    }

    // Construtor para criar Telefone a partir do id_usuario (apenas o ID do usuario)
    @JsonCreator
    public Telefone(@JsonProperty("id_usuario") Long id_usuario) {
        this.usuario = new Usuario();
        this.usuario.setId_usuario(id_usuario);
    }

    // Getters e Setters
    public Long getId_telefone() {
        return id_telefone;
    }

    public void setId_telefone(Long id_telefone) {
        this.id_telefone = id_telefone;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}
