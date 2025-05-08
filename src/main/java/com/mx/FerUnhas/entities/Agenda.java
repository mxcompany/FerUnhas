package com.mx.FerUnhas.entities;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;

@Entity
public class Agenda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_agenda;

    @NotNull
    private LocalDate data;  // Usando LocalDate no lugar de java.sql.Date

    @NotNull
    private LocalTime horario;

    @NotNull
    private boolean disponivel;

    public Agenda() {
    }

    public Agenda(Long id_agenda, @NotNull LocalDate data, @NotNull LocalTime horario, @NotNull boolean disponivel) {
        this.id_agenda = id_agenda;
        this.data = data;
        this.horario = horario;
        this.disponivel = disponivel;
    }

    public Long getId_agenda() {
        return id_agenda;
    }

    public void setId_agenda(Long id_agenda) {
        this.id_agenda = id_agenda;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public LocalTime getHorario() {
        return horario;
    }

    public void setHorario(LocalTime horario) {
        this.horario = horario;
    }

    public boolean isDisponivel() {
        return disponivel;
    }

    public void setDisponivel(boolean disponivel) {
        this.disponivel = disponivel;
    }

}
