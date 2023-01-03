import { useContext } from 'react';
import classes from '../../styles/Cart.module.css';
import { ModalContext } from '../../store/modal-context';
import { CartContext } from '../../store/cart-context';
import Modal from '../UI/Modal';

export default function Cart() {
    const modalctx = useContext(ModalContext),
        cartctx = useContext(CartContext),
        cartItems = (
            <ul className={classes['cart-items']}>
                {cartctx.cartItems.map(item => (
                    <li>{item.name}</li>
                ))}
            </ul>
        ),
        totalAmount = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(cartctx.total());
    return (
        <Modal>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button
                    className={classes['button--alt']}
                    onClick={modalctx.handleMount}
                >
                    Close
                </button>
                <button className={classes.button}>Order</button>
            </div>
        </Modal>
    );
}
