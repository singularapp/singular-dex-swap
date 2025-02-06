import { Trans, t } from "@lingui/macro";
import SEO from "components/Common/SEO";
import { getPageTitle } from "lib/legacy";
import "./LaunchPad.css";
function LaunchPad() {
  return (
    <SEO title={getPageTitle(t`Launchpad`)}>
      <div className="default-container page-layout Launchpad">
        <div className="launchpad-bg" />
        <h1 className="title">
          <Trans>Most Liquid DEX Launchpad</Trans>
        </h1>
        <p className="description">
          <Trans>
            Singular DEX launchpad unlocks unparalleled opportunities for global investors and institutions.
          </Trans>
        </p>
        <a className="cta button primary-action mt-16" href="https://sdex.typeform.com/to/xyd1f3yj" target="_blank">
          <Trans>Apply Now</Trans>
        </a>
      </div>
      {/* <Footer /> */}
    </SEO>
  );
}
export default LaunchPad;
