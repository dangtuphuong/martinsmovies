interface PaginationProps {
  disabled?: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  disabled,
  page,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const getPageNumbers = () => {
    const totalButtons = 5;
    let start = Math.max(1, page - 2);
    let end = start + totalButtons - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - totalButtons + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
      {/* Previous */}
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1 || disabled}
        className="w-10 h-10 rounded-full flex items-center justify-center outline-button"
      >
        &lt;
      </button>

      {/* Page numbers */}
      {getPageNumbers().map((num) => (
        <button
          key={num}
          disabled={disabled}
          onClick={() => onPageChange(num)}
          className={`
            w-10 h-10 rounded-full flex items-center justify-center 
            ${page === num ? "" : "outline-button"}
          `}
        >
          {num}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages || disabled}
        className="w-10 h-10 rounded-full flex items-center justify-center outline-button"
      >
        &gt;
      </button>
    </div>
  );
};
