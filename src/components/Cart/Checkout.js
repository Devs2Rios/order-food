import { useState, useRef } from 'react';
import classes from '../../styles/Checkout.module.css';
import ErrorMsg from '../UI/ErrorMsg';
import { validators } from '../../utils/validators';

export default function Checkout({ onClick }) {
    const [formError, setFormError] = useState(null),
        [inputsValidity, setInputsValidity] = useState({
            name: true,
            street: true,
            postal: true,
            city: true
        }),
        nameRef = useRef(''),
        streetRef = useRef(''),
        postalRef = useRef(''),
        cityRef = useRef(''),
        handleSubmit = (e) => {
            e.preventDefault();
            const
                name = nameRef.current.value,
                nameIsValid = validators.name.test(name),
                street = streetRef.current.value,
                streetIsValid = validators.street.test(street),
                postal = postalRef.current.value,
                postalIsValid = validators.postal.test(postal),
                city = cityRef.current.value,
                cityIsValid = validators.city.test(city);
            setInputsValidity({
                name: nameIsValid,
                street: streetIsValid,
                postal: postalIsValid,
                city: cityIsValid
            })
            if (nameIsValid && streetIsValid && postalIsValid && cityIsValid) {
                setFormError(null);
                onClick();
            } else {
                setFormError('There was an error with your submission');
            }
        };

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <div className={`${classes.control} ${inputsValidity.name ? '' : classes.invalid}`}>
                <label htmlFor='name'>Your Name</label>
                <input ref={nameRef} type='text' id='name' min={2} max={50} />
            </div>
            {!inputsValidity.name && <ErrorMsg className={classes['invalid-msg']} message='Please enter a valid name' />}
            <div className={`${classes.control} ${inputsValidity.street ? '' : classes.invalid}`}>
                <label htmlFor='street'>Street</label>
                <input ref={streetRef} type='text' id='street' min={2} max={50} />
            </div>
            {!inputsValidity.street && <ErrorMsg className={classes['invalid-msg']} message='Please enter a valid street' />}
            <div className={`${classes.control} ${inputsValidity.postal ? '' : classes.invalid}`}>
                <label htmlFor='postal'>Postal Code</label>
                <input ref={postalRef} type='text' id='postal' />
            </div>
            {!inputsValidity.postal && <ErrorMsg className={classes['invalid-msg']} message='Please enter a valid postal code (5 digits)' />}
            <div className={`${classes.control} ${inputsValidity.city ? '' : classes.invalid}`}>
                <label htmlFor='city'>City</label>
                <input ref={cityRef} type='text' id='city' min={2} max={50} />
            </div>
            {!inputsValidity.city && <ErrorMsg className={classes['invalid-msg']} message='Please enter a valid city' />}
            <div className={classes.actions}>
                <button onClick={onClick}>Cancel</button>
                <button type='submit'>Confirm</button>
            </div>
            {formError && <ErrorMsg message={formError} />}
        </form>
    )
}