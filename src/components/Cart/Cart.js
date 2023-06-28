import { useContext, useState } from 'react';
import classes from '../../styles/Cart.module.css';
import { ModalContext } from '../../store/modal-context';
import { CartContext } from '../../store/cart-context';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';

export default function Cart() {
    const modalctx = useContext(ModalContext),
        cartctx = useContext(CartContext),
        [isCheckout, setIsCheckout] = useState(false),
        hasItems = Boolean(Object.keys(cartctx.cartItems).length),
        cartItems = (
            <ul className={classes['cart-items']}>
                {Object.entries(cartctx.cartItems).map(([id, value]) => {
                    return <CartItem key={`cart-${id}`} id={id} {...value} />;
                })}
            </ul>
        ),
        handleOrder = () => {
            setIsCheckout(true);
        };
    return (
        <Modal>
            {
                isCheckout ? (
                    <Checkout onClick={() => { modalctx.handleMount(); setIsCheckout(false) }} />
                ) : (
                    <>
                        {cartItems}
                        <div className={classes.total}>
                            <span>Total Amount</span>
                            <span>{cartctx.totalPrice()}</span>
                        </div>
                        <div className={classes.actions}>
                            <button
                                className={classes['button--alt']}
                                onClick={modalctx.handleMount}
                            >
                                Close
                            </button>
                            {hasItems && <button className={classes.button} onClick={handleOrder}>Order</button>}
                        </div>
                    </>
                )
            }
        </Modal>
    );
}
