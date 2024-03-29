import React, { useState } from 'react'
import styles from './Admin.module.scss'
import { Outlet, Link } from 'react-router-dom'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

export default function Admin() {
  const [sidebarWidth, setSidebarWidth] = useState(
    JSON.parse(localStorage.getItem('sidebar')) ?? true
  )

  const handleSidebar = () => {
    setSidebarWidth(!sidebarWidth)
    localStorage.setItem('sidebar', JSON.stringify(!sidebarWidth))
  }

  const buttonsInfo = [
    {
      text: 'Заведение',
      icon: <RestaurantMenuIcon color="white" sx={{ fontSize: 35 }} />,
      link: 'main',
    },
    {
      text: 'Меню',
      icon: <MenuBookIcon color="white" sx={{ fontSize: 35 }} />,
      link: 'menu',
    },
    { text: 'Столы', icon: <TableRestaurantIcon sx={{ fontSize: 35 }} /> },
    { text: 'Заказы', icon: <BorderColorIcon sx={{ fontSize: 35 }} /> },
  ]

  return (
    <div className={styles.parent}>
      <div className={sidebarWidth ? styles.section1 : styles.sectionMini}>
        <div className="d-flex flex-column mt-5">
          <img
            src="/img/transparent_logo.png"
            className={styles.logo}
            alt="img"
          />
          {buttonsInfo.map(({ text, icon, link }, index) => (
            <Link
              key={index}
              to={link}
              className={`${styles.buttons} text-start btn buttons my-1`}
            >
              {sidebarWidth ? (
                <span className="ms-3">{text}</span>
              ) : (
                <React.Fragment>{icon}</React.Fragment>
              )}
            </Link>
          ))}
        </div>
        <div className={styles.arrow}>
          {sidebarWidth ? (
            <ArrowBackIosIcon onClick={handleSidebar} sx={{ color: 'white' }} />
          ) : (
            <ArrowForwardIosIcon
              onClick={handleSidebar}
              sx={{ color: 'white' }}
            />
          )}
        </div>
      </div>
      <Outlet />
    </div>
  )
}
