import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

   usuario: string = '';
  contrasena: string = '';
  loginFail: boolean = false; // Variable para manejar el error de login
  readonly CONTRASENA_DEFAULT: string = 'Dolzani123'; // Contraseña por defecto para el cliente

  constructor(private router: Router) {}

    onSubmit() {
    this.router.navigate(['/gestiones']);
  }

  // Método para abrir el modal de registro
  abrirRegistro() {
    
  }

  resetLoginFail(): void {
    
  }

}
