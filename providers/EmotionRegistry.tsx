"use client";

import { PropsWithChildren, useState } from "react";

import { useServerInsertedHTML } from "next/navigation";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

/**
 * App Router에서 emotion SSR을 위한 레지스트리
 */
export const EmotionRegistry = ({ children }: PropsWithChildren) => {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: "css" });
    cache.compat = true;

    const prevInsert = cache.insert;
    let inserted: string[] = [];

    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };

    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };

    return { cache, flush };
  });

  // SSR 시 수집된 스타일을 <head>에 주입
  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) return null;

    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }

    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
};
