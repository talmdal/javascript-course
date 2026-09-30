export const TextField = (props) => {
  const { label, type, value, onChange } = props
  return (
    <div>
      <label>
        { label }: &nbsp;
        <input
          type={ type }
          value={value}
          onChange={({ target }) => onChange(target.value)}
        />
      </label>
    </div>
  )
}
