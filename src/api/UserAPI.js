import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);
  const [users, setUsers] = useState(false);
  const [allUsers, setAllUsers] = useState("");
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("/user/infor", {
            headers: { Authorization: token },
          });
          setIsLogged(true);
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
          setUsers(res.data);
          setCart(res.data.cart);
        } catch (err) {
          alert(err.response.data.msg);
        }
      };
      getUser();
    }
  }, [token]);
  useEffect(() => {
    const getAllUser = async () => {
      const res = await axios.get("/user/alluser");
      setAllUsers(res.data);
    };
    getAllUser();
  }, [callback]);
  const addCart = async (product) => {
    if (!isLogged) return alert("Vui lòng đăng nhập để tiếp tục mua hàng");
    const check = cart.every((item) => {
      return item._id !== product._id;
    });
    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);
      const res = await axios.patch(
        "/user/addcart",
        { cart: [...cart, { ...product, quantity: 1 }] },
        {
          headers: { Authorization: token },
        }
      );
      toast.success(res.data.msg);
    } else {
      // toast.success("Sản phẩm này đã tồn tại trong giỏ hàng.")
    }
  };
  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    addCart: addCart,
    history: [history, setHistory],
    users: [users, setUsers],
    callback: [callback, setCallback],
    allusers: [allUsers, setAllUsers],
  };
}

export default UserAPI;
