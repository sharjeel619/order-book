// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { COIN_GECKO_BASE_URL, Ox_BASE_URL } from "@/utils/global";
import { AutoCompleteResponse } from "@/types";

function searchGecko(query: string) {
  return new Promise((resolve, reject) => {
    fetch(`${COIN_GECKO_BASE_URL}/search?query=${query}`)
      .then((res) => res.json())
      .then((res) => resolve(res))
      .catch((e) => {
        reject(e);
      });
  });
}

function OxQoute(tokenPair: string) {
  // if search doesn't have token pair, default can be USDT
  let searchRegEx = /-|\//;
  let [sellToken, buyToken] = tokenPair.split(searchRegEx);
  if (!buyToken) buyToken = "USDT";
  return new Promise((resolve, reject) => {
    // Can give you buyToken and sellerToken address along with price
    fetch(
      `${Ox_BASE_URL}/swap/v1/quote?buyToken=${buyToken}&sellToken=${sellToken}&sellAmount=100000000000000000`
    )
      .then((res) => res.json())
      .then((res) =>
        resolve({ ...res, symbol: `${sellToken}/${buyToken}`.toUpperCase() })
      )
      .catch((e) => {
        reject(e);
      });
  });
}

export async function getAutoCompleteResults(search: string) {
  const response = { results: { search: [], qoute: {} }, errors: {} };
  let tokenSearch = search.replace(/\s/g, "");
  if (!tokenSearch?.length) return response;
  try {
    let [gecko, Ox] = await Promise.allSettled([
      searchGecko(tokenSearch),
      OxQoute(tokenSearch),
    ]);
    if (gecko.status === "fulfilled") {
      response.results.search = gecko.value as any;
    }
    if (Ox.status === "fulfilled") {
      let val: object = Ox.value as object;
      response.results.qoute = { ...val } as object;
    }
  } catch (e) {
    response.errors = e as object;
  } finally {
    return response;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let search = req.query.search as string;
    search = search.toLowerCase().trim();
    if (!search) return res.status(200).json({ results: null });
    const getSymbols = await getAutoCompleteResults(search);
    res.status(200).json(getSymbols);
  } catch (e) {
    res.status(400).json({ error: e });
  }
}
