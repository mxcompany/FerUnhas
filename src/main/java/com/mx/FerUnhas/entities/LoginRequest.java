package com.mx.FerUnhas.entities;

public class LoginRequest {
    private String cpfOuEmail;  // Campo genérico para CPF ou email
    private String senha;       // Senha

    // Getters e setters
    public String getCpfOuEmail() {
        return cpfOuEmail;
    }

    public void setCpfOuEmail(String cpfOuEmail) {
        this.cpfOuEmail = cpfOuEmail;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
}
