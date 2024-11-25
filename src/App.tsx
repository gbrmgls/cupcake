/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@supabase/supabase-js";

import "./App.css";
console.log(import.meta.env);
console.log(process.env);
const supabase = createClient(
  import.meta.env.VITE_DATABASE_URL,
  import.meta.env.VITE_DATABASE_KEY
);

function App() {
  useEffect(() => {
    supabase
      .from("cupcakes")
      .select("*")
      .then((res) => {
        setCupcakes(res.data ?? []);
      });

    supabase
      .from("usuarios")
      .select("*")
      .then((res) => {
        setUsuarios(res.data ?? []);
      });

    supabase
      .from("pedidos")
      .select("*")
      .then((res) => {
        setPedidos(res.data ?? []);
      });
  }, []);

  const [cupcakes, setCupcakes] = useState<any[]>([]);

  const [carrinho, setCarrinho] = useState<any>({});

  const [login, setLogin] = useState({
    logado: false,
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const [usuarios, setUsuarios] = useState<any[]>([]);

  const [pedidos, setPedidos] = useState<any[]>([]);

  const [filtro, setFiltro] = useState("");

  const [navegacao, setNavegacao] = useState("landing");

  const cadastrar = (email: string, senha: string, confirmarSenha: string) => {
    if (senha == confirmarSenha && !usuarios.find((u) => u.email == email)) {
      supabase
        .from("usuarios")
        .insert({ email, senha })
        .select()
        .then((res) => {
          console.log(res);
        });
      setUsuarios([...usuarios, { id: usuarios.length + 1, email, senha }]);
      setNavegacao("login");
    } else {
      alert("Senhas diferentes ou e-mail ja cadastrado.");
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
    if (!carrinho.produtos) {
      setCarrinho({
        ...carrinho,
        produtos: [{ id, quantidade: 1 }],
      });
    } else if (!carrinho.produtos.find((c: any) => c.id == id)) {
      setCarrinho({
        ...carrinho,
        produtos: [...carrinho.produtos, { id, quantidade: 1 }],
      });
    }
  };

  const incrCarrinho = (id: number) => {
    console.log(id);
    setCarrinho({
      ...carrinho,
      produtos: carrinho.produtos.map((c: any) =>
        c.id == id ? { ...c, quantidade: c.quantidade + 1 } : c
      ),
    });
    console.log(
      carrinho.produtos.map((c: any) =>
        c.id == id ? { ...c, quantidade: c.quantidade + 1 } : c
      )
    );
  };

  const decrCarrinho = (id: number) => {
    if (carrinho.produtos.find((c: any) => c.id == id).quantidade == 1) {
      setCarrinho({
        ...carrinho,
        produtos: carrinho.produtos.filter((c: any) => c.id != id),
      });
    } else {
      setCarrinho({
        ...carrinho,
        produtos: carrinho.produtos.map((c: any) =>
          c.id == id ? { ...c, quantidade: c.quantidade - 1 } : c
        ),
      });
    }

    if (
      carrinho.produtos.reduce((c: any, a: any) => c + a.quantidade, 0) == 1
    ) {
      setNavegacao("catalogo");
    }
  };

  const removeCarrinho = (id: number) => {
    setCarrinho({
      ...carrinho,
      produtos: carrinho.produtos.filter((c: any) => c.id != id),
    });

    if (
      carrinho.produtos.reduce((c: any, a: any) => c + a.quantidade, 0) == 1
    ) {
      setNavegacao("catalogo");
    }
  };

  const confirmarCompra = () => {
    alert(
      "Compra realizada com sucesso! Você pode acessar os detalhes na aba 'Pedidos'."
    );

    const id = pedidos.length + 1;
    setPedidos([
      ...pedidos,
      {
        ...carrinho,
        id: id,
        usuario: login.email,
        preco: carrinho.produtos.reduce(
          (c: any, a: any) =>
            c +
            a.quantidade *
              (cupcakes.find((cupcake) => cupcake.id === a.id)?.preco ?? 0),
          0
        ),
      },
    ]);

    supabase
      .from("pedidos")
      .insert({
        ...carrinho,
        id: id,
        usuario: login.email,
        preco: carrinho.produtos.reduce(
          (c: any, a: any) =>
            c +
            a.quantidade *
              (cupcakes.find((cupcake) => cupcake.id === a.id)?.preco ?? 0),
          0
        ),
      })
      .select()
      .then((res) => {
        console.log(res);
      });

    setCarrinho({ produtos: [] });
    setNavegacao("catalogo");
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
            {pedidos.filter((p) => p.usuario == login.email).length > 0 && (
              <Button onClick={() => setNavegacao("pedidos")}>Pedidos</Button>
            )}
            {carrinho.produtos?.length > 0 && (
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
                    <img src={cupcake.imagem} />
                    <p className="text-2xl font-bold">{cupcake.nome}</p>
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

          {carrinho.produtos.map((item: any) => (
            <div className="flex flex-col gap-2 bg-gray-200">
              <img
                src={cupcakes.find((cupcake) => cupcake.id === item.id)?.imagem}
              />
              <p className="text-2xl font-bold">
                {cupcakes.find((cupcake) => cupcake.id === item.id)?.nome}
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

          <Input
            type="text"
            placeholder="Nome"
            onChange={(e) => setCarrinho({ ...carrinho, nome: e.target.value })}
            value={carrinho.nome}
          ></Input>
          <Input
            type="text"
            placeholder="Endereço"
            onChange={(e) =>
              setCarrinho({ ...carrinho, endereco: e.target.value })
            }
            value={carrinho.endereco}
          ></Input>
          <Input
            type="text"
            placeholder="Cartão de crédito"
            onChange={(e) =>
              setCarrinho({ ...carrinho, cartao: e.target.value })
            }
            value={carrinho.cartao}
          ></Input>

          <p>
            Preço: R$
            {carrinho.produtos.reduce(
              (c: any, a: any) =>
                c +
                a.quantidade *
                  (cupcakes.find((cupcake) => cupcake.id === a.id)?.preco ?? 0),
              0
            )}
          </p>

          <Button onClick={() => setNavegacao("confirmar")}>Comprar</Button>
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
          <div>
            {pedidos
              .filter((p) => p.usuario == login.email)
              .map((pedido: any) => (
                <div className="flex flex-col gap-2 bg-gray-200 mt-3">
                  <p>Produtos:</p>
                  {pedido.produtos.map((item: any) => (
                    <div className="flex gap-2 items-center justify-center bg-gray-300">
                      <p className="text-2xl font-bold">
                        {
                          cupcakes.find((cupcake) => cupcake.id === item.id)
                            ?.nome
                        }
                      </p>
                      <p>
                        R$
                        {
                          cupcakes.find((cupcake) => cupcake.id === item.id)
                            ?.preco
                        }
                      </p>
                      <p>Quantidade: {item.quantidade}</p>
                    </div>
                  ))}
                  <p>Usuário: {pedido.usuario}</p>
                  <p>Endereço: {pedido.endereco}</p>
                  <p>Cartão de crédito: {pedido.cartao}</p>
                  <p>Preço: R${pedido.preco}</p>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* FINALIZAR COMPRA */}
      {navegacao === "confirmar" && (
        <div className="flex flex-col gap-2 mt-3">
          <h1>Confirmar compra?</h1>
          <div className="flex gap-2 mt-3 items-center justify-center">
            <h3>Usuário logado: </h3>
            <Button onClick={() => deslogar()}>Sair</Button>
            <Button onClick={() => setNavegacao("catalogo")}>Voltar</Button>
          </div>

          {carrinho.produtos.map((item: any) => (
            <div className="flex gap-2 items-center justify-center">
              <p className="text-2xl font-bold">
                {cupcakes.find((cupcake) => cupcake.id === item.id)?.nome}
              </p>

              <p>
                R${cupcakes.find((cupcake) => cupcake.id === item.id)?.preco}
              </p>
              <p>Quantidade: {item.quantidade}</p>
            </div>
          ))}
          <p>
            Preço: R$
            {carrinho.produtos.reduce(
              (c: any, a: any) =>
                c +
                a.quantidade *
                  (cupcakes.find((cupcake) => cupcake.id === a.id)?.preco ?? 0),
              0
            )}
          </p>
          <p>Nome: {carrinho.nome}</p>
          <p>Endereço: {carrinho.endereco}</p>
          <p>Cartao: {carrinho.cartao}</p>
          <Button onClick={() => confirmarCompra()}>Confirmar</Button>
          <Button onClick={() => setNavegacao("carrinho")}>Cancelar</Button>
        </div>
      )}
    </>
  );
}

export default App;
