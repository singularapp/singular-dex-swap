import { useRef, useState } from "react";
import { Menu } from "@headlessui/react";
import ModalWithPortal from "../Modal/ModalWithPortal";
import { t } from "@lingui/macro";
import "./LanguageDropdown.css";
import { defaultLocale, dynamicActivate, isTestLanguage, locales } from "lib/i18n";
import { LANGUAGE_LOCALSTORAGE_KEY } from "config/localStorage";
import { LanguageModalContent } from "./LanguageModalContent";
import { importImage } from "lib/legacy";
import checkedIcon from "img/ic_checked.svg";

export function LanguageDropdown(props) {
  const currentLanguage = useRef(localStorage.getItem(LANGUAGE_LOCALSTORAGE_KEY) || defaultLocale);
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

  const [showLanguageModal, setShowLanguageModal] = useState(false);

  return (
    <>
      {props.small ? (
        <div className="App-header-language" onClick={() => setShowLanguageModal(true)}>
          <div className="language-dropdown">
            <NavIcons currentLanguage={currentLanguage} />
          </div>
        </div>
      ) : (
        <DesktopDropdown
          currentLanguage={selectedLanguage}
          onChangeLanguage={(lang) => {
            setSelectedLanguage({
              current: lang,
            });
          }}
          {...props}
        />
      )}
      <ModalWithPortal
        className="language-popup"
        isVisible={showLanguageModal}
        setIsVisible={() => setShowLanguageModal(false)}
        label={t`Select Language`}
      >
        <LanguageModalContent currentLanguage={currentLanguage} />
      </ModalWithPortal>
    </>
  );
}

function NavIcons({ currentLanguage }) {
  const image = importImage(`flag_${currentLanguage.current}.svg`);
  return (
    <button className="transparent">
      <img className="language-dropdown-icon" src={image} alt={locales[currentLanguage.current]} />
      <span className="language-dropdown-label">{locales[currentLanguage.current]}</span>
    </button>
  );
}

function DesktopDropdown({ currentLanguage, onChangeLanguage }) {
  return (
    <div className="App-header-language">
      <Menu>
        <Menu.Button as="div" className="language-dropdown">
          <NavIcons currentLanguage={currentLanguage} />
        </Menu.Button>
        <Menu.Items as="div" className="menu-items language-dropdown-items">
          <div className="language-dropdown-list">
            <LanguageMenuItems currentLanguage={currentLanguage} onChangeLanguage={onChangeLanguage} />
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
}

function LanguageMenuItems({ currentLanguage, onChangeLanguage }) {
  return (
    <>
      {Object.keys(locales).map((item) => {
        if (isTestLanguage(item)) return null;
        const image = importImage(`flag_${item}.svg`);

        return (
          <Menu.Item key={item}>
            <div
              className="language-dropdown-menu-item menu-item"
              onClick={() => {
                localStorage.setItem(LANGUAGE_LOCALSTORAGE_KEY, item);
                dynamicActivate(item);
                onChangeLanguage(item);
              }}
            >
              <div className="menu-item-group">
                <div className="menu-item-icon">
                  <img className="network-dropdown-icon" src={image} alt={locales[item]} />
                </div>
                <span className="language-dropdown-item-label">{locales[item]}</span>
              </div>
              <div className="network-dropdown-menu-item-img">
                {currentLanguage.current === item && <img src={checkedIcon} alt={locales[item]} />}
              </div>
            </div>
          </Menu.Item>
        );
      })}
    </>
  );
}

export default LanguageDropdown;
