import { Component, OnInit } from '@angular/core';
import { Contato } from 'src/app/models/Contato';
import { ContatoService } from 'src/app/services/contato.service';

@Component({
  selector: 'app-lista-de-contatos',
  templateUrl: './lista-de-contatos.component.html',
  styleUrls: ['./lista-de-contatos.component.css']
})
export class ListaDeContatosComponent implements OnInit {

  // Propriedade contatos não possui um inicializador
  // usar exclamação para excluir a necessidade de inicializador
  public contatos!: Contato[];

  // Injetando o serviço no construtor
  constructor(private cs:ContatoService) {
    // getContatos retorna um Observable array de Contatos
    // Necessário subscrever o Observable definido por 3 funções: next, error e complete
    this.cs.getContatos().subscribe(
      {
        // Atribuir o array recebido ao atributo interno contatos
        next: contatos => {
          this.contatos = contatos;
        },
        // Caso ocorra algum erro, tratar
        error: err => console.error(err)
        // Como não há nenhuma ação posterior, não é necessário o complete
      }
    )
        
    ContatoService.onContatosMudaram.subscribe(
      (contatos) => {
        this.contatos = contatos;
      }
    )
  }

  ngOnInit(): void {
  }  

}
