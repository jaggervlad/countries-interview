import { SortBy, type User } from '../types.d';

type UserTableProps = {
  users: User[];
  showColors: boolean;
  handleDeleteUser: (email: string) => void;
  handleSortBy: (sortBy: SortBy) => void;
};

export function UserTable({
  users,
  showColors,
  handleSortBy,
  handleDeleteUser,
}: UserTableProps) {
  return (
    <table className={showColors ? 'colored-rows' : ''}>
      <thead>
        <tr>
          <th>Foto</th>
          <th
            style={{ cursor: 'pointer' }}
            onClick={() => handleSortBy(SortBy.NAME)}
          >
            Nombre
          </th>
          <th
            style={{ cursor: 'pointer' }}
            onClick={() => handleSortBy(SortBy.LAST)}
          >
            Apellido
          </th>
          <th
            style={{ cursor: 'pointer' }}
            onClick={() => handleSortBy(SortBy.COUNTRY)}
          >
            País
          </th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {users.map((u) => (
          <tr key={u.email}>
            <td>
              <img src={u.picture.thumbnail} />
            </td>
            <td>{u.name.first}</td>
            <td>{u.name.last}</td>
            <td>{u.location.country}</td>
            <td>
              <button onClick={() => handleDeleteUser(u.email)}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
