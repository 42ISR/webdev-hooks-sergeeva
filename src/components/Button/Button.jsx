const Button = ({children, ...props}) => {
    return (
        <button className="btn" {...props}>Add</button>
    )
}

export default Button