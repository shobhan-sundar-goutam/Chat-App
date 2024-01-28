import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const PasswordInput = (props) => {
  const [isVisible, setVisible] = useState(false);

  const toggle = () => {
    setVisible((prev) => !prev);
  };

  return (
    <div className='relative'>
      <input type={!isVisible ? 'password' : 'text'} {...props} required />

      <span
        className='cursor-pointer absolute right-5 top-3 hover:text-primary'
        onClick={toggle}
      >
        {isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
      </span>
    </div>
  );
};

export default PasswordInput;
