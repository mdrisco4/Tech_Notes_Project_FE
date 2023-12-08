import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectNoteById } from "./notesApiSlice"
import { selectAllUsers } from "../users/usersApiSlice"
import EditNoteForm from "./EditNoteForm"

const EditNote = () => {
    return (
        <div>EditNote</div>
    )
}
export default EditNote