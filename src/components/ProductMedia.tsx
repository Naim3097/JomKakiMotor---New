"use client";

import { createContext, useContext, useState } from "react";

/**
 * Lets the variant picker steer the gallery: choosing a colour in
 * ProductEnquiry sets `focus` to that colour's photo and DetailGallery
 * jumps to it. Both live in different grid cells of a server-rendered
 * detail page, so the link is a tiny context rather than props.
 */
interface MediaApi {
  focus: string | null;
  setFocus: (src: string | null) => void;
}

const MediaContext = createContext<MediaApi>({ focus: null, setFocus: () => {} });

export function ProductMedia({ children }: { children: React.ReactNode }) {
  const [focus, setFocus] = useState<string | null>(null);
  return <MediaContext.Provider value={{ focus, setFocus }}>{children}</MediaContext.Provider>;
}

export const useProductMedia = () => useContext(MediaContext);
