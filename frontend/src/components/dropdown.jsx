export default function DropDown({ options, onChange }) {
  if (!options)
    return (
      <select className="dropdown">
        <option>Loading...</option>
      </select>
    );

  return (
    <select className="dropdown" onChange={onChange}>
      {options.map(({ tmdb_id, season_number }, i) => (
        <option key={tmdb_id} value={i}>
          Season {season_number}
        </option>
      ))}
    </select>
  );
}
