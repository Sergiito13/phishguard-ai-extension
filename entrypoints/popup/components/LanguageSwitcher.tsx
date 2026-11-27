import { useEffect, useRef, useState } from 'react';
import { Check } from 'iconoir-react';
import { useTranslation } from 'react-i18next';

import { SUPPORTED_LANGUAGES } from '../../../i18n/languages';

import '../LanguageSwitcher.css';

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // ==========================================
  // CURRENT LANGUAGE
  // ==========================================

  const currentCode =
    i18n.resolvedLanguage?.split('-')[0] ?? 'en';

  const current =
    SUPPORTED_LANGUAGES.find(
      (language) => language.code === currentCode,
    ) ?? SUPPORTED_LANGUAGES[1];

  // ==========================================
  // CLOSE DROPDOWN
  // ==========================================

  useEffect(() => {
    if (!open) return;

    function handleOutsideClick(event: PointerEvent) {
      if (
        rootRef.current &&
        !rootRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    document.addEventListener('pointerdown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener(
        'pointerdown',
        handleOutsideClick,
      );
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  // ==========================================
  // CHANGE LANGUAGE
  // ==========================================

  async function changeLanguage(language: string) {
    await i18n.changeLanguage(language);
    setOpen(false);
  }

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="language-switcher" ref={rootRef}>
      <button
        type="button"
        className="language-switcher__button"
        aria-label={`${t('header.selectLanguage')}: ${current.name}`}
        title={t('header.selectLanguage')}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="phishguard-language-menu"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="language-switcher__flag-wrapper">
          <img
            src={current.flag}
            alt=""
            className="language-switcher__button-flag"
          />

          <span
            className="language-switcher__code"
            aria-hidden="true"
          >
            {current.shortName}
          </span>
        </span>
      </button>

      {open && (
        <div
          id="phishguard-language-menu"
          className="language-switcher__menu"
          role="group"
          aria-label={t('header.selectLanguage')}
        >
          {SUPPORTED_LANGUAGES.map((language) => {
            const selected = language.code === current.code;

            return (
              <button
                key={language.code}
                type="button"
                lang={language.code}
                className={`language-switcher__option${
                  selected
                    ? ' language-switcher__option--active'
                    : ''
                }`}
                aria-pressed={selected}
                onClick={() => {
                  void changeLanguage(language.code);
                }}
              >
                <img
                  src={language.flag}
                  alt=""
                  className="language-switcher__flag"
                />

                <span>{language.name}</span>

                {selected && (
                  <Check
                    width={15}
                    height={15}
                    strokeWidth={2}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
