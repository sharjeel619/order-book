import styles from "./index.module.scss";
import Link from "next/link";
import { CoinInfo } from "@/types";

const baseImgUrl =
  "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons/128/icon/";

const defaultBuyToken = "USDT";

export default function Coin(props: CoinInfo) {
  const { symbol, label } = props;
  const coinImage = `${baseImgUrl}/${symbol.toLowerCase()}.png`;
  return (
    <Link
      href={`market/${symbol}-${defaultBuyToken}`}
      className={styles.coin_display}
    >
      <img src={coinImage} alt={label} />
      <p>
        {label} ({symbol})
      </p>
    </Link>
  );
}
