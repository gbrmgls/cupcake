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

  const [login, setLogin] = useState({
    logado: false,
    email: "",
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
          <Input type="text" placeholder="Email" />
          <Input type="password" placeholder="Senha" />

          <Button onClick={() => setNavegacao("catalogo")}>Entrar</Button>
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
            <h3>Usuário logado: teste@gmail.com</h3>
            <Button onClick={() => setNavegacao("landing")}>Sair</Button>
            <Button onClick={() => setNavegacao("pedidos")}>Pedidos</Button>
            <Button onClick={() => setNavegacao("carrinho")}>Carrinho</Button>
          </div>
          <div className="flex gap-2 mt-3">
            <Input type="text" placeholder="Cupcake..." />
            <Button>Buscar</Button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col gap-2 bg-gray-200">
              <img src="cupcake.png" alt="Cupcake 1" />
              <p className="text-2xl font-bold">Cupcake 1</p>
              <p>Nota: 4.5/5</p>
              <p>Um delicioso cupcake!</p>
              <p>R$1</p>
              <Button>Adicionar ao carrinho</Button>
            </div>

            <div className="flex flex-col gap-2 bg-gray-200">
              <img src="cupcake.png" alt="Cupcake 1" />
              <p className="text-2xl font-bold">Cupcake 1</p>
              <p>Nota: 4.5/5</p>
              <p>Um delicioso cupcake!</p>
              <p>R$1</p>
              <Button>Adicionar ao carrinho</Button>
            </div>

            <div className="flex flex-col gap-2 bg-gray-200">
              <img src="cupcake.png" alt="Cupcake 1" />
              <p className="text-2xl font-bold">Cupcake 1</p>
              <p>Nota: 4.5/5</p>
              <p>Um delicioso cupcake!</p>
              <p>R$1</p>
              <Button>Adicionar ao carrinho</Button>
            </div>

            <div className="flex flex-col gap-2 bg-gray-200">
              <img src="cupcake.png" alt="Cupcake 1" />
              <p className="text-2xl font-bold">Cupcake 1</p>
              <p>Nota: 4.5/5</p>
              <p>Um delicioso cupcake!</p>
              <p>R$1</p>
              <Button>Adicionar ao carrinho</Button>
            </div>
          </div>
        </div>
      )}

      {/* CARRINHO */}
      {navegacao === "carrinho" && (
        <div className="flex flex-col gap-2 mt-3">
          <h1>Carrinho</h1>
          <div className="flex gap-2 mt-3 items-center justify-center">
            <h3>Usuário logado: teste@gmail.com</h3>
            <Button onClick={() => setNavegacao("landing")}>Sair</Button>
            <Button onClick={() => setNavegacao("catalogo")}>Voltar</Button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col gap-2 bg-gray-200">
              <img src="cupcake.png" alt="Cupcake 1" />
              <p className="text-2xl font-bold">Cupcake 1</p>
              <p>Nota: 4.5/5</p>
              <p>Um delicioso cupcake!</p>
              <p>R$1</p>
              <div className="flex gap-2 items-center justify-center">
                <Button>-</Button>
                <p>2</p>
                <Button>+</Button>
              </div>
            </div>

            <div className="flex flex-col gap-2 bg-gray-200">
              <img src="cupcake.png" alt="Cupcake 1" />
              <p className="text-2xl font-bold">Cupcake 1</p>
              <p>Nota: 4.5/5</p>
              <p>Um delicioso cupcake!</p>
              <p>R$1</p>
              <div className="flex gap-2 items-center justify-center">
                <Button>-</Button>
                <p>2</p>
                <Button>+</Button>
              </div>
            </div>

            <div className="flex flex-col gap-2 bg-gray-200">
              <img src="cupcake.png" alt="Cupcake 1" />
              <p className="text-2xl font-bold">Cupcake 1</p>
              <p>Nota: 4.5/5</p>
              <p>Um delicioso cupcake!</p>
              <p>R$1</p>
              <div className="flex gap-2 items-center justify-center">
                <Button>-</Button>
                <p>2</p>
                <Button>+</Button>
              </div>
            </div>

            <div className="flex flex-col gap-2 bg-gray-200">
              <img src="cupcake.png" alt="Cupcake 1" />
              <p className="text-2xl font-bold">Cupcake 1</p>
              <p>Nota: 4.5/5</p>
              <p>Um delicioso cupcake!</p>
              <p>R$1</p>
              <div className="flex gap-2 items-center justify-center">
                <Button>-</Button>
                <p>2</p>
                <Button>+</Button>
              </div>
            </div>
          </div>
          <p>Subtotal: R$10</p>
          <p>Frete: R$10</p>
          <p>Total: R$30</p>
          <Button onClick={() => setNavegacao("compra")}>Comprar</Button>
          <Button onClick={() => setNavegacao("catalogo")}>Cancelar</Button>
        </div>
      )}

      {/* PEDIDOS */}
      {navegacao === "pedidos" && (
        <div className="flex flex-col gap-2 mt-3">
          <h1>Pedidos</h1>
          <div className="flex gap-2 mt-3 items-center justify-center">
            <h3>Usuário logado: </h3>
            <Button onClick={() => setNavegacao("landing")}>Sair</Button>
            <Button onClick={() => setNavegacao("catalogo")}>Voltar</Button>
          </div>
        </div>
      )}

      {/* PEDIDOS */}
      {navegacao === "compra" && (
        <div className="flex flex-col gap-2 mt-3">
          <h1>Compra finalizada</h1>
          <div className="flex gap-2 mt-3 items-center justify-center">
            <h3>Usuário logado: </h3>
            <Button onClick={() => setNavegacao("landing")}>Sair</Button>
            <Button onClick={() => setNavegacao("catalogo")}>Voltar</Button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
