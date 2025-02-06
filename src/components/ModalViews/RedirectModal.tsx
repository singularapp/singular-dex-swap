import { t, Trans } from "@lingui/macro";
import Button from "components/Button/Button";
import ExternalLink from "components/ExternalLink/ExternalLink";
import { useRedirectPopupTimestamp } from "lib/useRedirectPopupTimestamp";
import { userAnalytics } from "lib/userAnalytics";
import { LandingPageAgreementConfirmationEvent } from "lib/userAnalytics/types";
import Checkbox from "../Checkbox/Checkbox";
import Modal from "../Modal/Modal";
import "./RedirectModal.css";
import { DOCUMENT_LINKS, STATIC_LINKS } from "config/links";

export function RedirectPopupModal({
  redirectModalVisible,
  setRedirectModalVisible,
  appRedirectUrl,
  setShouldHideRedirectModal,
  shouldHideRedirectModal,
}) {
  const [, setRedirectPopupTimestamp] = useRedirectPopupTimestamp();
  const onClickAgree = () => {
    userAnalytics.pushEvent<LandingPageAgreementConfirmationEvent>({
      event: "LandingPageAction",
      data: {
        action: "AgreementConfirmationAgreeClick",
      },
    });

    if (shouldHideRedirectModal) {
      setRedirectPopupTimestamp(Date.now());
    }
  };

  return (
    <Modal
      className="RedirectModal"
      isVisible={redirectModalVisible}
      setIsVisible={setRedirectModalVisible}
      label={t`Launch App`}
    >
      <Trans>You are leaving dapp.singulardex.com and will be redirected to a third party, independent website.</Trans>
      <br />
      <br />
      <Trans>
        The website is a community deployed and maintained instance of the open source{" "}
        <ExternalLink href="https://github.com/singularapp/singular-dex-swap">GMX front end</ExternalLink>, hosted and served on
        the distributed, peer-to-peer <ExternalLink href="https://ipfs.io/">IPFS network</ExternalLink>.
      </Trans>
      <br />
      <br />
      <Trans>
        Alternative links can be found in the{" "}
        <ExternalLink href={DOCUMENT_LINKS.PerpetualsTrading}>docs</ExternalLink>.
        <br />
        <br />
        By clicking Agree you accept the <ExternalLink href={STATIC_LINKS.PrivacyPolicy}>
          T&Cs
        </ExternalLink>{" "}
        and <ExternalLink href={STATIC_LINKS.PrivacyPolicy}>Referral T&Cs</ExternalLink>.
        <br />
        <br />
      </Trans>
      <div className="mb-15">
        <Checkbox isChecked={shouldHideRedirectModal} setIsChecked={setShouldHideRedirectModal}>
          <Trans>Don't show this message again for 30 days.</Trans>
        </Checkbox>
      </div>
      <Button variant="primary-action" className="w-full" to={appRedirectUrl} onClick={onClickAgree}>
        <Trans>Agree</Trans>
      </Button>
    </Modal>
  );
}
