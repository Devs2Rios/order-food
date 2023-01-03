import { useContext } from 'react';
import { CartContext } from '../../store/cart-context';
import { ModalContext } from '../../store/modal-context';
import classes from '../../styles/Buttons.module.css';
import CartIcon from '../../assets/icons/CartIcon';
import Button from '../UI/Button';

export default function HeaderCartButton() {
    const cartctx = useContext(CartContext),
        modalctx = useContext(ModalContext);
    return (
        <Button onClick={modalctx.handleMount}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your cart</span>
            <span className={classes.badge}>{cartctx.cartItems.length}</span>
        </Button>
    );
}
