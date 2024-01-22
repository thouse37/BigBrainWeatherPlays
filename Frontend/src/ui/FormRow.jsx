import Button from "./Button.jsx";

function FormRow({
  label,
  name,
  register,
  errors,
  onSubmit,
  children,
  type = "text",
}) {
  return (
    <form onSubmit={onSubmit} className="mb-6">
      <div className="flex justify-between items-center">
        <label className="text-blue-300">{label}</label>
        <input
          name={name}
          {...register(name, {
            required: `You must specify a ${label.toLowerCase()}`,
            // Add other validation rules here if needed
          })}
          type={type}
          placeholder={`New ${label}`}
          className="text-blue-300 bg-blue-950 border border-blue-400 rounded w-3/4"
        />
        <Button type="submit">Change</Button>
        {errors && <p>{errors.message}</p>}
      </div>
      {children}
    </form>
  );
}

export default FormRow;
