package com.mx.FerUnhas.repositiories;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mx.FerUnhas.entities.Agenda;


public interface AgendaRepository extends JpaRepository<Agenda, Long> {
    @Query("SELECT a FROM Agenda a WHERE a.data = :data AND a.horario = :horario")
    List<Agenda> findAllByDataAndHorario(@Param("data") LocalDate data, @Param("horario") LocalTime horario);
}

