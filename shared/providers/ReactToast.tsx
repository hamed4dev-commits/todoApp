import { ToastContainer } from "react-toastify"


const ReactToast = ({children}: {children: React.ReactNode}) => {
  return (
    <>
        {children}
        <ToastContainer/>
    </>
  )
}

export default ReactToast