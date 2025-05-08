	package com.mx.FerUnhas.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mx.FerUnhas.entities.Tiposuser;
import com.mx.FerUnhas.services.TiposuserService;

@RestController
@RequestMapping("/tiposuser")
public class TiposuserController {
	@Autowired
	private final TiposuserService tiposuserService;

	public TiposuserController(TiposuserService tiposuserService) {
		this.tiposuserService = tiposuserService;
	}
	
	 @PostMapping
	    public Tiposuser createTiposuser(@RequestBody Tiposuser tiposuser) {
		 return tiposuserService.saveTiposuser(tiposuser);
	    }
	

	@GetMapping("/{id}")
	public ResponseEntity<Tiposuser> getTiposuser(@PathVariable("id") Long id) {
		Tiposuser tiposuser = tiposuserService.getTiposuserById(id);
		if (tiposuser != null) {
			return ResponseEntity.ok(tiposuser);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping
	public List<Tiposuser> getAllTiposusers() {
		return tiposuserService.getAllTiposusers();
	}

	@DeleteMapping("/{id}")
	public void deleteTiposuser(@PathVariable Long id) {
		tiposuserService.deleteTiposuser(id);
	}

}
