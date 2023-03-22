import { configureStore } from '@reduxjs/toolkit'
import AlertSlice from './Features/Alert/AlertSlice'
import PublicationSlice from './Features/Publication/PublicationSlice'
import CreateSlice from './Features/CreateNext/CreateSlice'
import ConfirmSlice from './Features/Confirmation/ConfirmSlice'
import UsersSlice from './Features/Users/UsersSlice'
import ProfileSlice from "./Features/Profile/ProfileSlice";
import FeedBackSlice from "./Features/Feedback/FeedBackSlice";

export default configureStore({
    reducer: {
        alert:AlertSlice,
        publication:PublicationSlice,
        next: CreateSlice,
        confirm: ConfirmSlice,
        users: UsersSlice,
        Profile: ProfileSlice,
        feedback: FeedBackSlice
    },
})