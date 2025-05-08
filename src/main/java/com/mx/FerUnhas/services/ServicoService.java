package com.mx.FerUnhas.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.mx.FerUnhas.entities.Servico;
import com.mx.FerUnhas.repositiories.ServicoRepository;

@Service
public class ServicoService {
private final ServicoRepository servicoRepository;
	
	public ServicoService(ServicoRepository servicoRepository) {
		this.servicoRepository = servicoRepository;
	}
	
	// preparando as buscas por id
		public Servico getServicoById(Long id) {
			return servicoRepository.findById(id).orElse(null);
		}
		
		public Optional<Servico> findById(Long id) {
	        return servicoRepository.findById(id);
	    }

		// preparando a busca geral
		public List<Servico> getAllServicos() {
			return servicoRepository.findAll();
		}

		// salvando o Servico
		public Servico saveServico(Servico servico) {
			return servicoRepository.save(servico);
		}

		// excluindo o Servico
		public void deleteServico(Long id) {
			servicoRepository.deleteById(id);
		}

}
