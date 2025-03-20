import { IMAGES } from '@/constant/images'
import Image from 'next/image'
import React from 'react'
import Input from '../input/Input'
import Button from '../button/Button'
import { FaArrowRight, FaLink } from 'react-icons/fa'

export default function ButtonInput() {
  return (
    <div className='flex items-center justify-between border-4 border-[#353C4A] rounded-full bg-[#181E29] text-center h-[68px] w-[85%] md:w-[640px]'>
      <div className='flex items-center'>
      <div className='ml-5' >
      <Image src={IMAGES.LINK} alt="Link"/>
      </div>
      <div className='mt-3'>
        <Input type='text' placeholder='Enter the Link Here' border="none" className='bg-none bg-transparent '/>
      </div>
      </div>
      {/* <div className="block md:hidden">
        <Image src={IMAGES.SHORTENBTN} alt="Rounded Icon" className=" rounded-full" />
      </div> */}
       <div className="block md:hidden">
        <div className="bg-buttonColor p-5 mr-[2px] rounded-full flex items-center justify-center">
          <FaArrowRight className="text-white text-lg" /> {/* Another icon instead of image */}
        </div>
      </div>
      <div className="hidden md:block" >
        <Button title="Shorten Now!" className="text-white text-[16px] font-semibold  hover:bg-gray-500 bg-buttonColor px-12 py-4 mr-[2px] rounded-full "/>
      </div>
    </div>
  )
}
