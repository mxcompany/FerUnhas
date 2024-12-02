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
@Table(name="endereco")
public class Endereco {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_endereco;

    @NotNull
    @NotBlank
    @Column(name = "rua")
    private String rua;

    @NotNull
    @NotBlank
    @Column(name = "numero")
    private String numero;

    @NotNull
    @NotBlank
    @Column(name = "bairro")
    private String bairro;

    @NotNull
    @NotBlank
    @Column(name = "cep")
    private String cep;

    @NotNull
    @NotBlank
    @Column(name = "cidade")
    private String cidade;

    // Relacionamento com a entidade Usuario
    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;
    
 // Construtor sem parâmetros
    public Endereco() {}

    // Construtor com parâmetros (caso necessário)
    public Endereco(String bairro, String cep, String cidade, String numero, String rua) {
        this.bairro = bairro;
        this.cep = cep;
        this.cidade = cidade;
        this.numero = numero;
        this.rua = rua;
    }

    // Construtor para criar Endereco a partir do id_usuario (apenas o ID do usuario)
    @JsonCreator
    public Endereco(@JsonProperty("id_usuario") Long id_usuario) {
        this.usuario = new Usuario();
        this.usuario.setId_usuario(id_usuario);
    }
   
    // Método para gerar a descrição formatada
    public String getDescricao() {
        return String.format("%s, Nº %s - %s, %s - CEP: %s", rua, numero, bairro, cidade, cep);
    }
    
    // Getters e Setters
    public Long getId_endereco() {
        return id_endereco;
    }

    public void setId_endereco(Long id_endereco) {
        this.id_endereco = id_endereco;
    }

    public String getRua() {
        return rua;
    }

    public void setRua(String rua) {
        this.rua = rua;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}
