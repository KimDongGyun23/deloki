import { FC, SVGProps } from "react";

import ChartSvg from "@/public/icons/chart.svg";
import ChevronSvg from "@/public/icons/chevron.svg";
import ClipSvg from "@/public/icons/clip.svg";
import HomeSvg from "@/public/icons/home.svg";
import LogoSvg from "@/public/icons/logo.svg";
import NoteSvg from "@/public/icons/note.svg";
import SearchSvg from "@/public/icons/search.svg";

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

/**
 * 아이콘 컴포넌트를 크기 조절 가능한 래퍼로 감싸는 고차 컴포넌트
 *
 * @param Svg 원본 SVG 컴포넌트
 * @returns 크기 조절이 가능한 SVG 컴포넌트
 */
const withSize = (Svg: FC<SVGProps<SVGSVGElement>>) => {
  const Component = ({ size = 20, width, height, ...props }: IconProps) => (
    <Svg width={width ?? size} height={height ?? size} {...props} />
  );
  Component.displayName = `withSize(${Svg.displayName || Svg.name || "Icon"})`;
  return Component;
};

export const LogoIcon = withSize(LogoSvg);
export const HomeIcon = withSize(HomeSvg);
export const NoteIcon = withSize(NoteSvg);
export const ClipIcon = withSize(ClipSvg);
export const SearchIcon = withSize(SearchSvg);
export const ChartIcon = withSize(ChartSvg);
export const ChevronIcon = withSize(ChevronSvg);
