import "./header.scss";
import CustomRightDynamicDialog from "./Dialog/Right_Dialog";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Header = ({ auth }) => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <h1>Xperiento</h1>
        </Link>
      </div>
      {auth && (
        <div>
          <CustomRightDynamicDialog unqiueKey={"_header"} />
        </div>
      )}
    </header>
  );
};

export default Header;
