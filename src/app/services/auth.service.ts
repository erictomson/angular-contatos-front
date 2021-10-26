import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url="http://contatos-nodb.herokuapp.com";

  // Injetando HttpClient no Construtor
  constructor(private http:HttpClient) { }

  cadastrar(nome:string, email:string, senha:string) {
    // Criar objeto literal com os 3 parâmetros
    let u = {nome, email, senha};
    // Enviar as informações para o back end que
    // está respondendo na url definida na constante + /registrar
    // http.post realizará a requisição post
    // Este método retornará um Observable
    // A requisição será disparada em cadastrar.component
    return this.http.post(this.url + "/registrar",u);
  }

}
