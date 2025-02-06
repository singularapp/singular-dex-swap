import SEO from "components/Common/SEO";
import { getPageTitle } from "lib/legacy";
import "./PageNotFound.css";
import { Trans, t } from "@lingui/macro";
import { getPerpetualsPageUrl } from "lib/legacy";

function PageNotFound() {
  const perpetualsPageUrl = getPerpetualsPageUrl();

  return (
    <SEO title={getPageTitle(t`Page not found`)}>
      <div className="page-layout">
        <div className="page-not-found-container">
          <div className="page-not-found">
            <h2>
              <Trans>Page not found</Trans>
            </h2>
            <p className="go-back">
              <Trans>
                <span>Return to </span>
                <a href={perpetualsPageUrl}>Perpetuals</a>
              </Trans>
            </p>
          </div>
        </div>
      </div>
    </SEO>
  );
}

export default PageNotFound;
