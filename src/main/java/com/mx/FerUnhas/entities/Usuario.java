package com.mx.FerUnhas.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

@Entity
@Table(name="usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_usuario;

    @NotNull
    @NotBlank
    @Column(name = "fname")
    private String fname;

    @NotNull
    @NotBlank
    @Column(name = "lname")
    private String lname;

    @NotNull
    @NotBlank
    @Email(message = "Informe o e-mail corretamente")
    @Column(name = "email", unique = true) // E-mail deve ser único
    private String email;

    @NotNull
    @NotBlank
    @Column(name = "senha")
    private String senha;

    @NotNull
    @NotBlank
    @Column(name = "cpf", unique = true) // CPF deve ser único no banco
    @Pattern(regexp = "\\d{11}", message = "CPF deve conter exatamente 11 dígitos numéricos")
    private String cpf;

    @ManyToOne
    @JoinColumn(name = "id_tipos")
    private Tiposuser tipos;

 //   @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
 //   private List<Endereco> enderecos = new ArrayList<>();;

 //   @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
 //   private List<Telefone> telefones = new ArrayList<>();;

    // Método para gerar a descrição formatada do nome
    public String getNomeCompleto() {
        return fname + " " + lname;
    }

/*    // Método para obter os endereços formatados
    public List<String> getEnderecosDescricao() {
        List<String> descricaoEnderecos = new ArrayList<>();
        for (Endereco endereco : enderecos) {
            descricaoEnderecos.add(endereco.getDescricao());
        }
        return descricaoEnderecos.isEmpty() ? List.of("Não cadastrado") : descricaoEnderecos;
    }

    // Método para obter os telefones formatados
    public List<String> getTelefonesDescricao() {
        List<String> descricaoTelefones = new ArrayList<>();
        for (Telefone telefone : telefones) {
            descricaoTelefones.add(telefone.getNumero());
        }
        return descricaoTelefones.isEmpty() ? List.of("Não cadastrado") : descricaoTelefones;
    }
    */
    public Long getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(Long id_usuario) {
        this.id_usuario = id_usuario;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public Tiposuser getTipos() {
        return tipos;
    }

    public void setTipos(Tiposuser tipos) {
        this.tipos = tipos;
    }

/*	public List<Endereco> getEnderecos() {
		return enderecos;
	}

	public void setEnderecos(List<Endereco> enderecos) {
		this.enderecos = enderecos;
	}

	public List<Telefone> getTelefones() {
		return telefones;
	}

	public void setTelefones(List<Telefone> telefones) {
		this.telefones = telefones;
	}
  */  
    
}
