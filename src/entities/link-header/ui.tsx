import React from "react";
import { Link } from "react-router-dom";
import LinkProps from "./model";

const LinkToPage: React.FC<LinkProps> = ({ title, address }) => {
  return <Link to={address}>{title}</Link>;
};
export default LinkToPage;
