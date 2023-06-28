import classes from '../../styles/ErrorMsg.module.css';

export default function ErrorMsg({ className, message }) {
    return <p className={`${classes.error} ${className || ''}`.trim()}>{message}</p>
}