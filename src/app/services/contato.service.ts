import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contato } from '../models/Contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  private readonly chave:string = "CONTATOS";
  // Constante interna contendo a URL para onde 
  // as requisições deverão ser disparadas
  private readonly url = "http://contatos-nodb.herokuapp.com";

  static onContatosMudaram:EventEmitter<Contato[]> = new EventEmitter();

  // Injetando HTTP Client como dependência
  // no construtor
  constructor(private http:HttpClient) { }
  
  // Função retornará um Observable
  // que, por sua vez, retornará um array de Contatos
  getContatos():Observable<Contato[]> {
    // Recuperando o token do SessionStorage
    let token = window.sessionStorage.getItem('token');
    // Esta requisição não necessita de um Get
    // É necessário passar o token através do header que conterá o campo Authorization
    // passando o token através do Bearer (portador)
    // Retornando um array de Contatos como Observable
    return this.http.get<Contato[]>(this.url + '/contatos',{headers:{Authorization:`Bearer ${token}`}})
  }

  addContato(c:Contato): void { }

}
