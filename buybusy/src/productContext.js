import { createContext, useContext, useEffect, useState } from "react";
import { collection, query, where, getDocs, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "./fireBase";
import { useAuthContext } from "./authContext";

const productContext = createContext();

export const useProductContext = () => {
  const value = useContext(productContext);
  return value;
};

const ProductProvider = ({ children }) => {
    const { user }=useAuthContext();
 
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState([]);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totel, setTotel] = useState(true);

  const fetchData = async () => {
    const order=[];
    const cart=[];
    const product=[]
    const productQuerySnapshot = await getDocs(collection(db, "product"));
    productQuerySnapshot.forEach((doc) => {
        product.push({id:doc.id,...doc.data()})
    });
    setIsLoading(false)
    const orderquery = query(collection(db, "order"), where("userId", "==",user.id ));
    const orderDocSnap = await getDocs(orderquery);
    orderDocSnap.forEach((doc) => {
        order.push({id:doc.id,...doc.data()})
    });
    const cartquery = query(collection(db, "cart"), where("userId", "==",user.id ));
    const cartDocSnap = await getDocs(cartquery);
    cartDocSnap.forEach((doc) => {
        cart.push({id:doc.id,...doc.data()})
    });
    setCart(cart)
    setOrder(order)
    setProducts(product)
  };

  useEffect(() => {fetchData()}, []);

  const addToCart=async(product)=>{
    let index=cart.findIndex((value)=>value.id===product.id);
    const q = query(collection(db, "cart"), where("userId", "==", user.id), where("productId", "==", product.id));
    const cartDocSnap = await getDocs(q);
    if (!cartDocSnap.empty && index!==-1) {
        const doc = cartDocSnap.docs[0];
        const data = doc.data();
        await setDoc(doc(db, "cart", doc.id), {
            quentity:data.quentity+1
          });
          cart[index].quentity++;
          setCart(cart)
          setTotel((prevTotel)=>prevTotel+product.price)
    }else{
        const docRef = await addDoc(collection(db, "cart"), {
            userId: user.id,
            productId:product.id,
            quentity:1
          });
          cart.push({
            id:docRef.id,
            userId: user.id,
            productId:product.id,
            quentity:1
          })
          setCart(cart)
          setTotel((prevTotel)=>prevTotel+product.price)
    }
  }

  const removeFromCart=async(product)=>{
    let index=cart.findIndex((value)=>value.id===product.id);
    const q = query(collection(db, "cart"), where("userId", "==", user.id), where("productId", "==", product.id));
    const cartDocSnap = await getDocs(q);
    if (!cartDocSnap.empty && index!==-1) {
        const doc = cartDocSnap.docs[0];
        await deleteDoc(doc(db, "cart",doc.id));
          cart.splice(index,1);
          setCart(cart)
          setTotel((prevTotel)=>prevTotel-product.price)
    }
    return;
  }

  const increaseCount=async(product)=>{
    let index=cart.findIndex((value)=>value.id===product.id);
    const q = query(collection(db, "cart"), where("userId", "==", user.id), where("productId", "==", product.id));
    const cartDocSnap = await getDocs(q);
    if (!cartDocSnap.empty && index!==-1) {
        const doc = cartDocSnap.docs[0];
        const data = doc.data();
        await setDoc(doc(db, "cart", doc.id), {
            quentity:data.quentity+1
          });
          cart[index].quentity++;
          setCart(cart)
          setTotel((prevTotel)=>prevTotel+product.price);
          
    }
    return;
  }

  const decreaseCount=async(product)=>{
    let index=cart.findIndex((value)=>value.id===product.id);
    const q = query(collection(db, "cart"), where("userId", "==", user.id), where("productId", "==", product.id));
    const cartDocSnap = await getDocs(q);
    if (!cartDocSnap.empty && index!==-1) {
        const doc = cartDocSnap.docs[0];
        const data = doc.data();
        if (data.quentity===1) {
            await deleteDoc(doc(db, "cart",doc.id));
            cart.splice(index,1);
            setCart(cart)
            setTotel((prevTotel)=>prevTotel-product.price)
            return 
        }
        await setDoc(doc(db, "cart", doc.id), {
            quentity:data.quentity+1
          });
          cart[index].quentity++;
          setCart(cart)
          setTotel((prevTotel)=>prevTotel+product.price)
    }
    return;
  }

  return (
    <productContext.Provider value={{ products, order, cart, isLoading,totel,addToCart,removeFromCart,increaseCount,decreaseCount }}>
      {children}
    </productContext.Provider>
  );
};

export default ProductProvider;
