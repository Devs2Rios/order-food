import { useState } from 'react';
import classes from '../../styles/Buttons.module.css';
import CartIcon from '../../assets/icons/CartIcon';
import Button from '../UI/Button';

export default function HeaderCartButton() {
    const [items] = useState(0);
    return (
        <Button>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your cart</span>
            <span className={classes.badge}>{items}</span>
        </Button>
    );
}
