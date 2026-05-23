import { Link, useLocation } from "react-router";
import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect } from "react";
import { LogOut, ShoppingCart, Box, LayoutDashboard, Plus } from "lucide-react";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();

  const handleAuthUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth", {
        credentials: "include",
      });

      if (response.status !== 200) {
        console.log("Não autorizado");
        return;
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        console.log("Erro ao fazer logout");
        return;
      }

      setUser(null);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    handleAuthUser();
  }, []);

  const getNavItemClass = (path: string) => {
    const baseClass =
      "h-[35px] w-[35px] rounded-md border-1 flex justify-center items-center cursor-pointer";
    if (location.pathname === path) {
      return `${baseClass} text-[#161410] bg-[#F2DAAC]`;
    } else {
      return baseClass;
    }
  };

  return (
    <div className="bg-[#161410]">
      <div className="mx-auto flex w-full items-center justify-between p-3 md:w-212.5 md:p-0">
        <Link to="/">
          <img src="/logo.png" alt="" />
        </Link>
        {user ? (
          <div className="flex items-center gap-8 text-white">
            {user.admin && (
              <div className="hidden items-center gap-2 text-[#F2DAAC] md:flex">
                <Link to="/">
                  <div className={getNavItemClass("/")}>
                    <Box size={20} />
                  </div>
                </Link>
                <Link to="/pedidos">
                  <div className={getNavItemClass("/pedidos")}>
                    <LayoutDashboard size={20} />
                  </div>
                </Link>
                <div className="flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-md border-1">
                  <Plus size={20} />
                </div>
              </div>
            )}
            <div className="relative cursor-pointer">
              <ShoppingCart size={20} />
              <span className="absolute -top-4.5 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#F2DAAC] text-xs font-bold text-[#161410]">
                1
              </span>
            </div>
            <div className="flex items-center gap-2">
              <p>{user.name}</p>
              <LogOut
                size={20}
                className="cursor-pointer"
                onClick={handleLogout}
              />
            </div>
          </div>
        ) : (
          <Link to="/login">
            <div className="flex h-8.75 w-32.5 cursor-pointer items-center justify-center rounded-sm bg-[#F2DAAC]">
              Entrar
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
