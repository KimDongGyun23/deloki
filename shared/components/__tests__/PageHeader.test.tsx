import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PageHeader } from "../PageHeader";

describe("PageHeader", () => {
  describe("Title", () => {
    it("제목을 h1으로 렌더링한다", () => {
      render(
        <PageHeader>
          <PageHeader.Title>Notes</PageHeader.Title>
        </PageHeader>,
      );

      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveTextContent("Notes");
    });
  });

  describe("NewButton", () => {
    it("href와 children을 받아 링크를 렌더링한다", () => {
      render(
        <PageHeader>
          <PageHeader.Title>Notes</PageHeader.Title>
          <PageHeader.NewButton href="/notes/new">+ New Note</PageHeader.NewButton>
        </PageHeader>,
      );

      const link = screen.getByRole("link", { name: "+ New Note" });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/notes/new");
    });

    it("서로 다른 href와 문구를 받아 렌더링한다", () => {
      render(
        <PageHeader>
          <PageHeader.Title>Links</PageHeader.Title>
          <PageHeader.NewButton href="/links/new">+ New Link</PageHeader.NewButton>
        </PageHeader>,
      );

      const link = screen.getByRole("link", { name: "+ New Link" });
      expect(link).toHaveAttribute("href", "/links/new");
    });
  });

  describe("조합 케이스", () => {
    it("Title + NewButton 조합 (Notes 페이지)", () => {
      render(
        <PageHeader>
          <PageHeader.Title>Notes</PageHeader.Title>
          <PageHeader.NewButton href="/notes/new">+ New Note</PageHeader.NewButton>
        </PageHeader>,
      );

      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Notes");
      expect(screen.getByRole("link", { name: "+ New Note" })).toBeInTheDocument();
    });

    it("Title만 있을 때 링크를 렌더링하지 않는다", () => {
      render(
        <PageHeader>
          <PageHeader.Title>Search</PageHeader.Title>
        </PageHeader>,
      );

      expect(screen.queryByRole("link")).not.toBeInTheDocument();
    });

    it("header 시맨틱 요소로 렌더링한다", () => {
      const { container } = render(
        <PageHeader>
          <PageHeader.Title>Dashboard</PageHeader.Title>
        </PageHeader>,
      );

      expect(container.querySelector("header")).toBeInTheDocument();
    });
  });
});
