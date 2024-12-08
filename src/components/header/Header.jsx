import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { LINKS } from '../../static'
import logo from '../../assets/logo.png'

const Header = () => {
  const {pathname} = useLocation()
  return (
      <div className='sticky top-0 left-0 z-50 bg-white'>
          <header id='header' className='py-1 border-b-2'>
            <nav className='flex flex-wrap justify-between gap-4 p-4 container'>
              <img src={logo} alt="logo" />
              <div className='flex flex-wrap gap-7 text-[18px]'>
                {
                  LINKS?.map((link)=> (
                    <NavLink key={link.id} className='text-slate-800 flex items-center gap-1' to={link.path}>
                      {link.icon}
                      <span>{link.name}</span>
                    </NavLink>
                  ))
                }
              </div>
            </nav>
          </header>
      </div>
  )
}

export default Header