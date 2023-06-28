import classes from '../../styles/Checkout.module.css'

export default function Checkout({ onClick }) {
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('submit')
        onClick()
    }

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <div className={classes.control}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' min={2} max={50} pattern='[A-Za-z\.]+' />
            </div>
            <div className={classes.control}>
                <label htmlFor='street'>Your Name</label>
                <input type='text' id='street' min={2} max={50} pattern='[A-Za-z\.]+' />
            </div>
            <div className={classes.control}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' pattern='\d{5}' />
            </div>
            <div className={classes.control}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' min={2} max={50} pattern='[A-Za-z\.]+' />
            </div>
            <div className={classes.actions}>
                <button onClick={onClick}>Cancel</button>
                <button type='submit'>Confirm</button>
            </div>
        </form>
    )
}