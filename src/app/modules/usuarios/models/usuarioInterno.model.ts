export interface UsuarioInterno {
  id: string; 
  username: string;          // ID de Firebase Auth
  usuario: string;      // Email
  clave: string;        // (opcional: puede omitirse al guardar en Firestore)
  accesos: string[];    // ['clientes', 'remitos', 'facturas', etc.]
}