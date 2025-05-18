import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const location = useLocation();
  const currentLocation = location.pathname;

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <Link
            to={'/'}
            className={clsx(
              styles.link,
              currentLocation === '/'
                ? [styles.link_active, styles.link]
                : styles.link
            )}
          >
            <BurgerIcon type={'primary'} />
            <p className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </p>
          </Link>
          <Link
            to={'/feed'}
            className={clsx(
              styles.link,
              currentLocation === '/feed'
                ? [styles.link_active, styles.link]
                : styles.link
            )}
          >
            <ListIcon type={'primary'} />
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </Link>
        </div>
        <div className={styles.logo}>
          <Logo className='' />
        </div>
        <Link
          to={'/profile'}
          className={clsx(
            styles.link,
            styles.link_position_last,
            currentLocation === '/profile'
              ? [styles.link_active, styles.link]
              : styles.link
          )}
        >
          <ProfileIcon type={'primary'} />
          <p className='text text_type_main-default ml-2'>
            {userName || 'Личный кабинет'}
          </p>
        </Link>
      </nav>
    </header>
  );
};
