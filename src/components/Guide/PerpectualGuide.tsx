import { useEffect, useState } from "react";
import ReactJoyride from "react-joyride";
import { Plural, Trans, t } from "@lingui/macro";
const steps = [
  {
    target: ".connect-wallet-btn-perp",
    content: (
      <Trans>
        Connect Wallet: Start by connecting your digital wallet to SingularDEX. Click 'Connect Wallet', choose your
        preferred wallet provider, and authorize the connection to enable transactions and fund management on the
        platform.
      </Trans>
    ),
    disableBeacon: true,
  },
  {
    target: ".App-header-buy-crypto",
    content: (
      <Trans>
        Fund Your Account: Ensure your wallet is sufficiently funded to cover initial margins and potential price
        movements. Proper funding is critical, especially when using leverage in trading.
      </Trans>
    ),
    disableBeacon: true,
  },
  {
    target: "#trade-type-Swap",
    content: (
      <Trans>
        Swap: Exchange one cryptocurrency for another directly on SingularDEX. Use this feature to adjust your portfolio
        quickly in response to market changes or to prepare for a trading strategy.
      </Trans>
    ),
    disableBeacon: true,
  },
  {
    target: ".LeverageSlider",
    content: (
      <Trans>
        Set Leverage: Adjust the leverage level using the slider to control the size of your positions. Higher leverage
        amplifies potential profits and losses, so use caution and consider your risk tolerance before setting the
        leverage.
      </Trans>
    ),
    disableBeacon: true,
  },
  {
    target: "#trade-type-Long",
    content: (
      <Trans>
        Go Long: Open a long position if you predict the price of a cryptocurrency will rise. Choose your leverage, set
        the position size, and confirm the order. This allows you to potentially profit from price increases.
      </Trans>
    ),
    disableBeacon: true,
  },
  {
    target: "#trade-type-Short",
    content: (
      <Trans>
        Go Short: Open a short position if you believe the price of a cryptocurrency will fall. Set your leverage and position size accordingly. Short selling enables you to profit from price declines.
      </Trans>
    ),
    disableBeacon: true,
  },
];
export const PerpectualGuide = () => {
  const [tourRun, setTourRun] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!tourRun) setTourRun(true);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <ReactJoyride
      run={tourRun}
      steps={steps}
      continuous
      showProgress
      showSkipButton
      styles={{
        options: {
          zIndex: 1000,
        },
        buttonNext: {
          background: '#55c3e7'
        },
        buttonBack: {
          color: 'rgb(51, 51, 51)'
        }
      }}
      locale={{
        back: <Trans>Back</Trans>,
        skip: <Trans>Skip</Trans>,
        next: <Trans>Next</Trans>,
        last: <Trans>Last</Trans>
      }}
      floaterProps={{ disableAnimation: true }}
    />
  );
};
