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

  const [carrinho, setCarrinho] = useState<any[]>([]);

  const [login, setLogin] = useState({
    logado: false,
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const [usuarios, setUsuarios] = useState<any[]>([
    {
      email: "teste",
      senha: "teste",
    },
  ]);

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

  const [filtro, setFiltro] = useState("");

  const [navegacao, setNavegacao] = useState("landing");

  const cadastrar = (email: string, senha: string, confirmarSenha: string) => {
    if (senha == confirmarSenha && !usuarios.find((u) => u.email == email)) {
      setNavegacao("login");
      setUsuarios([...usuarios, { email, senha }]);
    }
  };

  const logar = (email: string, senha: string) => {
    if (
      usuarios.find((u) => u.email == email) &&
      usuarios.find((u) => u.senha == senha)
    ) {
      setLogin({ logado: true, email, senha: "", confirmarSenha: "" });
      setNavegacao("catalogo");
    } else {
      alert("Login incorreto.");
    }
  };

  const deslogar = () => {
    setLogin({ logado: false, email: "", senha: "", confirmarSenha: "" });
    setCarrinho([]);
    setNavegacao("landing");
  };

  const addCarrinho = (id: number) => {
    if (!carrinho.find((c) => c.id == id)) {
      setCarrinho([...carrinho, { id, quantidade: 1 }]);
    }
  };

  const incrCarrinho = (id: number) => {
    setCarrinho(
      carrinho.map((c) =>
        c.id == id ? { ...c, quantidade: c.quantidade + 1 } : c
      )
    );
  };

  const decrCarrinho = (id: number) => {
    if (carrinho.find((c) => c.id == id).quantidade == 1) {
      setCarrinho(carrinho.filter((c) => c.id != id));
    } else {
      setCarrinho(
        carrinho.map((c) =>
          c.id == id ? { ...c, quantidade: c.quantidade - 1 } : c
        )
      );
    }
  };

  const removeCarrinho = (id: number) => {
    setCarrinho(carrinho.filter((c) => c.id != id));
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
          <Button onClick={() => setNavegacao("landing")}>Voltar</Button>
        </div>
      )}

      {/* CADASTRO */}
      {navegacao === "cadastro" && (
        <div className="flex flex-col gap-2 mt-3">
          <h1>Cadastro</h1>
          <Input
            type="text"
            placeholder="Seu email"
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Crie sua senha"
            onChange={(e) => setLogin({ ...login, senha: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Confirme sua senha"
            onChange={(e) =>
              setLogin({ ...login, confirmarSenha: e.target.value })
            }
          />

          <Button
            onClick={() =>
              cadastrar(login.email, login.senha, login.confirmarSenha)
            }
          >
            Enviar
          </Button>
          <Button onClick={() => setNavegacao("landing")}>Voltar</Button>
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
            {carrinho.length > 0 && (
              <Button onClick={() => setNavegacao("carrinho")}>Carrinho</Button>
            )}
          </div>
          <Input
            type="text"
            placeholder="Pesquisar"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />

          <div className="grid grid-cols-3 gap-2">
            {cupcakes.map(
              (cupcake) =>
                (filtro == "" ||
                  cupcake.nome
                    .toLowerCase()
                    .includes(filtro.toLowerCase())) && (
                  <div className="flex flex-col gap-2 bg-gray-200">
                    <img src="cupcake.png" />
                    <p className="text-2xl font-bold">{cupcake.nome}</p>
                    <p>Nota: {cupcake.nota}/5</p>
                    <p>{cupcake.descricao}</p>
                    <p>R${cupcake.preco}</p>
                    <Button onClick={() => addCarrinho(cupcake.id)}>
                      Adicionar ao carrinho
                    </Button>
                  </div>
                )
            )}
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
                <Button onClick={() => decrCarrinho(item.id)}>-</Button>
                <p>{item.quantidade}</p>
                <Button onClick={() => incrCarrinho(item.id)}>+</Button>
              </div>
              <Button onClick={() => removeCarrinho(item.id)}>Remover</Button>
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
