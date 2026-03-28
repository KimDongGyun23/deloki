import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // SWC가 emotion import 감지 시 자동으로 jsx pragma 주입
  // css prop 사용 가능 + 클래스명 자동 생성 (디버깅 편의)
  compiler: {
    emotion: true,
  },
};

export default nextConfig;
