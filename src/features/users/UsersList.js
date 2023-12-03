import { userGetUsersQuery } from "./usersApiSlice"
import User from './User'

const UsersList = () => {

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = userGetUsersQuery()

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className={isError ? "errmsg" : "offscreen"}>{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids } = users

        const tableContent = ids?.length
            ? ids.map(userId => <User key={userId} userId={userId} />)
            : null

        content = (
            <table className="table table--users">
                <head className="table__thead">
                    <tr>
                        <th scope="col" className="table__th
                        user__username">Username</th>
                        <th scope="col" className="table__th
                        user__roles">Roles</th>
                        <th scope="col" className="table__th
                        user__edit">Edit</th>
                    </tr>
                </head>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }
    return (
        <h1>Users List</h1>
    )
}

export default UsersList