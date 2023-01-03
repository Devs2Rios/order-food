import { useContext } from 'react';
import { CartContext } from '../../store/cart-context';
import classes from '../../styles/CartItem.module.css';

export default function CartItem(props) {
    const cartctx = useContext(CartContext),
        price = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(props.price),
        handleLess = () => {
            if (cartctx.cartItems[props.id].amount - 1 === 0) {
                cartctx.onRemove(props.id);
            } else {
                cartctx.onSum(props.id, -1);
            }
        },
        handlePlus = () => {
            if (cartctx.cartItems[props.id].amount < 5) {
                cartctx.onSum(props.id, 1);
            }
        };

    return (
        <li className={classes['cart-item']}>
            <div>
                <h5>{props.name}</h5>
                <div className={classes.summary}>
                    <span className={classes.price}>{price}</span>
                    <span className={classes.amount}>x {props.amount}</span>
                </div>
            </div>
            <div className={classes.actions}>
                <button onClick={handleLess}>−</button>
                <button onClick={handlePlus}>+</button>
            </div>
        </li>
    );
}
