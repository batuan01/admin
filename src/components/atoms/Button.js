export const Button = ({ title, type, onClick, disabled, className }) => {
  return (
    <button
      className={"css_button " + ` ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export const ButtonModal = ({
  title,
  type,
  onClick,
  disabled,
  sizeSm,
  buttonLg,
  border,
  textBlack,
  className,
  icon,
}) => {
  return (
    <button
      className={
        "rounded-[4px] font-bold  leading-relaxed text-center flex justify-center items-center gap-2 " +
        `${buttonLg ? " p-[23px] h-[64px]" : " p-[12px] h-[40px]"}` +
        ` ${className}` +
        `${sizeSm ? " text-sm" : " text-base"}` +
        `${border ? " border border-white border-solid" : ""}` +
        " " +
        `${textBlack ? "text-black" : "text-white"}`
      }
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {icon} {title}
    </button>
  );
};

export const ButtonIcon = ({
  title,
  icon,
  type,
  onClick,
  disabled,
  className,
}) => {
  return (
    <button
      className={"css-button " + `${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="circle1"></span>
      <span className="circle2"></span>
      <span className="circle3"></span>
      <span className="circle4"></span>
      <span className="circle5"></span>
      <span className="text flex justify-center items-center gap-2">
        {icon} {title}
      </span>
    </button>
  );
};
