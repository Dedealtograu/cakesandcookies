import { useState, useContext } from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router";
import Button from "../components/Button";
import { UserContext } from "../contexts/UserContext";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (!email || !password) {
        setError("Usuário e senha são obrigatórios");
        return;
      }
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 404) {
        setError("Usuário não encontrado");
        return;
      }

      if (response.status === 400) {
        setError("Usuário e senha são obrigatórios");
        return;
      }

      if (response.status === 401) {
        setError("Credenciais inválidas");
        return;
      }

      if (response.status === 500) {
        setError("Erro interno do servidor");
        return;
      }

      if (response.status === 200) {
        setError("");
        const data = await response.json();
        setUser(data);
        navigate("/");
      }
    } catch (erro) {
      console.error(erro);
      return;
    }
  }

  return (
    <form
      className="flex h-screen items-center justify-center bg-[#161410]"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col justify-center gap-2">
        <Link to="/">
          <img src="/logo.png" alt="" className="mx-auto mb-4" />
        </Link>

        <div className="mb-3 flex flex-col gap-2">
          <Input
            placeholder="E-mail"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Senha"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-left text-sm font-bold text-red-600">{error}</p>
        </div>

        <Button title="Login" variant="default" type="submit" />
        <Link to="/register" className="w-full">
          <Button title="Não tenho uma conta" variant="outline" />
        </Link>
      </div>
    </form>
  );
};

export default Login;
