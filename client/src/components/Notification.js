import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector( state => state.notification)
    
    if (notification) {
        return (
            <div className='d-flex justify-content-center align-items-center' style={{position: "absolute", bottom: "15px", width: "100%"}}>
                {notification.type === "error" ? 
                    <div className='alert alert-danger'>
                        <i className="fa-solid fa-triangle-exclamation"></i>
                        {notification.message}
                    </div> 
                    :
                    <div className='alert alert-success'>
                        <i className="fa-solid fa-circle-check"></i>
                        {notification.message}
                    </div>
                }
            </div>
        )
    } else return ""
}

export default Notification