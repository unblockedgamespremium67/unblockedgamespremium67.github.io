"use client";

import styles from './PrivacyBox.module.scss';
import useSite from 'hooks/use-site';
import Button from 'components/Button';
import { useEffect } from 'react';

const PrivacyBox = () => {
  const { setisPrivacyOpen } = useSite();
  let classes = styles.PrivacyBox;

  function acceptPrivacy() {
    setisPrivacyOpen(false);
    localStorage.setItem("privacy", 'accepted');
  }

  function declinePrivacy() {
    setisPrivacyOpen(true);
    localStorage.setItem("privacy", 'declined');
  }

  useEffect(() => {
    const storage = localStorage.getItem("privacy");

    if (storage === 'accepted') {
      setisPrivacyOpen(false);
    } else {
      setisPrivacyOpen(true);
    }
  }, [setisPrivacyOpen]);

  return (
    <div className={classes}>
      <div className={styles.PrivacyBoxInner}>
        <div className={styles.PrivacyBoxContent}>
          <p>We use cookies on our site to enhance your experience. Cookies are small files that help the site remember your preferences. We use essential, analytical, functional, and advertising cookies.</p>        
        </div>
        <div className={styles.PrivacyBoxLinks}>
          <Button 
            className="btn btn--accent btn--xs"
            onClick={() => acceptPrivacy()}
          >
            Accept
          </Button>
          <Button 
            className="btn btn--primary btn--xs"
            onClick={() => declinePrivacy()}
          >
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyBox;
