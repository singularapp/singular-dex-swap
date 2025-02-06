import { Trans } from "@lingui/macro";

import ExternalLink from "components/ExternalLink/ExternalLink";
import { DOCUMENT_LINKS } from "config/links";

export function ApyTooltipContent() {
  return (
    <p className="text-white">
      <Trans>
        <p className="mb-12">
          The APY is an estimate based on the fees collected for the past seven days, extrapolating the current
          borrowing fee. It excludes:
        </p>
        <ul className="mb-8 list-disc">
          <li className="p-2">price changes of the underlying token(s)</li>
          <li className="p-2">traders' PnL, which is expected to be neutral in the long term</li>
          <li className="p-2">funding fees, which are exchanged between traders</li>
        </ul>
        <p className="mb-12">
          <ExternalLink href={DOCUMENT_LINKS.PerpetualsTrading}>
            Read more about SD token pricing
          </ExternalLink>
          .
        </p>
        <p>
          Check SD pools' performance against other LP Positions in the{" "}
          <ExternalLink href={DOCUMENT_LINKS.PerpetualsTrading}>SINGULARDAO Dune Dashboard</ExternalLink>.
        </p>
      </Trans>
    </p>
  );
}
