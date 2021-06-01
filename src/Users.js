import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import useAsync from './useAsync';
import User from './User'

// function reducer(state, action) {
//     switch (action.type) {
//         case 'LOADING':
//             return{
//                 loading: true,
//                 date: null,
//                 error: null,
//             };
//         case 'SUCCESS' :
//             return {
//                 loading: false,
//                 data: action.data,
//                 error:null
//             };
//         case 'ERROR' : 
//             return {
//                 loading: false,
//                 data: null,
//                 error: action.error
//             };
//         default:
//             throw new Error(`Unhandled action type: ${action.type}`);
//     }
// }

async function getUsers() {
    const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
    );
    return response.data;
}

function Users() {
    const [userId, setUserId] = useState(null);
    // const [state, dispatch] = useReducer(reducer, {
    //     loading: false,
    //     data: null,
    //     error: null
    // });

    const [state, refetch] = useAsync(getUsers, [], true);

    // const [users, setUsers] = useState(null);
    // const [loading, setLoading] = useState(null);
    // const [error, setError] = useState(null);

    // const fetchUsers = async () => {
    //     dispatch({type: 'LOADING'});
    //     try {
    //         // // 요청이 시작 할 때에는 error 와 users 를 초기화하고
    //         // setError(null);
    //         // setUsers(null);
    //         // //lading 상태를 true 로 바꿉니다.
    //         // setLoading(true);
    //         const response = await axios.get(
    //             'https://jsonplaceholder.typicode.com/users'
    //         );
    //         // setUsers(response.data);
    //         dispatch({ type: 'SUCCESS', data: response.data});
    //     } catch (e) {
    //         // setError(e);
    //         dispatch({ type: 'ERROR', error: e})
    //     }
    //     // setLoading(false);
    // }

    // useEffect(() => {
    //     fetchUsers();
    // },[]);

    const { loading, data: users, error } = state; // state.data 를 users 키워드로 조회

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!users) return <button onClick={refetch}>불러오기</button>;
    return (
        <>
            <ul>
                {users.map(user => (
                    <li
                        key={user.id}
                        onClick={() => setUserId(user.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        {user.username} ({user.name})
                    </li>
                ))}
            </ul>
            <button onClick={refetch}>다시 불러오기</button>
            {userId && <User id={userId} />}
        </>
    );
}

export default Users;