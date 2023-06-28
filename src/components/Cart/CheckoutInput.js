import { forwardRef } from 'react';
import classes from '../../styles/Checkout.module.css';
import ErrorMsg from "../UI/ErrorMsg";

const CheckoutInput = forwardRef(function ({ id, label, isValid, invalidMessage }, ref) {
    return (
        <>
            <div className={`${classes.control} ${isValid ? '' : classes.invalid}`}>
                <label htmlFor={id}>{label}</label>
                <input ref={ref} type='text' id={id} />
            </div>
            {
                !isValid ?
                    <ErrorMsg className={classes['invalid-msg']} message={invalidMessage} />
                    : null
            }
        </>
    );
});

export default CheckoutInput;