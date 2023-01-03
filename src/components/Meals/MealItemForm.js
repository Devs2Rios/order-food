import { useRef, useState, useContext } from 'react';
import { toCamelCase } from '../../utils/util';
import { CartContext } from '../../store/cart-context';
import classes from '../../styles/MealItemForm.module.css';
import inputClasses from '../../styles/Input.module.css';
import Input from '../UI/Input';

export default function MealItemForm(props) {
    const cartctx = useContext(CartContext),
        [amount, setAmount] = useState(1),
        amountRef = useRef(1),
        handleAmount = e => {
            setAmount(+e.target.value);
        },
        handleSubmit = e => {
            e.preventDefault();
            const camelId = toCamelCase(props.name);
            if (
                cartctx.cartItems[camelId] &&
                cartctx.cartItems[camelId].amount + amount < 6
            ) {
                cartctx.onSum(camelId, amount);
            } else if (!cartctx.cartItems[camelId]) {
                cartctx.onAdd({
                    id: camelId,
                    name: props.name,
                    amount: amount,
                    price: props.price,
                });
            } else if (cartctx.cartItems[camelId].amount + amount > 5) {
                alert("You can't add more than 5 meals of each kind");
            } else {
                alert(`Something wrong happened!`);
            }
            setAmount(1);
        };
    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <Input
                id={`amount-${props.name.toLowerCase().replace(' ', '-')}`}
                label='Amount'
                ref={amountRef}
                onChange={handleAmount}
                input={{
                    type: 'number',
                    value: amount,
                    required: true,
                    min: 1,
                    max: 5,
                }}
            />
            <input className={inputClasses.input} type='submit' value='+ Add' />
        </form>
    );
}
