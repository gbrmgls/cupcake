import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import "./App.css";

function App() {
  const [state, setState] = useState({});
  return (
    <>
      {/* LANDING PAGE */}
      {/* <div className="flex flex-col gap-2 mt-3">
        <h1>Loja de Cupcakes</h1>
        <Button>Login</Button>
        <Button>Cadastro</Button>
      </div> */}

      {/* LOGIN */}
      {/* <div className="flex flex-col gap-2 mt-3">
        <h1>Login</h1>
        <Input type="text" placeholder="Email" />
        <Input type="password" placeholder="Senha" />

        <Button>Entrar</Button>
      </div> */}

      {/* CADASTRO */}
      {/* <div className="flex flex-col gap-2 mt-3">
        <h1>Cadastro</h1>
        <Input type="text" placeholder="Seu email" />
        <Input type="password" placeholder="Crie sua senha" />
        <Input type="password" placeholder="Confirme sua senha" />

        <Button>Enviar</Button>
      </div> */}

      {/* CATALOGO */}
      {/* <div className="flex flex-col gap-2 mt-3">
        <h1>Catálogo</h1>
        <div className="flex gap-2 mt-3 items-center justify-center">
        <h3>Usuário logado: teste@gmail.com</h3>
        <Button>Sair</Button>
        <Button>Carrinho</Button>
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
      </div> */}

      {/* CARRINHO */}

      <div className="flex flex-col gap-2 mt-3">
        <h1>Carrinho</h1>
        <div className="flex gap-2 mt-3 items-center justify-center">
          <h3>Usuário logado: teste@gmail.com</h3>
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
        <Button>Comprar</Button>
        <Button>Cancelar</Button>
      </div>
    </>
  );
}

export default App;
