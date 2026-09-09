const getPageNumbers = (
    current: number,
    total: number,
    siblingCount: number,
  ) => {
    const totalPageNumbers = siblingCount * 2 + 5; // first, last, current, 2 siblings, 2 ellipsis

    if (total <= totalPageNumbers) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const leftSibling = Math.max(current - siblingCount, 1);
    const rightSibling = Math.min(current + siblingCount, total);

    const showLeftEllipsis = leftSibling > 2;
    const showRightEllipsis = rightSibling < total - 1;

    const pages: (number | "...")[] = [];

    pages.push(1);

    if (showLeftEllipsis) {
      pages.push("...");
    } else {
      for (let i = 2; i < leftSibling; i++) pages.push(i);
    }

    for (let i = leftSibling; i <= rightSibling; i++) {
      if (i !== 1 && i !== total) pages.push(i);
    }

    if (showRightEllipsis) {
      pages.push("...");
    } else {
      for (let i = rightSibling + 1; i < total; i++) pages.push(i);
    }

    if (total > 1) pages.push(total);

    return pages;
  };

  export {getPageNumbers}