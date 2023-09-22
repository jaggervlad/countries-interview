import { useMemo, useState } from 'react';
import { UserHeader } from './components/UserHeader';
import { UserTable } from './components/UserTable';
import { useGetUsers } from './hooks/useGetUsers';
import { SortBy, type User } from './types.d';

function App() {
  const { users, resetUsersState, handleDeleteUser } = useGetUsers();
  const [showColors, setShowColors] = useState<boolean>(false);
  const [sortBy, setsortBy] = useState<SortBy>(SortBy.NONE);
  const [queryCountry, setQueryCountry] = useState('');

  const filteredUsers = useMemo(() => {
    return queryCountry && queryCountry !== ''
      ? users.filter((u) =>
          u.location.country.toLowerCase().includes(queryCountry.toLowerCase())
        )
      : users;
  }, [queryCountry, users]);

  const sortedUsers = useMemo(() => {
    const properties: Record<string, (user: User) => string> = {
      [SortBy.COUNTRY]: (user) => user.location.country,
      [SortBy.NAME]: (user) => user.name.first,
      [SortBy.LAST]: (user) => user.name.last,
    };

    if (sortBy === SortBy.NONE) return filteredUsers;

    return [...filteredUsers].sort((a, b) => {
      const extractPropertie = properties[sortBy];
      return extractPropertie(a).localeCompare(extractPropertie(b));
    });
  }, [filteredUsers, sortBy]);

  const handleShowColors = () => {
    setShowColors((prev) => !prev);
  };
  const handleSortedByCountry = () => {
    setsortBy(SortBy.COUNTRY);
  };

  const handleChangeInput = (value: string) => {
    setQueryCountry(value);
  };

  return (
    <main>
      <UserHeader
        handleShowColors={handleShowColors}
        handleSortedByCountry={handleSortedByCountry}
        resetUsersState={resetUsersState}
        handleChangeInput={handleChangeInput}
      />

      <section>
        <UserTable
          users={sortedUsers}
          showColors={showColors}
          handleDeleteUser={handleDeleteUser}
          handleSortBy={(sortBy) => {
            setsortBy(sortBy);
          }}
        />
      </section>
    </main>
  );
}

export default App;
