import { InputProps } from '@/types/types'
import React from 'react'

export default function Input(props:InputProps) {
    const {type, placeholder, border, className, value, onChange} = props;
  return (
    
    <div className='w-full mb-4'>
        <input type={type} placeholder={placeholder} value={value} onChange={onChange}  className={`${className} ${border === 'none' ? 'border-none' : 'border border-[#353C4A]'} border-4 px-5 border-[#353C4A] rounded-full bg-[#181E29] h-[55px] placeholder:text-[#C9CED6] focus:outline-none text-white`}  />
    </div>
  )
}

