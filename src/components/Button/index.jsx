import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';
const cx = classNames.bind(styles);

function Button({
  className,
  to,
  href,
  primary = false,
  outline = false,
  round = false,
  text = false,
  small = false,
  large = false,
  disable = false,
  leftIcon,
  rightIcon,
  onClick,
  children,
  ...passProps
}) {
  let Comp = 'button';
  const props = {
    onClick,
    ...passProps,
  };
  if (disable) {
    delete props.onClick;
  }
  // another way
  // Remove event listener when btn is disable
  // if(disable){
  //   Object.keys(props).forEach((key)=>{
  //     if(key.startsWith('on') && typeof props[key] === 'function'){
  //       delete props[key]
  //     }
  //   })
  // }
  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = 'a';
  }
  const classes = cx('wrapper', {
    [className]: className,
    primary,
    outline,
    round,
    text,
    small,
    large,
    disable,
  });
  return (
    <Comp className={classes} {...props}>
      {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
      <span className={cx('title')}>{children}</span>
      {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
    </Comp>
  );
}

export default Button;
