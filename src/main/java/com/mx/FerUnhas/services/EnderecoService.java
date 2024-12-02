package com.mx.FerUnhas.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mx.FerUnhas.entities.Endereco;
import com.mx.FerUnhas.entities.Usuario;
import com.mx.FerUnhas.repositiories.EnderecoRepository;

@Service
public class EnderecoService {
	
	@Autowired
    private final EnderecoRepository enderecoRepository;

    public EnderecoService(EnderecoRepository enderecoRepository) {
        this.enderecoRepository = enderecoRepository;
    }

    // Buscar por ID
    public Endereco getEnderecoById(Long id) {
        return enderecoRepository.findById(id).orElse(null); // Retorna null se não encontrar
    }

    // Buscar todos os Endereços
    public List<Endereco> getAllEnderecos() {
        return enderecoRepository.findAll();
    }
    
    public List<Endereco> getEnderecoByUsuario(Usuario usuario) {
		return enderecoRepository.findByUsuario(usuario); // Retorna um endereco por USUARIO
	}

    // Salvar Endereço
    @Transactional
    public Endereco saveEndereco(Endereco endereco) {
        // Validação simples antes de salvar
        if (endereco.getRua() == null || endereco.getRua().isEmpty()) {
            throw new IllegalArgumentException("O campo 'rua' não pode ser vazio.");
        }
        return enderecoRepository.save(endereco);
    }

    // Excluir Endereço
    public void deleteEndereco(Long id) {
        // Verificar se o endereço existe antes de excluir
        if (enderecoRepository.existsById(id)) {
            enderecoRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Endereço com o ID " + id + " não encontrado.");
        }
    }
}
