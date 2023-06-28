import { createContext, useReducer } from 'react';

const defaultCart = {},
    cartReducer = (state, action) => {
        switch (action.type) {
            case 'ADD':
                return {
                    ...state,
                    [action.item.id]: {
                        name: action.item.name,
                        amount: action.item.amount,
                        price: action.item.price,
                    },
                };
            case 'DEL':
                delete state[action.id];
                return { ...state };
            case 'SUM':
                return {
                    ...state,
                    [action.id]: {
                        ...state[action.id],
                        amount: state[action.id].amount + action.inc,
                    },
                };
            case 'CLEAR':
                return {};
            default:
                return state;
        }
    };

export const CartContext = createContext({
    cartItems: {},
    totalItems: () => { },
    totalPrice: () => { },
    onAdd: () => { },
    onRemove: () => { },
    onSum: () => { },
    onClear: () => { },
});

export default function CartContextProvider(props) {
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        defaultCart
    ),
        totalItems = () => {
            return Object.values(cartState).reduce(
                (cval, item) => item.amount + cval,
                0
            );
        },
        totalPrice = () => {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(
                Object.values(cartState).reduce(
                    (cval, item) => item.price * item.amount + cval,
                    0
                )
            );
        },
        onAdd = item => {
            dispatchCartAction({ type: 'ADD', item: item });
        },
        onRemove = id => {
            dispatchCartAction({ type: 'DEL', id: id });
        },
        onSum = (id, inc) => {
            dispatchCartAction({ type: 'SUM', id: id, inc: inc });
        },
        onClear = () => {
            dispatchCartAction({ type: 'CLEAR' });
        };
    return (
        <CartContext.Provider
            value={{
                cartItems: cartState,
                totalItems,
                totalPrice,
                onAdd,
                onRemove,
                onSum,
                onClear
            }}
        >
            {props.children}
        </CartContext.Provider>
    );
}
