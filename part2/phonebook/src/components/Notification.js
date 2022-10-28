const Notification = ({ message }) => {
    const notificationStyle = {
        color: 'steelblue',
        backgroundColor: 'lightgrey',
        borderRadius: 5,
        borderStyle: 'solid',
        borderColor: 'steelblue',
        padding: 5,
        margin: 5,
        fontSize: 30
    }

    if (message == null) {
        return null
    }

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification