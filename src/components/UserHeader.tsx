type UserHeaderProps = {
  handleShowColors: () => void;
  handleSortedByCountry: () => void;
  resetUsersState: () => void;
  handleChangeInput: (value: string) => void;
};

export function UserHeader({
  handleShowColors,
  handleSortedByCountry,
  resetUsersState,
  handleChangeInput,
}: UserHeaderProps) {
  return (
    <header
      style={{
        marginBottom: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1 style={{ fontWeight: 'bold' }}>Prueba Técnina</h1>

      <div style={{ display: 'flex' }}>
        <button onClick={handleShowColors}>Colorear filas</button>
        <button onClick={handleSortedByCountry}>Filtrar países</button>
        <button onClick={resetUsersState}>Resetear usuarios</button>

        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            placeholder="Buscar por país"
            onChange={(e) => {
              handleChangeInput(e.target.value);
            }}
          />
        </form>
      </div>
    </header>
  );
}
