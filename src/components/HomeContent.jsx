import React, { useState } from 'react'
// import '../styles/HomeContent.scss'
import Me from './Me'
import Projects from './Projects'
import Skills from './Skills'

const Button = ({ label, onClick }) => (
  <button className='button-option' onClick={onClick}>{label}</button>
)

const Component1 = () => <Me />
const Component2 = () => <Projects />
const Component3 = () => <Skills />

export default function HomeContent() {
  const [activeComponent, setActiveComponent] = useState(<Component1 />)

  const handleClick = (component) => {
    setActiveComponent(component)
  }

  return (
    <div className='container'>
      <div className='buttons'>
        <Button label="Sobre mí" onClick={() => handleClick(<Component1 />)} />
        <Button label="Proyectos" onClick={() => handleClick(<Component2 />)} />
        <Button label="Habilidades" onClick={() => handleClick(<Component3 />)} />
        <button className='button-option'><a href="https://blog.apps.marcobardalesrodriguez.site" target="_blank">Blog</a></button>
      </div>
      <div className='content'>
        {activeComponent}
      </div>
    </div>
  )
}