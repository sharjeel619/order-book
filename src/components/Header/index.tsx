import { useCallback, useState, useRef, useEffect } from "react";
import { AutoComplete, Spin } from "antd";
import { useRouter } from "next/router";
import { getSearchResults } from "@/api/api";
import { AutoCompleteDD } from "@/types";
import styles from "./index.module.scss";

export default function Header() {
  const router = useRouter();
  const [options, setOptions] = useState<AutoCompleteDD[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const refTimer = useRef<NodeJS.Timeout>();

  const handleSelect = useCallback((value: string) => {
    let url =
      value.search("/") === -1
        ? `market/${value}-USDT`
        : `market/${value.replace("/", "-")}`;
    router.push(url);
  }, []);

  const debouncedSearch = useCallback((search: string) => {
    if (!search) {
      setOptions([]);
      return;
    }
    clearTimeout(refTimer.current);
    refTimer.current = setTimeout(() => {
      autoCompleteSearch(search);
    }, 1000);
  }, []);

  const autoCompleteSearch = useCallback(async (value: string) => {
    try {
      setFetching(true);
      let autoCompResults = await getSearchResults(value);
      setOptions(autoCompResults);
    } catch (e) {
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (refTimer.current !== null) {
        clearTimeout(refTimer.current);
      }
    };
  }, []);

  return (
    <div className={styles.header}>
      <h1>View OrderBook of Token Pairs</h1>
      <p>
        We find you the best prices across exchanges and combine them into one
        trade.
      </p>
      <AutoComplete
        onSelect={handleSelect}
        onSearch={debouncedSearch}
        className="autocomplete-search-bar"
        notFoundContent={fetching ? <Spin /> : null}
        size="large"
        style={{ width: 500, textAlign: "left" }}
        placeholder="Search for tokens..."
        options={options}
      />
    </div>
  );
}
