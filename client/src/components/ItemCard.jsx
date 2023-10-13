import React from "react";

const ItemCard = ({
  containerClass,
  imgClass,
  nameClass,
  shouldDisplayImg,
  imgSrc,
  icon,
  name,
}) => {
  return (
    <div className={containerClass}>
      {shouldDisplayImg && <img src={imgSrc} alt="" className={imgClass} />}
      {!shouldDisplayImg && <img src={icon} alt="" className={imgClass} />}
      <p className={nameClass}>{name}</p>
    </div>
  );
};

export default ItemCard;
