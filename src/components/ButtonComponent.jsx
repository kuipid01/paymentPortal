import { Button } from 'react-bootstrap';

const ButtonComponent = ({ children, onClick, type, color, size, className, disabled }) => {
  return (
    <button
      id={color}
      onClick={onClick}
      type={type}
      className={`w-full bg-blue-700 text-white p-2 rounded-md ${
        size === 'large' ? 'text-lg' : 'text-base'
      } ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'} focus:outline-none focus:ring focus:border-blue-300`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;