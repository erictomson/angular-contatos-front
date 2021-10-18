import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

interface response {
  msg: string,
  token: string
}

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  nome = '';
  email = '';
  senha = '';
  confirmacao = '';

  // Injetando o serviço Auth no componente Cadastrar
  constructor(
    private servico:AuthService,
    private router:Router
    ) { }

  ngOnInit(): void {
  }

  cadastrar() {
    let observable = this.servico.cadastrar(this.nome, this.email, this.senha);
    observable.subscribe(
        {
          next: data => {
            //Salvar o token no sessionStorage
            window.sessionStorage.setItem("token", (<response>data).token);
            // Direcionar o usuário para a home
            console.log(data)
          },
          error: err => console.log(err),
          complete: () => console.log("O observável já não tem mais o que observar")
        }
    );
  }

}
