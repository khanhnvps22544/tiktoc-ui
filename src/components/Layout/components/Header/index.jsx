import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleQuestion,
  faCircleXmark,
  faCloudUpload,
  faCoins,
  faEllipsisVertical,
  faGear,
  faKeyboard,
  faLanguage,
  faMagnifyingGlass,
  faSignOut,
  faSpinner,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import Button from '~/components/Button';
import images from '~/assets/images';
import styles from './Header.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import Menu from '~/components/Popper/Menu';
import { MessagesIcon, InboxIcon, UploadIcon, SearchIcon } from '~/components/Icons';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faLanguage} />,
    title: 'English',
    children: {
      title: 'Language',
      data: [
        {
          type: 'language',
          code: 'en',
          title: 'English',
        },
        {
          type: 'language',
          code: 'vi',
          title: 'Tiếng Việt',
        },
      ],
    },
  },
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    title: 'Feedback and help',
    to: '/feedback',
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard} />,
    title: 'Keyboard shortcuts',
  },
];

function Header() {
  const [searchResult, setSearchResult] = useState([]);
  const currentUser = true;

  useEffect(() => {
    setTimeout(() => {
      setSearchResult([1, 2, 3]);
    }, 2000);
  }, []);

  //Handle logic
  const handleMenuChange = (menuItem) => {
    console.log(menuItem);
  };

  const userMenu = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: 'View profile',
      to: '/@khanh',
    },
    {
      icon: <FontAwesomeIcon icon={faCoins} />,
      title: 'Get coins',
      to: '/coin',
    },
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: 'Settings',
      to: '/settings',
    },
    ...MENU_ITEMS,
    {
      icon: <FontAwesomeIcon icon={faSignOut} />,
      title: 'Log out',
      to: '/logout',
      separate: true,
    },
  ];

  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('logo')}>
          <img src={images.logo} alt="test" />
        </div>
        <div>
          <HeadlessTippy
            interactive
            visible={searchResult.length > 0}
            render={(attrs) => (
              <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                <PopperWrapper>
                  <h4 className={cx('search-title')}>Accounts</h4>
                  <AccountItem />
                  <AccountItem />
                  <AccountItem />
                </PopperWrapper>
              </div>
            )}
          >
            <div className={cx('search')}>
              <input type="text" placeholder="Search..." spellCheck={false} />
              <button className={cx('clear')}>
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
              {/* Loading */}
              <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
              <button className={cx('search-btn')}>
                <SearchIcon />
              </button>
            </div>
          </HeadlessTippy>
        </div>
        <div className={cx('actions')}>
          {currentUser ? (
            <>
              <Button className={cx('action-btn')} text leftIcon={<UploadIcon />}>
                Upload
              </Button>
              <Tippy delay={[0, 200]} content="Messages" placement="bottom">
                <div className={cx('message-btn')}>
                  <MessagesIcon />
                </div>
              </Tippy>
              <Tippy delay={[0, 200]} content="Inbox" placement="bottom">
                <div className={cx('inbox-btn')}>
                  <span className={cx('inbox-icon')}>1</span>
                  <InboxIcon />
                </div>
              </Tippy>
            </>
          ) : (
            <>
              <Button text leftIcon={<UploadIcon />}>
                Upload
              </Button>
              <Button primary>Log in</Button>
            </>
          )}
          <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
            {currentUser ? (
              <Image
                className={cx('user-avatar')}
                src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/f2d8cc8a11412a34b11b671541fbf9d9~c5_100x100.jpeg?x-expires=1688576400&x-signature=tii2AgnknBZKD8rKA9A47pN7nE4%3D"
                alt=""
                // fallback="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tiktok-obj/1668778587889665.jpeg?x-expires=1688576400&x-signature=2wloPf%2FRmFAqVMtpiZzIYVVELms%3D"
              />
            ) : (
              <button className={cx('more-btn')}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            )}
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default Header;
