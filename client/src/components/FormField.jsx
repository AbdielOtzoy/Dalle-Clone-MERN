
const FormField = ({ labelName, type, name, placeholder, value, handleChange, isSupriseMe, handleSurpriseMe }) => {
  return (
    <div>
      <div className=" flex items-center gap-2 mb-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-slate-900"
        >
          {labelName}
        </label>
        {isSupriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="inline-flex items-center px-3 py-2.5  border border-transparent text-xs font-medium rounded shadow-sm text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 mb-2"
          >
            Surprise Me
          </button>
        )}
      </div>
      <input 
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3"
      />
    </div>
  )
}

export default FormField