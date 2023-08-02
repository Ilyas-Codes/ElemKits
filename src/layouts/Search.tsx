import React, { useEffect, useRef, useState } from "react";
import { humanize, slugify } from "@lib/utils/textConverter";
import { FiDownload, FiArrowUpRight } from "react-icons/fi/index";
import Fuse from "fuse.js";

export type SearchItem = {
  slug: string;
  data: any;
  content: any;
};

interface Props {
  searchList: SearchItem[];
}

interface SearchResult {
  item: SearchItem;
  refIndex: number;
}

export default function SearchBar({ searchList }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputVal, setInputVal] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(
    null
  );

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputVal(e.currentTarget.value);
  };

  const fuse = new Fuse(searchList, {
    keys: ["data.title", "data.categories", "data.tags"],
    findAllMatches: true,
    ignoreLocation: true,
    threshold: 0.5,
  });

  useEffect(() => {
    const searchUrl = new URLSearchParams(window.location.search);
    const searchStr = searchUrl.get("q");
    if (searchStr) setInputVal(searchStr);

    setTimeout(function () {
      inputRef.current!.selectionStart = inputRef.current!.selectionEnd =
        searchStr?.length || 0;
    }, 50);
  }, []);

  useEffect(() => {
    let inputResult = inputVal.length > 2 ? fuse.search(inputVal) : [];
    setSearchResults(inputResult);

    if (inputVal.length > 0) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("q", inputVal);
      const newRelativePathQuery =
        window.location.pathname + "?" + searchParams.toString();
      history.pushState(null, "", newRelativePathQuery);
    } else {
      history.pushState(null, "", window.location.pathname);
    }
  }, [inputVal]);

  return (
    <div className="flex flex-col items-center p-5 md:p-4">
      <input
        className="w-[700px] rounded-xl border-2 border-main-blue p-[18px] shadow-[-5px_5px_#3CA9EB] placeholder:text-dark-blue/50 focus:outline-none dark:bg-accent-blue dark:placeholder:text-light-blue/50 md:w-full"
        placeholder="dark photography portfolio"
        type="search"
        name="search"
        value={inputVal}
        onChange={handleChange}
        autoComplete="off"
        autoFocus
        ref={inputRef}
      />

      {inputVal.length > 1 && (
        <div className="my-5 line-clamp-1 text-center md:my-4">
          Found {searchResults?.length}
          {searchResults?.length && searchResults?.length === 1
            ? " kit"
            : " kits"}{" "}
          for '{inputVal}'
        </div>
      )}

      <div className="grid grid-cols-4 gap-5 xl:grid-cols-3 lg:grid-cols-2 md:gap-4 sm:grid-cols-1">
        {searchResults?.map(({ item }) => (
          <div className="space-y-[5px]" key={item.slug}>
            {item.data.image && (
              <a aria-label={item.data.title} href={`/${item.slug}`}>
                <div className="group relative">
                  <img
                    className="hover-transition rounded-xl object-cover object-center group-hover:brightness-90"
                    src={item.data.image}
                    alt={item.data.title}
                    width={614}
                    height={430}
                  />
                  <div className="hover-transition absolute right-0 top-0 flex items-center justify-between rounded-xl bg-light-blue opacity-0 shadow-xl shadow-dark-blue/10 group-hover:-translate-x-2 group-hover:translate-y-2 group-hover:opacity-100 dark:bg-dark-blue">
                    <a
                      aria-label="live demo"
                      className="group/icon hover-transition flex items-center justify-center rounded-xl p-3 hover:bg-main-blue/10"
                      target="_blank"
                      href={item.data.iframe}
                    >
                      <FiArrowUpRight
                        className="hover-transition group-hover/icon:text-main-blue"
                        size={20}
                      />
                    </a>
                    <span className="h-3 border-[1px] border-main-blue" />
                    <a
                      aria-label="download"
                      className="lemonsqueezy-button group/icon hover-transition flex items-center justify-center rounded-xl p-3 hover:bg-main-blue/10"
                      href={item.data.download}
                    >
                      <FiDownload
                        className="hover-transition group-hover/icon:text-main-blue"
                        size={20}
                      />
                    </a>
                  </div>
                </div>
              </a>
            )}
            <h2 className="line-clamp-1 font-medium">
              <a aria-label={item.data.title} href={`/${item.slug}`}>
                {item.data.title}
              </a>
            </h2>
            <ul>
              {item.data.categories.map((category: string, i: number) => (
                <li>
                  <a
                    aria-label={item.data.categories}
                    className="hover-transition line-clamp-1 w-fit rounded-lg bg-main-blue px-[10px] py-[6px] text-sm font-medium text-light-blue hover:bg-main-blue/90"
                    href={`/categories/${slugify(category)}`}
                  >
                    {humanize(category)}
                    {i !== item.data.categories.length - 1 && ","}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
