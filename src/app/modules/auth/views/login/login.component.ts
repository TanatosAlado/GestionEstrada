import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UsuarioInterno } from 'src/app/modules/usuarios/models/usuarioInterno.model';
import { UsuarioActualService } from 'src/app/shared/services/usuario-actual.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: string = '';
  contrasena: string = '';
  loginFail: boolean = false;

  constructor(private router: Router, private authService: AuthService, private usuarioActualService: UsuarioActualService) { }

  async onSubmit() {
    if (this.usuario && this.contrasena) {
      const usuarioInterno = await this.authService.login(this.usuario, this.contrasena);
      if (usuarioInterno) {
        this.usuarioActualService.setUsuarioActual(usuarioInterno);
        this.router.navigate(['/gestiones']);
      } else {
        this.loginFail = true;
      }
    }
  }

  resetLoginFail(): void {
    this.loginFail = false;
  }
}
