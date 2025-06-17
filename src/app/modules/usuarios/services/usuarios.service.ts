import { Injectable } from '@angular/core';
import { collection, deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UsuarioInterno } from '../models/usuarioInterno.model';
import { collectionData } from 'rxfire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private coleccion = collection(this.firestore, 'Usuarios');

  constructor(private firestore: Firestore) {}

  obtenerUsuarios(): Observable<UsuarioInterno[]> {
    return collectionData(this.coleccion, { idField: 'id' }) as Observable<UsuarioInterno[]>;
  }

  crearUsuario(usuario: UsuarioInterno) {
    const docRef = doc(this.coleccion, usuario.id);
    return setDoc(docRef, usuario);
  }

  actualizarUsuario(usuario: UsuarioInterno) {
    const docRef = doc(this.coleccion, usuario.id);
    return updateDoc(docRef, usuario as any);
  }

  eliminarUsuario(id: string) {
    const docRef = doc(this.coleccion, id);
    return deleteDoc(docRef);
  }
}
