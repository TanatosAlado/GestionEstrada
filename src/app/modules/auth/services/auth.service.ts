import { inject, Injectable } from '@angular/core';
import { LoginRequest } from '../models/loginRequest.model';
import { from, map, Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Firestore, collection, query, where, getDocs, addDoc, doc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private firestore = inject(Firestore);

  constructor() { }

  getUsuarioByLogin(ingresante: LoginRequest): Observable<Usuario | null> {
  const usuariosRef = collection(this.firestore, 'Usuarios');
  const q = query(
    usuariosRef, 
    where('usuario', '==', ingresante.user), 
    where('contrasena', '==', ingresante.password)
  );

  return from(getDocs(q)).pipe(
    map(snapshot => {
      const usuarios = snapshot.docs.map(doc => {
        const data = doc.data() as Usuario;
        return new Usuario(
          doc.id,
          data.usuario,
          data.contrasena,
          data.administrador,
          data.jerarquia
        );
      });
      return usuarios.length > 0 ? usuarios[0] : null;
    })
  );
}

}
