import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, collection, doc, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { UsuarioInterno } from '../../models/usuarioInterno.model'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alta-usuarios',
  templateUrl: './alta-usuarios.component.html',
  styleUrls: ['./alta-usuarios.component.css']
})
export class AltaUsuariosComponent {
  altaForm: FormGroup;
  modulosDisponibles = ['clientes', 'remitos', 'abonos', 'facturas', 'usuarios'];
  creando = false;

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private firestore: Firestore,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AltaUsuariosComponent>
  ) {
this.altaForm = this.fb.group({
  username: ['', [Validators.required, Validators.minLength(3)]], // nuevo campo
  usuario: ['', [Validators.required, Validators.email]],
  clave: ['', [Validators.required, Validators.minLength(6)]],
  accesos: [[], Validators.required]
});

  }

  async usernameExiste(username: string): Promise<boolean> {
  const usuariosRef = collection(this.firestore, 'Usuarios');
  const q = query(usuariosRef, where('username', '==', username));
  const snapshot = await getDocs(q);
  return !snapshot.empty;
}

async crearUsuario() {
  if (this.altaForm.invalid) return;

  this.creando = true;

  const { username, usuario, clave, accesos } = this.altaForm.value;

  try {
    if (await this.usernameExiste(username)) {
      this.snackBar.open('El nombre de usuario ya existe, elija otro.', 'Cerrar', { duration: 3000 });
      this.creando = false;
      return;
    }

    // Crear usuario en Firebase Auth
    const credenciales = await createUserWithEmailAndPassword(this.auth, usuario, clave);
    const id = credenciales.user.uid;

    const nuevoUsuario: UsuarioInterno = {
      id,
      username,       // guardamos el username
      usuario,
      clave,
      accesos
    };

    await setDoc(doc(this.firestore, 'Usuarios', id), nuevoUsuario);

    this.snackBar.open('Usuario creado correctamente', 'Cerrar', { duration: 3000 });
    this.altaForm.reset();
  } catch (error) {
    console.error('Error al crear usuario:', error);
    this.snackBar.open('Error al crear usuario', 'Cerrar', { duration: 3000 });
  } finally {
    this.creando = false;
  }
}

cerrar(): void {
  this.dialogRef.close();
}

}