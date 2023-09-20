import React, { useEffect } from "react";
import CommandPalette, { filterItems, getItemIndex } from "react-cmdk";
import { useState } from "react";
import Link from "@docusaurus/Link";
import { useHistory } from "@docusaurus/router";
import ReactMarkdown from "react-markdown";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import "./theme.css";

import { download, CloseVectorEmbeddings, HNSWLib } from "closevector-web";

const IconSearch = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
        >
            <path
                fill="currentColor"
                d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.612 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3l-1.4 1.4ZM9.5 14q1.875 0 3.188-1.313T14 9.5q0-1.875-1.313-3.188T9.5 5Q7.625 5 6.312 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14Z"
            />
        </svg>
    );
};

const IconCommand = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 256 256"
        >
            <path
                fill="currentColor"
                d="M180 144h-20v-32h20a36 36 0 1 0-36-36v20h-32V76a36 36 0 1 0-36 36h20v32H76a36 36 0 1 0 36 36v-20h32v20a36 36 0 1 0 36-36Zm-20-68a20 20 0 1 1 20 20h-20ZM56 76a20 20 0 0 1 40 0v20H76a20 20 0 0 1-20-20Zm40 104a20 20 0 1 1-20-20h20Zm16-68h32v32h-32Zm68 88a20 20 0 0 1-20-20v-20h20a20 20 0 0 1 0 40Z"
            />
        </svg>
    );
};

const IconLoading = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
        >
            <path
                fill="currentColor"
                d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
                opacity=".5"
            />
            <path
                fill="currentColor"
                d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"
            >
                <animateTransform
                    attributeName="transform"
                    dur="1s"
                    from="0 12 12"
                    repeatCount="indefinite"
                    to="360 12 12"
                    type="rotate"
                />
            </path>
        </svg>
    );
};

export class CustomEmbedding extends CloseVectorEmbeddings {
    constructor(fields) {
        super({
            ...fields,
            secret: "",
        });
        this.config = {
            key: fields.key,
        };
    }

    async embeddingWithRetry(textList) {
        const key = this.config.key;
        async function createEmbeddings(textList) {
            let resp = await fetch(
                `https://vector-kv.mega-ug.uk/public/embeddings?accessKey=${key}`,
                {
                    method: "POST",
                    body: JSON.stringify(textList),
                }
            );

            let data = await resp.json();
            return data;
        }

        return createEmbeddings(textList);
    }
}

let downloading = false;
export const useDownloader = function (customEmbeddings) {
    const [lib, setLib] = useState(null);
    const [downloadProgress, setDownloadProgress] = useState(0);

    const downloadFile = async function (fileId, url) {
        if (downloading) {
            return;
        }

        downloading = true;

        let __url = url;
        if (!__url) {
            const downloadUrl = await createGetFileOperationUrl({
                uuid: fileId,
            });

            __url = downloadUrl.url;
        }

        await download({
            url: __url,
            onProgress: (event) => {
                if (event.loaded && event.total) {
                    setDownloadProgress((event.loaded / event.total) * 100);
                } else {
                    setDownloadProgress(50);
                }
            },
        });

        const lib = await HNSWLib.load(`${fileId}.hnsw`, customEmbeddings);
        setLib(lib);

        downloading = false;
    };

    useEffect(() => async () => {
        await HNSWLib.imports();
    }, []);

    return { lib, downloadProgress, downloadFile };
};

function debounceAsyncFunc(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        return new Promise((resolve, reject) => {
            const later = function () {
                timeout = null;
                resolve(func.apply(context, args));
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        });
    };
}

const searchWithQuery = debounceAsyncFunc(async function search(lib, query) {
    if (!query) {
        return;
    }
    let results = await lib.similaritySearch(query, 20);
    return results;
}, 500);

