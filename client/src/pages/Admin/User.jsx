import React, { useEffect, useState } from 'react';
import { BASE_URL, authToken } from '../../config.js';
import HashLoader from 'react-spinners/HashLoader.js';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { BiEdit, BiSolidTrash  } from "react-icons/bi";

const User = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingUserId, setEditingUserId] = useState(null);
    const [editedUserInfo, setEditedUserInfo] = useState({ // Add this line
        name: '',
        email: '',
        role: '',
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/users/`, {
                    headers: {
                        'Authorization': `Bearer ${authToken}`, 
                    },
                });

                if (response.status !== 200) {
                    throw new Error(response.data.message);
                }
                setUsers(response.data.data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
                setError('Failed to fetch users. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleEditUser = (userId) => {
        setEditingUserId(userId);
        const userToEdit = users.find(user => user._id === userId);
        setEditedUserInfo({
            name: userToEdit.name,
            email: userToEdit.email,
            role: userToEdit.role,
        });
    };

    const handleSaveEdit = async () => {
        try {
            const response = await axios.put(
                `${BASE_URL}/users/${editingUserId}`,
                editedUserInfo,
                {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                    },
                }
            );

            if (response.status !== 200) {
                throw new Error(response.data.message);
            }

            // Update the local state with the edited user information
            setUsers(prevUsers => prevUsers.map(user => {
                if (user._id === editingUserId) {
                    return { ...user, ...editedUserInfo };
                }
                return user;
            }));

            setEditingUserId(null);
            setEditedUserInfo({
                name: '',
                email: '',
                role: '',
            });
        } catch (error) {
            console.error('Failed to edit user:', error);
            setError('Failed to edit user. Please try again later.');
        }
    };

    
    const handleDeleteUser = async (userId) => {
        try {
            const response = await axios.delete(
                `${BASE_URL}/users/${userId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                    },
                }
            );

            if (response.status !== 200) {
                throw new Error(response.data.message);
            }

            // Remove the deleted user from the local state
            setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
        } catch (error) {
            console.error('Failed to delete user:', error);
            setError('Failed to delete user. Please try again later.');
        }
    };
    
    
    if (loading) {
        return (
            <div className="flex justify-center align-middle h-[100vh]">
                <HashLoader />
            </div>
        );
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            <Helmet>
                <title>Users | NMK</title>
            </Helmet>
            <div className="table-container w-[80%] overflow-x-auto">
                <table className='w-[100%] border-collapse mt-[20px]'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id.substring(0, 10)}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td><BiEdit onClick={() => handleEditUser(user._id)} /></td>
                                <td><BiSolidTrash onClick={() => handleDeleteUser(user._id)} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {editingUserId && (
                <div>
                    <label>Name:</label>
                    <input className='text-black'
                        type="text"
                        value={editedUserInfo.name}
                        onChange={(e) => setEditedUserInfo({ ...editedUserInfo, name: e.target.value })}
                    />
                    <label>Email:</label>
                    <input className='text-black'
                        type="text"
                        value={editedUserInfo.email}
                        onChange={(e) => setEditedUserInfo({ ...editedUserInfo, email: e.target.value })}
                    />
                    <label>Avatar:</label>
                    <input className='text-black'
                        type="text"
                        value={editedUserInfo.img}
                        onChange={(e) => setEditedUserInfo({ ...editedUserInfo, img: e.target.value })}
                    />
                    <label>Role:</label>
                    <input className='text-black'
                        type="text"
                        value={editedUserInfo.role}
                        onChange={(e) => setEditedUserInfo({ ...editedUserInfo, role: e.target.value })}
                    />
                    <button onClick={handleSaveEdit}>Save</button>
                </div>
            )}
        </>
    );
};

export default User;