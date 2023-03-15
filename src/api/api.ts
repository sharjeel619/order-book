import { Qoute, AutoCompleteDD } from "@/types";
import { Ox_BASE_URL } from "../utils/global";
export const getSearchResults = async (
  query: string
): Promise<AutoCompleteDD[]> => {
  return new Promise((resolve, reject) => {
    fetch(`/api/search?search=${query}`)
      .then((res) => res.json())
      .then((results) => {
        const { qoute, search } = results?.results;
        let acc: AutoCompleteDD[] = [];
        if (search?.coins.length) {
          acc.push(
            ...search.coins
              .slice(0, 5)
              .map((item: any) => ({ value: item.symbol, label: item.symbol }))
          );
        }
        if (qoute?.price) {
          acc.push({ value: qoute.symbol, label: qoute.symbol });
        }
        resolve(acc);
      })
      .catch((e) => reject(e));
  });
};

export const getTokenPairAddress = async (
  pair: string,
  sellAmount?: number
): Promise<Qoute> => {
  return new Promise((resolve, reject) => {
    let [sellToken, buyToken] = pair.split("-");
    buyToken = buyToken || "USDT";
    fetch(
      `${Ox_BASE_URL}/swap/v1/quote?buyToken=${buyToken}&sellToken=${sellToken}&sellAmount=${
        sellAmount || 10e16
      }`
    )
      .then((res) => res.json())
      .then((res: Qoute) => resolve(res))
      .catch((e) => reject(e));
  });
};
