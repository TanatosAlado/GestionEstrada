// src/app/services/usuario-actual.service.ts
import { Injectable } from '@angular/core';
import { UsuarioInterno } from 'src/app/modules/usuarios/models/usuarioInterno.model'; 

@Injectable({
  providedIn: 'root'
})
export class UsuarioActualService {
  private usuarioActual: UsuarioInterno | null = null;
  private readonly STORAGE_KEY = 'usuarioActual';

  constructor() {
    const usuarioGuardado = localStorage.getItem(this.STORAGE_KEY);
    if (usuarioGuardado) {
      this.usuarioActual = JSON.parse(usuarioGuardado);
    }
  }

  setUsuarioActual(usuario: UsuarioInterno): void {
    this.usuarioActual = usuario;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(usuario));
  }

  getUsuarioActual(): UsuarioInterno | null {
    return this.usuarioActual;
  }

  estaLogueado(): boolean {
    return !!this.usuarioActual;
  }

  logout(): void {
    this.usuarioActual = null;
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