export default function SearchBarWrapper(props) {
    const [page, setPage] = useState("root");
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [fetchError, setFetchError] = useState(null);
    const [isLibLoading, setIsLibLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [searching, setSearching] = useState(false);
    const history = useHistory();

    const {
        siteConfig: { customFields },
    } = useDocusaurusContext();

    const { lib, downloadProgress, downloadFile } = useDownloader(
        new CustomEmbedding({
            key: customFields.CLOSEVECTOR_ACCESS_KEY,
        })
    );

    function searchChangeCallback(search) {
        setSearch(search);
        if (lib) {
            setSearching(true);
            searchWithQuery(lib, search)
                .then((results) => {
                    setResults(results);
                })
                .finally(() => {
                    setSearching(false);
                });
        }
    }

    // listen on command/ctrl + K to open
    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen(true);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
    }, []);

    React.useEffect(() => {
        if (lib || isLibLoading || fetchError) {
            return;
        }
        (async () => {
            try {
                setIsLibLoading(true);
                let resp = await fetch(
                    `https://vector-kv.mega-ug.uk/public/file/${customFields.CLOSEVECTOR_FILE_ID}?accessKey=${customFields.CLOSEVECTOR_ACCESS_KEY}`,
                    {
                        method: "GET",
                    }
                );
                if (resp.status !== 200) {
                    throw new Error("fetching file fail");
                }
                let json = await resp.json();
                await downloadFile(json.uuid, json.url);
                setIsLibLoading(false);
            } catch (e) {
                console.error(e);
                setFetchError(e);
                setIsLibLoading(false);
            }
        })();
    }, [downloadFile, fetchError, isLibLoading, lib]);

    const filteredItems = searching
        ? [
              {
                  heading: "Loading",
                  id: "loading",
                  items: [
                      {
                          id: 1,
                          children: `searching from ${lib.index.getCurrentCount()} documents`,
                          showType: false,
                      },
                  ],
              },
          ]
        : results?.length
        ? [
              {
                  heading: "Results",
                  id: "results",
                  items: (results || []).map((r, index) => {
                      return {
                          id: index,
                          // width adjusted
                          children: (
                              <Link
                                  to={
                                      "/docs" +
                                      r?.metadata?.url.replace(/.md$/, "")
                                  }
                              >
                                  <div className="w-full rounded-lg bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-400 p-4 border-t border-indigo-500 border-b border-indigo-500">
                                      <h2 className="text-lg font-semibold leading-tight text-white">
                                          <b>{r?.metadata?.header}</b>
                                      </h2>
                                      <p className="text-sm text-white/80 font-medium mt-1">
                                          <ReactMarkdown
                                              children={
                                                  r?.metadata?.description
                                              }
                                          />
                                      </p>
                                  </div>
                              </Link>
                          ),
                          showType: false,
                          // icon: 'RectangleStackIcon',
                          closeOnSelect: false,
                          onClick: () => {
                              history.push(
                                  "/docs" + r?.metadata?.url.replace(/.md$/, "")
                              );
                              setOpen(false);
                          },
                      };
                  }),
              },
          ]
        : [];

    return (
        <>
            <div
                style={{
                    display: "flex",
                    background: "var(--ifm-footer-background-color)",
                    padding: "3px 10px",
                    borderRadius: "16px",
                    cursor: "pointer",
                }}
                onClick={() => {
                    if (isLibLoading || !lib) {
                        return;
                    }
                    setOpen(true);
                }}
            >
                <span
                    style={{
                        display: "flex",
                    }}
                >
                    {isLibLoading ? <IconLoading /> : <IconSearch />}
                </span>
                <span
                    style={{
                        display: "flex",
                        margin: "0 6px 0 6px",
                        color: "var(--ifm-navbar-link-color)",
                    }}
                >
                    Search
                </span>
                <span
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                    }}
                >
                    <IconCommand />
                </span>
                +K
            </div>
            <CommandPalette
                onChangeSearch={(search) => {
                    searchChangeCallback(search);
                }}
                onChangeOpen={(isOpen) => {
                    debugger;
                    setOpen(isOpen);
                }}
                search={search}
                isOpen={open}
                page={page}
            >
                <CommandPalette.Page id="root">
                    {filteredItems.length ? (
                        filteredItems.map((list) => (
                            <CommandPalette.List
                                key={list.id}
                                heading={list.heading}
                            >
                                {list.items.map(({ id, ...rest }) => (
                                    <CommandPalette.ListItem
                                        key={id}
                                        index={getItemIndex(filteredItems, id)}
                                        {...rest}
                                    />
                                ))}
                            </CommandPalette.List>
                        ))
                    ) : (
                        <CommandPalette.FreeSearchAction />
                    )}
                </CommandPalette.Page>
            </CommandPalette>
        </>
    );
}
