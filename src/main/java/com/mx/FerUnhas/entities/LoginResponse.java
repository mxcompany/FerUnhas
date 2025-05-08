package com.mx.FerUnhas.entities;

public class LoginResponse {
    private boolean success;
    private String message;
    private Long id;
    private String fname;
    private String lname;
    private String email;
    private String cpf;
    private Tiposuser tipos;
    //private List<String> telefones;  // Lista de telefones formatados
    //private List<String> enderecos; // Lista de endereços formatados (alterado para List<String>)

    // Construtores, Getters e Setters
    public LoginResponse(boolean success, String message, Long id, String fname, String lname, String email, String cpf, Tiposuser tipos) {
        this.success = success;
        this.message = message;
        this.id = id;
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.cpf = cpf;
        this.tipos = tipos;
        //this.telefones = telefones;
        //this.enderecos = enderecos;
    }

    // Getters e Setters
    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    /*public List<String> getTelefones() {
        return telefones;
    }

    public void setTelefones(List<String> telefones) {
        this.telefones = telefones;
    }

    public List<String> getEnderecos() {
        return enderecos;
    }

    public void setEnderecos(List<String> enderecos) {
        this.enderecos = enderecos;
    }*/
}
