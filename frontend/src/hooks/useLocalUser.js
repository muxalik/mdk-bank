import { useState } from "react";

const useLocalUser = () => {
    const localUser = JSON.parse(localStorage.getItem('user'))
    const [user, setUser] = useState(localUser)

    const setLocalUser = user => {
        localStorage.setItem('user', JSON.stringify(user))
        setUser(user)
    }

    return [user, setLocalUser]
}

export default useLocalUser