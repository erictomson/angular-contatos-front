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

  
  constructor(
    // Injetando o serviço Auth no componente Cadastrar
    private servico:AuthService,
    // Injetando o Router
    private router:Router
    ) { }

  ngOnInit(): void {
  }

  cadastrar() {
    // Chamada do método cadastrar() de auth.service
    // passando os dados do usuário
    // Observável só disparará a requisição quando o Observador for subscrito
    let observable = this.servico.cadastrar(this.nome, this.email, this.senha);
    // Descrever o Observável
    // Observador: objeto com 3 funções que podem ser executadas de acordo com o Observável
    // Se o Observável retornar um dado, será executado next
    // Se o Observável retornar um erro, será executado erro
    // Se o Observável não retornar mais nenhuma informação, será executado complete
    observable.subscribe(
        {
          next: data => {
            //Salvar o token no sessionStorage
            window.sessionStorage.setItem("token", (<response>data).token);
            // Direcionar o usuário para a rota /home
            this.router.navigateByUrl("/home");
            // Imprimir no console as informações que chegarem no servidor
            console.log(data)
          },
          error: err => console.log(err),
          complete: () => console.log("O observável já não tem mais o que observar")
        }
    );
  }

}
