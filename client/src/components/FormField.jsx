import React from 'react'
import PropTypes from 'prop-types'


const FormField = ({ labelName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe }) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
          htmlFor={ name }
          className="block text-sm font-medium text-gray-900"
        >
          { labelName }
        </label>
        {isSurpriseMe && (
          <button 
            type="button"
            className="bg-[#ECECF1] text-black text-xs font-semibold py-1 px-2 rounded-[5px]"
            onClick={ handleSurpriseMe }
          >
            Surprise Me
          </button>
        )}
      </div>
      <input
        type={ type }
        id={ name }
        name={ name }
        placeholder={ placeholder }
        value={ value }
        onChange={ handleChange }
        required
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649FF] focus:border-[#4649FF] outline-none block w-full p-3"
      />
    </div>
  )
}

FormField.propTypes = {
  labelName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  isSurpriseMe: PropTypes.bool,
  handleSurpriseMe: PropTypes.func
}

export default FormField