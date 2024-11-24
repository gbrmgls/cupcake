import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import "./App.css";

function App() {
  const [cupcakes, setCupcakes] = useState([
    {
      id: 1,
      nome: "Cupcake 1",
      preco: 1,
      nota: 5,
      descricao: "Um delicioso cupcake!",
    },
    {
      id: 2,
      nome: "Cupcake 2",
      preco: 2,
      nota: 4,
      descricao: "Um ótimo cupcake!",
    },
    {
      id: 3,
      nome: "Cupcake 3",
      preco: 3,
      nota: 3,
      descricao: "Um lindo cupcake!",
    },
  ]);

  const [carrinho, setCarrinho] = useState([
    {
      id: 1,
      quantidade: 2,
    },
    {
      id: 2,
      quantidade: 1,
    },
    {
      id: 3,
      quantidade: 1,
    },
  ]);

  const [login, setLogin] = useState({
    logado: false,
    email: "",
    senha: "",
  });

  const [usuarios, setUsuarios] = useState([]);

  const [pedidos, setPedidos] = useState([
    {
      usuario: "teste@gmail.com",
      id: 1,
      produtos: [
        {
          id: 1,
          quantidade: 2,
        },
        {
          id: 2,
          quantidade: 1,
        },
        {
          id: 3,
          quantidade: 1,
        },
      ],
    },
  ]);

  const [navegacao, setNavegacao] = useState("landing");

  const logar = (email: string, senha: string) => {
    setLogin({ logado: true, email, senha: "" });
    setNavegacao("catalogo");
  };

  const deslogar = () => {
    setLogin({ logado: false, email: "", senha: "" });
    setNavegacao("landing");
  };

  return (
    <>
      {/* LANDING PAGE */}
      {navegacao === "landing" && (
        <div className="flex flex-col gap-2 mt-3">
          <h1>Loja de Cupcakes</h1>
          <Button onClick={() => setNavegacao("login")}>Login</Button>
          <Button onClick={() => setNavegacao("cadastro")}>Cadastro</Button>
        </div>
      )}

      {/* LOGIN */}
      {navegacao === "login" && (
        <div className="flex flex-col gap-2 mt-3">
          <h1>Login</h1>
          <Input
            type="text"
            placeholder="Email"
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Senha"
            onChange={(e) => setLogin({ ...login, senha: e.target.value })}
          />

          <Button onClick={() => logar(login.email, login.senha)}>
            Entrar
          </Button>
        </div>
      )}

      {/* CADASTRO */}
      {navegacao === "cadastro" && (
        <div className="flex flex-col gap-2 mt-3">
          <h1>Cadastro</h1>
          <Input type="text" placeholder="Seu email" />
          <Input type="password" placeholder="Crie sua senha" />
          <Input type="password" placeholder="Confirme sua senha" />

          <Button onClick={() => setNavegacao("login")}>Enviar</Button>
        </div>
      )}

      {/* CATALOGO */}
      {navegacao === "catalogo" && (
        <div className="flex flex-col gap-2 mt-3">
          <h1>Catálogo</h1>
          <div className="flex gap-2 mt-3 items-center justify-center">
            <h3>Usuário logado: {login.email}</h3>
            <Button onClick={() => deslogar()}>Sair</Button>
            <Button onClick={() => setNavegacao("pedidos")}>Pedidos</Button>
            <Button onClick={() => setNavegacao("carrinho")}>Carrinho</Button>
          </div>
          <div className="flex gap-2 mt-3">
            <Input type="text" placeholder="Cupcake..." />
            <Button>Buscar</Button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {cupcakes.map((cupcake) => (
              <div className="flex flex-col gap-2 bg-gray-200">
                <img src="cupcake.png" />
                <p className="text-2xl font-bold">{cupcake.nome}</p>
                <p>Nota: {cupcake.nota}/5</p>
                <p>{cupcake.descricao}</p>
                <p>R${cupcake.preco}</p>
                <Button>Adicionar ao carrinho</Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CARRINHO */}
      {navegacao === "carrinho" && (
        <div className="flex flex-col gap-2 mt-3">
          <h1>Carrinho</h1>
          <div className="flex gap-2 mt-3 items-center justify-center">
            <h3>Usuário logado: {login.email}</h3>
            <Button onClick={() => deslogar()}>Sair</Button>
            <Button onClick={() => setNavegacao("catalogo")}>Voltar</Button>
          </div>

          {carrinho.map((item) => (
            <div className="flex flex-col gap-2 bg-gray-200">
              <img src="cupcake.png" />
              <p className="text-2xl font-bold">
                {cupcakes.find((cupcake) => cupcake.id === item.id)?.nome}
              </p>
              <p>
                Nota: {cupcakes.find((cupcake) => cupcake.id === item.id)?.nota}
                /5
              </p>
              <p>
                {cupcakes.find((cupcake) => cupcake.id === item.id)?.descricao}
              </p>
              <p>
                R${cupcakes.find((cupcake) => cupcake.id === item.id)?.preco}
              </p>
              <div className="flex gap-2 items-center justify-center">
                <Button>-</Button>
                <p>{item.quantidade}</p>
                <Button>+</Button>
              </div>
            </div>
          ))}

          <Input type="text" placeholder="Nome"></Input>
          <Input type="text" placeholder="Endereço"></Input>
          <Input type="text" placeholder="Cartão de crédito"></Input>
          <Input type="text" placeholder="Cupom (Opcional)"></Input>

          <p>
            Total: R$
            {carrinho.reduce(
              (total, item) =>
                total +
                item.quantidade *
                  (cupcakes.find((cupcake) => cupcake.id === item.id)?.preco ??
                    0),
              0
            )}
          </p>
          <Button onClick={() => setNavegacao("compra-finalizada")}>
            Comprar
          </Button>
          <Button onClick={() => setNavegacao("catalogo")}>Cancelar</Button>
        </div>
      )}

      {/* PEDIDOS */}
      {navegacao === "pedidos" && (
        <div className="flex flex-col gap-2 mt-3">
          <h1>Pedidos</h1>
          <div className="flex gap-2 mt-3 items-center justify-center">
            <h3>Usuário logado: </h3>
            <Button onClick={() => deslogar()}>Sair</Button>
            <Button onClick={() => setNavegacao("catalogo")}>Voltar</Button>
          </div>
        </div>
      )}

      {/* COMPRA FINALIZADA */}
      {navegacao === "compra-finalizada" && (
        <div className="flex flex-col gap-2 mt-3">
          <h1>Compra finalizada</h1>
          <div className="flex gap-2 mt-3 items-center justify-center">
            <h3>Usuário logado: </h3>
            <Button onClick={() => deslogar()}>Sair</Button>
            <Button onClick={() => setNavegacao("catalogo")}>Voltar</Button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
