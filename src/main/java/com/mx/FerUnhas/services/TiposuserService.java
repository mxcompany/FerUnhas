package com.mx.FerUnhas.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.mx.FerUnhas.entities.Tiposuser;
import com.mx.FerUnhas.repositiories.TiposuserRepository;

@Service
public class TiposuserService {
	private final TiposuserRepository tiposuserRepository;
	
	public TiposuserService(TiposuserRepository tiposuserRepository) {
		this.tiposuserRepository = tiposuserRepository;
	}
	
	// preparando as buscas por id
		public Tiposuser getTiposuserById(Long id) {
			return tiposuserRepository.findById(id).orElse(null);
		}

		// preparando a busca geral
		public List<Tiposuser> getAllTiposusers() {
			return tiposuserRepository.findAll();
		}

		// salvando o Tiposuser
		public Tiposuser saveTiposuser(Tiposuser tiposuser) {
			return tiposuserRepository.save(tiposuser);
		}

		// excluindo o Tiposuser
		public void deleteTiposuser(Long id) {
			tiposuserRepository.deleteById(id);
		}
}
