// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, collection, doc, getDoc, getDocs, query, where } from '@angular/fire/firestore';
import { UsuarioInterno } from '../../usuarios/models/usuarioInterno.model'; 

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore) {}

async login(username: string, clave: string): Promise<UsuarioInterno | null> {
  // Buscamos por username
  const usuariosRef = collection(this.firestore, 'Usuarios');
  const q = query(usuariosRef, where('username', '==', username));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    const data = snapshot.docs[0].data() as UsuarioInterno;
    const email = data.usuario; // email registrado

    const cred = await signInWithEmailAndPassword(this.auth, email, clave);

    const ref = doc(this.firestore, 'Usuarios', cred.user.uid);
    const userDoc = await getDoc(ref);

    return userDoc.exists() ? userDoc.data() as UsuarioInterno : null;
  } else {
    throw new Error('Nombre de usuario no encontrado');
  }
}
}
