import { useState, useContext, useRef } from 'react';
import classes from '../../styles/Checkout.module.css';
import ErrorMsg from '../UI/ErrorMsg';
import CheckoutInput from './CheckoutInput';
import { CartContext } from '../../store/cart-context';
import { validators } from '../../utils/validators';
const { REACT_APP_DB_URL } = process.env;

export default function Checkout({ onClick }) {
    const cartCtx = useContext(CartContext),
        [formError, setFormError] = useState(null),
        [inputsValidity, setInputsValidity] = useState({
            name: true,
            street: true,
            postal: true,
            city: true
        }),
        [isSubmitting, setIsSubmitting] = useState(false),
        [didSubmit, setDidSubmit] = useState(false),
        nameRef = useRef(''),
        streetRef = useRef(''),
        postalRef = useRef(''),
        cityRef = useRef(''),
        handleSubmit = async (e) => {
            setIsSubmitting(true)
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
                try {
                    setFormError(null);
                    const request = await fetch(`${REACT_APP_DB_URL}orders.json`,
                        {
                            method: 'POST',
                            body: JSON.stringify({
                                articles: cartCtx.cartItems,
                                totalPrice: cartCtx.totalPrice(),
                                client: { name, street, postal, city }
                            })
                        }
                    )
                    if (!request.ok) {
                        throw new Error('Something went wrong');
                    }
                    cartCtx.onClear();
                    setDidSubmit(true);
                } catch (_) {
                    setFormError('There was an error with your request, reload the page and try again');
                }
            }
            setIsSubmitting(false);
        };

    return (
        <>
            {didSubmit ?
                (<div className={classes.success}>
                    <p>Order Confirmed!</p>
                    <button onClick={() => { setDidSubmit(false); onClick() }}>Close</button>
                </div>)
                :
                (<form className={classes.form} onSubmit={handleSubmit}>
                    <CheckoutInput
                        id='name'
                        label='Your Name'
                        isValid={inputsValidity.name}
                        invalidMessage='Please enter a valid name'
                        ref={nameRef}
                    />
                    <CheckoutInput
                        id='street'
                        label='Street'
                        isValid={inputsValidity.street}
                        invalidMessage='Please enter a valid street'
                        ref={streetRef}
                    />
                    <CheckoutInput
                        id='postal'
                        label='Postal Code'
                        isValid={inputsValidity.postal}
                        invalidMessage='Please enter a valid postal code (5 digits)'
                        ref={postalRef}
                    />
                    <CheckoutInput
                        id='city'
                        label='City'
                        isValid={inputsValidity.city}
                        invalidMessage='Please enter a valid city'
                        ref={cityRef}
                    />
                    <div className={classes.actions}>
                        {
                            isSubmitting
                                ? <button disabled={true}>Wait...</button> :
                                <>
                                    <button onClick={onClick}>Cancel</button>
                                    <button type='submit'>Confirm</button>
                                </>
                        }
                    </div>
                    {formError && <ErrorMsg message={formError} />}
                </form>)}
        </>
    )
}