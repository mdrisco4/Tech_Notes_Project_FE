import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"
    
const USER_REGEX = /^[A-z]{2, 20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4, 12}$/

    const NewUserForm = () => {

        const [addNewUser, {
            isLoading,
            isSuccess,
            isError,
            error
        }] = useAddNewUserMutation()

        const navigate = useNavigate()

        const [username, setUsername] = useState('')
        const [validUsername, setvalidUsername] = useState(false)
        const [password, setPassword] = useState('')
        const [validPassword, setvalidPassword] = useState(false)
        const [roles, setRoles] = useState(["Employee"])

        useEffect(() => {
            setvalidUsername(USER_REGEX.test(username))
        }, [username])

        useEffect(() => {
            setvalidPassword(PWD_REGEX.test(password))
        }, [password])

        useEffect(() => {
            if (isSuccess) {
                setUsername('')
                setPassword('')
                setRoles([])
                navigate('/dash/users')
            }
        }, [isSuccess, navigate])

    const onUserNameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

const onRolesChanged = e => {
    const values = Array.from(
        e.target.selectedOptions, //HTML Collection
        (option) = option.value
    )
    setRoles(values)
}

const canSave = [roles.length, validUsername, validPassword.every(Boolean) && !isLoading]

const onSaveUserClicked = async (e) => {
    e.preventDefault()
    if (canSave) {
        await addNewUser({ username, password, roles })
    }
}

    return (
        <div>NewUserForm</div>
    )
}
export default NewUserForm