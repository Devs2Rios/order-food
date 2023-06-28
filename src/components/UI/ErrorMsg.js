import classes from '../../styles/ErrorMsg.module.css';

export default function ErrorMsg({ message }) {
    return <p className={classes.error}>{message}</p>
}