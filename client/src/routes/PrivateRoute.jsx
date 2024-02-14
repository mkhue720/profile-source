import {useContext} from 'react'
import { authContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
const PrivateRoute = ({children, allowedRoles}) => {
    const {token, role} = useContext(authContext)
    const isAllowed = allowedRoles.includes(role)
    const accessibleRoute = token && isAllowed ? children : <Navigate to='/home' replace={true} />
  return accessibleRoute
}

export default PrivateRoute