import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../store/cart-context';
import { ModalContext } from '../../store/modal-context';
import classes from '../../styles/Buttons.module.css';
import CartIcon from '../../assets/icons/CartIcon';
import Button from '../UI/Button';

export default function HeaderCartButton() {
    const [btnBumps, setBtnBumps] = useState(false),
        cartctx = useContext(CartContext),
        items = cartctx.cartItems,
        modalctx = useContext(ModalContext);

    useEffect(() => {
        if (items.lengt === 0) {
            return;
        }
        setBtnBumps(true);
        const timer = setTimeout(() => {
            setBtnBumps(false);
        }, 300);
        return () => clearTimeout(timer);
    }, [items]);

    return (
        <Button
            className={btnBumps ? classes.bump : ''}
            onClick={modalctx.handleMount}
        >
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your cart</span>
            <span className={classes.badge}>{cartctx.totalItems()}</span>
        </Button>
    );
}
