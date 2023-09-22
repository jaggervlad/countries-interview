import { useEffect, useRef, useState } from 'react';
import { type User } from '../types.d';

export function useGetUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const originalUsers = useRef<User[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('https://randomuser.me/api/?results=100');
        const usersData = await res.json();

        setUsers(usersData.results);
        originalUsers.current = usersData.results;
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const resetUsersState = () => {
    setUsers(originalUsers.current);
  };

  const handleDeleteUser = (email: string) => {
    const newUsers = users.filter((u) => u.email !== email);
    setUsers(newUsers);
  };

  return { users, loading, resetUsersState, handleDeleteUser };
}
