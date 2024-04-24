function Button({ children, onclick, style }) {
    return (
        <button className={style} onClick={onclick}>
            {children}
        </button>
    )
}

export default Button
