import { useRef, useState } from 'react';
import classes from '../../styles/MealItemForm.module.css';
import inputClasses from '../../styles/Input.module.css';
import Input from '../UI/Input';

export default function MealItemForm(props) {
    const [amount, setAmount] = useState(1),
        amountRef = useRef(1),
        handleAmount = e => {
            setAmount(e.target.value);
        },
        handleSubmit = e => {
            e.preventDefault();
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
