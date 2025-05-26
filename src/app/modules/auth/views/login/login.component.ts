import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';
import { LoginRequest } from '../../models/loginRequest.model';


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

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
        if (this.usuario && this.contrasena) {
      const ingresante: LoginRequest = new LoginRequest(this.usuario, this.contrasena);
      this.authService.getUsuarioByLogin(ingresante).subscribe((usuario: Usuario | null) => {
        if (usuario) {
          this.router.navigate(['/gestiones']);
        } else {
          this.loginFail = true;
        }
      });
    }
}



  // Método para abrir el modal de registro
  abrirRegistro() {
    
  }

  resetLoginFail(): void {
    this.loginFail = false;
  }

}
