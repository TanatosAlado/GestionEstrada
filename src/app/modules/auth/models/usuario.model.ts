export class Usuario {
  id: string;           // ID generado por Firebase
  usuario: string;      // nombre de usuario o login
  contrasena: string;   // contraseña (idealmente se guardaría hasheada)
  administrador: boolean; // para saber si es admin o no
  jerarquia: string;    // categoría o rol para controlar permisos

  constructor(
    id: string,
    usuario: string,
    contrasena: string,
    administrador: boolean,
    jerarquia: string
  ) {
    this.id = id;
    this.usuario = usuario;
    this.contrasena = contrasena;
    this.administrador = administrador;
    this.jerarquia = jerarquia;
  }
}
