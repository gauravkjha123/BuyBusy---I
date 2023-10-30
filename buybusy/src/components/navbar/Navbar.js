import navStyleCss from "./navbar.module.css";
import { NavLink, Outlet } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineShoppingCart,
  AiOutlineLogin,
  AiOutlineLogout
} from "react-icons/ai";
import { BsBagCheck } from "react-icons/bs";
import { useAuthContext } from "../../authContext";

export const Navbar = () => {
  const { user, signOut } = useAuthContext();
  return (
    <div>
      <div className={navStyleCss.navbar}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3176/3176363.png"
          alt="logo"
          onClick={() => window.location.replace("/")}
        />

        <div>
          <nav>
            <NavLink
              style={({ isActive }) =>
                isActive
                  ? {
                      color: "blue",
                    }
                  : null
              }
              to="/"
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <AiOutlineHome /> <span>Home</span>
              </div>
            </NavLink>
            {!user ? (
              ""
            ) : (
              <NavLink
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "blue",
                      }
                    : null
                }
                to="/order"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <BsBagCheck /> <span>Order</span>
                </div>
              </NavLink>
            )}
            {!user ? (
              ""
            ) : (
              <NavLink
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "blue",
                      }
                    : null
                }
                to="/cart"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <AiOutlineShoppingCart /> <span>Cart</span>
                </div>
              </NavLink>
            )}
            {user ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  cursor: "pointer",
                }}
                onClick={signOut}
              >
                {" "}
                <AiOutlineLogout /> <span>SignOut</span>{" "}
              </div>
            ) : (
              <NavLink
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "blue",
                      }
                    : null
                }
                to="/signIn"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <AiOutlineLogin /> <span>Login</span>
                </div>
              </NavLink>
            )}
          </nav>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
