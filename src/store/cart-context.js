import { createContext, useState } from 'react';

export const CartContext = createContext({
    cartItems: [],
    total() {
        return this.cartItems.reduce((item, cval) => item.price + cval, 0);
    },
    onAdd: () => {},
    onRemove: () => {},
});

export default function CartContextProvider(props) {
    const [cartItems, setCartItems] = useState([]),
        onAdd = () => {
            setCartItems(prevCartItems => prevCartItems.push());
        },
        onRemove = itemIndex => {
            setCartItems(prevCartItems => prevCartItems.splice(itemIndex, 1));
        };
    return (
        <CartContext.Provider value={{ cartItems, onAdd, onRemove }}>
            {props.children}
        </CartContext.Provider>
    );
}
