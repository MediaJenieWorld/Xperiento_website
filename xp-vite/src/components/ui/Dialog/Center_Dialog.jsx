import { Fragment, useState } from "react";
import styles from "./Center.module.scss";
import PropTypes from "prop-types";

const Custom_Centered_DynamicDialog = ({
  modelHeight,
  modelWidth,
  label = "button",
  children,
  LabelChildren,
  boxStyles = {},
  dialogStyles = {}
}) => {
  modelHeight = modelHeight || "max-content";
  modelWidth = modelWidth || "max-content";
  const [checked, setChecked] = useState(false);

  const toggleMenu = (e) => {
    e.stopPropagation()
    setChecked((pre) => !pre);
  };

  return (
    <Fragment>
      <div
        style={{ ...dialogStyles }}
        className={`${styles.Insight_dialog} ${checked ? styles.active : styles.close
          }`}
      >
        <span onClick={toggleMenu} className={styles.closeBtn}>
          X
        </span>
        <label onClick={toggleMenu} className={styles.box}>
          {LabelChildren ? <LabelChildren /> : label}
        </label>
        <label
          onClick={toggleMenu}
          className={`${styles.closeLayer} ${styles.label}`}
        ></label>
        <div
          className={styles.menuBox}
          style={{
            "--pop-up-menu-height": modelHeight,
            "--pop-up-menu-width": modelWidth,
            ...boxStyles
          }}
        >
          {children}
        </div>
      </div>
    </Fragment>
  );
};

Custom_Centered_DynamicDialog.props = {
  unqiueKey: PropTypes.string.isRequired,
  modelHeight: PropTypes.string.isRequired,
  modelWidth: PropTypes.string.isRequired,
};
export default Custom_Centered_DynamicDialog;
