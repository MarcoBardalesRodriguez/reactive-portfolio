import React, { useState } from 'react'
import '../styles/HomeContent.scss'
// import Styles from '../styles.HomeContent.scss'
import Me from './Me'
import Projects from './Projects'

const Button = ({ label, onClick }) => (
  <button className='button-option' onClick={onClick}>{label}</button>
)

const Component1 = () => <Me />
const Component2 = () => <Projects />
const Component3 = () => <div>Vista de habilidades</div>
const Component4 = () => <div>Formulario de contacto</div>

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
        <Button label="Contacto" onClick={() => handleClick(<Component4 />)} />
        <button className='button-option'><a href="https://blog.marcobardalesrodriguez.site">Blog</a></button>
      </div>
      <div className='content'>
        {activeComponent}
      </div>
    </div>
  )
}