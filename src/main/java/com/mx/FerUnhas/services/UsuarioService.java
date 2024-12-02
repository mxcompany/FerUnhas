package com.mx.FerUnhas.services;

import org.springframework.stereotype.Service;

import com.mx.FerUnhas.entities.Usuario;
import com.mx.FerUnhas.repositiories.UsuarioRepository;

import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    // Método para buscar todos os usuários
    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll(); // Retorna todos os usuários do banco de dados
    }

    // Método para buscar um usuário pelo id
    public Usuario getUsuarioById(Long id) {
        return usuarioRepository.findById(id).orElse(null); // Retorna null se não encontrar
    }

    // Método para salvar um novo usuário
    public Usuario saveUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario); // Salva o usuário no banco
    }

    // Método para excluir um usuário
    public void deleteUsuario(Long id) {
        usuarioRepository.deleteById(id); // Deleta o usuário pelo id
    }

    // Método para buscar um usuário pelo CPF
    public Usuario getUsuarioByCpf(String cpf) {
        return usuarioRepository.findByCpf(cpf); // Retorna um usuário pelo CPF
    }
    
 // Método para autenticar o usuário
    public Usuario autenticarUsuario(String cpf, String senha) {
        Usuario usuario = usuarioRepository.findByCpf(cpf);  // Ou findByEmail
        if (usuario != null && usuario.getSenha().equals(senha)) {
            return usuario;  // Retorna o usuário se as credenciais estiverem corretas
        }
        return null;  // Retorna null se as credenciais estiverem erradas
    }
    
 // Autentica o usuário pelo CPF
    public Usuario autenticarPorCpf(String cpf, String senha) {
        Usuario usuario = usuarioRepository.findByCpf(cpf);  // Método que busca o usuário pelo CPF

        // Verifica se o usuário foi encontrado e a senha está correta
        if (usuario != null && usuario.getSenha().equals(senha)) {
            return usuario;
        }
        return null;  // Retorna null se a autenticação falhar
    }

    // Autentica o usuário pelo Email
    public Usuario autenticarPorEmail(String email, String senha) {
        Usuario usuario = usuarioRepository.findByEmail(email);  // Método que busca o usuário pelo email

        // Verifica se o usuário foi encontrado e a senha está correta
        if (usuario != null && usuario.getSenha().equals(senha)) {
            return usuario;
        }
        return null;  // Retorna null se a autenticação falhar
    }
}
